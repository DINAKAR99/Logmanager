package com.example.demo.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Duallogin;
import com.example.demo.dto.Signup;
import com.example.demo.helper.JwtHelper;
import com.example.demo.model.JwtRequest;
import com.example.demo.model.JwtResponse;
import com.example.demo.model.RefreshToken;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.model.UserLoginDetails;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserLoginDetailsRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.RefreshTokenService;
import com.example.demo.security.UserLoginService;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/public/auth")
public class Authcontroller {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserLoginDetailsRepository userLoginDetailsRepository;

    @Autowired
    private UserLoginService userLoginService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtHelper jwtHelper;
    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid JwtRequest jwtRequest, BindingResult bindingResult,
            HttpServletRequest request,
            HttpServletResponse response) throws IOException, ServletException {

        // If there are validation errors, return bad request with error messages
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            bindingResult.getFieldErrors().forEach(error -> {
                errors.append(error.getField()).append(": ").append(error.getDefaultMessage()).append("\n");
            });
            return new ResponseEntity<>(errors.toString(), HttpStatus.BAD_REQUEST);
        }
        System.out.println("jwt------------------------------------------------");
        System.out.println(jwtRequest.getUser());

        // Perform authentication and handle failure if necessary
        ResponseEntity<?> failureResponse = this.doAuthenticate(jwtRequest.getUser(), jwtRequest.getPassword(), request,
                response);
        if (failureResponse != null) {
            return failureResponse; // Return early if authentication failed
        }
        UserLoginDetails u1 = userLoginDetailsRepository.findByUserName(jwtRequest.getUser());
        // if (u1 != null && u1.isLogin()) {
        // Duallogin duallogin = new Duallogin();
        // duallogin.setInfo("dual login ");
        // duallogin.setName(jwtRequest.getUser());
        // return new ResponseEntity<>(duallogin, HttpStatus.BAD_REQUEST);
        // }
        UserLoginDetails user2 = userLoginDetailsRepository.findByUserName(jwtRequest.getUser());
        if (user2 == null) {
            user2 = new UserLoginDetails();
            user2.setUserId(userRepository.findByUserName(jwtRequest.getUser()).getUserId());
        }
        user2.setUserName(jwtRequest.getUser());
        user2.setLogin(true);
        user2.setLoginIPAddress(request.getRemoteAddr());
        user2.setLogoutTime(null);
        user2.setLoginTime(LocalDateTime.now());
        userLoginDetailsRepository.save(user2);

        // Authentication passed, generate token
        UserDetails userByUsername = userDetailsService.loadUserByUsername(jwtRequest.getUser());
        String token = jwtHelper.generateToken(userByUsername);

        // Generate refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userByUsername.getUsername());

        User user1 = userRepository.findByUserName(jwtRequest.getUser());
        // Create response object with token and refresh token
        JwtResponse jwtResponse = JwtResponse.builder()
                .jwttoken(token)
                .username(userByUsername.getUsername())
                .userid(user1.getUserId())
                .empid(user1.getEmpid())
                .refreshtoken(refreshToken)
                .role(user1.getRole().getRoleId())
                .build();

        System.out.println(jwtResponse.toString());

        return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signin(@RequestBody @Valid Signup details, BindingResult bindingResult,
            HttpServletRequest request,
            HttpServletResponse response) {

        // If there are validation errors, return bad request with error messages
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            bindingResult.getFieldErrors().forEach(error -> {
                errors.append(error.getField()).append(": ").append(error.getDefaultMessage()).append("\n");
            });
            return new ResponseEntity<>(errors.toString(), HttpStatus.BAD_REQUEST);
        }

        // Here you can add logic for CAPTCHA validation
        // For example, compare details.getCaptcha() with stored captcha

        // Process sign-in logic here

        // saving
        User user = new User();
        user.setUserName(details.getUser());
        user.setEmpid(Integer.parseInt(details.getEmpid()));
        user.setUserEmail(details.getEmail());
        user.setUserMobile(details.getPassword());
        user.setPassword(passwordEncoder.encode(details.getPassword()));
        user.setRealPassword(details.getPassword());
        user.setCreatedIpAddress(request.getRemoteAddr());
        Role role = roleRepository.findByRoleId(1);
        if (role == null) {
            // Create a new Role and save it if not found
            role = new Role(); 
            role.setDescription("USER"); 
            role.setRoleName("USER");  
            roleRepository.save(role);
            
        }
         
        user.setRole(role);
        userRepository.save(user);
        return new ResponseEntity<>("Signup successfull", HttpStatus.OK);
    }

    @GetMapping("checkuser/{name}")
    public ResponseEntity<String> checkUser(@PathVariable String name) {
        User byUserName = null;
        byUserName = userRepository.findByUserName(name);

        if (byUserName != null) {

            return new ResponseEntity<>("user found", HttpStatus.OK);
        } else {

            return new ResponseEntity<>("no user found", HttpStatus.NOT_FOUND);
        }
    }

    private ResponseEntity<?> doAuthenticate(String username, String password, HttpServletRequest request,
            HttpServletResponse response) throws IOException, ServletException {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username,
                password);

        try {
            // Attempt to authenticate the user
            authenticationManager.authenticate(authentication);

            // Load user details after successful authentication
            User user = userRepository.findByUserName(username);

            // Check if the user account is locked
            if (user != null && !user.isAccountNonLocked()) {
                long lockTimeInMillis = user.getLockTime().getTime();
                long currentTimeInMillis = System.currentTimeMillis();
                long lockTime = UserLoginService.getLockTimeDuration();

                if (lockTimeInMillis + lockTime > currentTimeInMillis) {
                    long leftLockTimeInMin = (lockTimeInMillis + lockTime - currentTimeInMillis) / (1000 * 60);
                    return handleAuthenticationFailure(
                            "Too many wrong attempts. You are locked out!. It will be unlocked after "
                                    + leftLockTimeInMin + " minutes.",
                            423);
                } else {
                    userLoginService.unlockWhenTimeExpired(user);
                    return handleAuthenticationFailure(
                            "Due to too many wrong attempts, your account was locked earlier. It is now unlocked. Please login again.",
                            423);
                }
            }

            // If no lock issue, continue
            if (user.getFailedAttempts() > 0) {
                userLoginService.resetFailedAttempts(user.getUserId());
            }

        } catch (BadCredentialsException e) {
            // Handle wrong username or password
            User user = userRepository.findByUserName(username);
            if (user == null) {
                return handleAuthenticationFailure("User does not exist", HttpServletResponse.SC_UNAUTHORIZED);
            }

            // Handle failed login attempts
            if (user.isAccountNonLocked()) {
                if (user.getFailedAttempts() < UserLoginService.MAX_FAILED_ATTEMPTS - 1) {
                    int leftLoginAttempts = UserLoginService.MAX_FAILED_ATTEMPTS - 1 - user.getFailedAttempts();
                    userLoginService.increaseFailedAttempts(user);
                    return handleAuthenticationFailure(
                            "Username or Password is incorrect. You have " + leftLoginAttempts + " chances left.",
                            HttpServletResponse.SC_UNAUTHORIZED);
                } else {

                    userLoginService.lock(user);
                    return handleAuthenticationFailure(
                            "Your account has been locked due to 3 failed attempts. It will be unlocked after 30 minutes.",
                            423);
                }
            } else if (!user.isAccountNonLocked() && userLoginService.unlockWhenTimeExpired(user)) {
                userLoginService.increaseFailedAttempts(user);
                return handleAuthenticationFailure("Username or Password is incorrect. You have "
                        + (UserLoginService.MAX_FAILED_ATTEMPTS - 1 - user.getFailedAttempts()) + " chances left.",
                        HttpServletResponse.SC_UNAUTHORIZED);
            } else {
                long leftLockTimeInMin = (user.getLockTime().getTime() + UserLoginService.getLockTimeDuration()
                        - System.currentTimeMillis()) / (1000 * 60);
                return handleAuthenticationFailure(
                        "Too many wrong attempts. You are locked out! It will be unlocked after " + leftLockTimeInMin
                                + " minutes.",
                        423);
            }
        }

        // Return null to indicate authentication passed and proceed with token
        // generation
        return null;
    }

    private ResponseEntity<?> handleAuthenticationFailure(String message, int status) {
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", message);

        return ResponseEntity.status(status).body(responseBody);
    }

    @PostMapping("/create-refresh-token")
    public ResponseEntity<RefreshToken> createRefreshToken(@RequestBody String username) {
        refreshTokenService.createRefreshToken(username);
        return null;
    }

}
