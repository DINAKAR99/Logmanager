package com.example.demo.controller;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.model.UserLoginDetails;
import com.example.demo.repository.UserLoginDetailsRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.CustomUserDetails;
import java.security.SecureRandom;
import java.time.LocalDateTime;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
// @RequestMapping("/public")
public class LoginController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserLoginDetailsRepository userLoginDetailsRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public static final ConcurrentHashMap<Integer, String> captchaStore = new ConcurrentHashMap<>();

  @RequestMapping(value = { "/", "/{x:[\\w\\-]+}",
      "/{x:^(?!api$).*$}/*/{y:[\\w\\-]+}", "/error" })
  public String fallback(HttpServletRequest request) {
    // Check if the request is for a static resource (assets)
    String fullUrl = request.getRequestURL().toString();

    System.out.println(fullUrl);

    // For any other request, forward to index.html
    return "index.html";
  }

  // @RequestMapping(value = "/signup", method = { RequestMethod.GET,
  // RequestMethod.POST })
  // public String fallbackd(HttpServletRequest request) {
  // // Check if the request is for a static resource (assets)
  // String fullUrl = request.getRequestURL().toString();

  // System.out.println(fullUrl);

  // // For any other request, forward to index.html
  // return "forward:/index.html";
  // }

  @GetMapping(value = "loginPage")
  public ModelAndView loginPage(ModelMap model) {
    ModelAndView mav = new ModelAndView();
    mav.setViewName("login");
    return mav;
  }

  @GetMapping(value = "public/forgotPassword")
  public String forgotPassword(
      HttpServletRequest request,
      Authentication authentication) {
    request.setAttribute("userIdBlock", true);

    System.out.println("forgot password >>>>>>>>>>>>>>>>>>");
    return "forgotPassword";
  }

  @ResponseBody
  @GetMapping("/captcha/number")
  public String generateCaptcha() {
    // Define the character set: digits and uppercase letters
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    SecureRandom random = new SecureRandom(); // Use SecureRandom for better randomness

    // Define the length of the CAPTCHA
    int length = 6; // Adjust length as needed

    // Generate the CAPTCHA string
    StringBuilder captcha = new StringBuilder(length);
    for (int i = 0; i < length; i++) {
      int index = random.nextInt(characters.length());
      captcha.append(characters.charAt(index));
    }

    // Store the CAPTCHA string with a token (if needed)
    // String token = UUID.randomUUID().toString();
    // captchaStore.put(token, captcha.toString());
    // // Store the CAPTCHA number with the token
    captchaStore.put(1, captcha.toString());
    return captcha.toString();
  }

  @RequestMapping("/captchafailure")
  public ModelAndView captchaFailure(ModelAndView mav, Model model) {
    model.addAttribute(
        "errorMessageForUsercaptcha",
        "Captcha validation failed, please try again");

    mav.setViewName("login");
    return mav;
  }

  @RequestMapping("/abort")
  public ModelAndView abort(ModelAndView mav, Model model) {
    model.addAttribute("errorMessageForUsercaptcha", "invalid credentials");

    mav.setViewName("login");
    return mav;
  }

  @ResponseBody
  @PostMapping("/public/dualsessionlogin")
  public ResponseEntity<?> dualsessionlogin(@RequestParam(value = "user", required = false) String user,
      HttpServletRequest request) {
    // Get the current Authentication object
    user = user.trim();
    UserLoginDetails usr = userLoginDetailsRepository.findByUserName(user);
    if (usr != null) {
      usr.setLogoutTime(LocalDateTime.now());
      usr.setLogin(false);
      userLoginDetailsRepository.save(usr);
    }
    return new ResponseEntity<>("logout success", HttpStatus.OK);

  }

  @GetMapping(value = "/invalidCredentials")
  public String loginPage(
      @RequestParam(value = "user", required = false) String user,
      Model model,
      HttpServletRequest request,
      HttpServletResponse response) {
    String errorMessge = null;
    if (user != null) {
      HttpSession session = request.getSession(false);
      if (session != null) {
        AuthenticationException ex = (AuthenticationException) session.getAttribute(
            WebAttributes.AUTHENTICATION_EXCEPTION);
        if (ex != null) {
          errorMessge = ex.getMessage();
        }
      }
      // request.getSession().getAttributeNames()
    } else {
      errorMessge = "Invalid credentials";
    }
    model.addAttribute("errorMessageForUsercaptcha", errorMessge);
    return "login";
  }

  @ResponseBody
  @PostMapping("/logoff")
  public ResponseEntity<String> logout(
      @RequestParam(value = "username", required = true) String username,
      HttpServletRequest request,
      HttpServletResponse response,
      Model model) {
    // Authentication auth = SecurityContextHolder
    // .getContext()
    // .getAuthentication();
    // CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
    // if (auth != null) {
    // new SecurityContextLogoutHandler().logout(request, response, auth);
    UserLoginDetails user2 = userLoginDetailsRepository.findByUserName(username);
    user2.setLogin(false);
    user2.setLogoutTime(LocalDateTime.now());
    userLoginDetailsRepository.save(user2);
    // }

    return ResponseEntity.ok("{\"message\": \"Logut successful!\"}");
  }

  @GetMapping(value = "/userRegistration")
  public ModelAndView userRegistration(ModelMap model) {
    User user = new User();
    model.addAttribute("userRegistrationDTO", user);
    ModelAndView mav = new ModelAndView();
    mav.setViewName("userRegistration");

    return mav;
  }

  @PostMapping(value = "/userRegistration")
  @Transactional
  public ModelAndView saveUserRegistration(
      ModelAndView mav,
      HttpServletRequest request,
      @ModelAttribute("userRegistrationDTO") User user,
      Model model,
      RedirectAttributes redirectAttributes) {
    if (user != null) {
      String storedCaptcha = captchaStore.get(1);
      System.out.println("yesss STORED CAPTCHA " + storedCaptcha);
      System.out.println("user.getCaptcha() " + user.getCaptcha());
      // System.out.println(storedCaptcha);
      // System.out.println(user.getCaptcha());
      if (!(storedCaptcha.equals(user.getCaptcha()))) {
        // captchaStore.remove(1); // Optional: Remove token after validation
        model.addAttribute(
            "errorMessageForUsercaptcha",
            "Captcha validation failed, please try again");
        model.addAttribute("userRegistrationDTO", user);
        mav.setViewName("userRegistration");
        return mav;
      }

      if (user.getUserName() != null && !user.getUserName().isEmpty()) {
        {
          String hashPassword = passwordEncoder.encode(user.getPassword());

          user.setRealPassword(user.getPassword());
          user.setPassword(hashPassword);
          user.setUserName(user.getUserName().trim());
          Role role = new Role();
          role.setRoleName("USER");
          role.setDescription("normal user level");
          user.setRole(role);
          Set<User> users = new HashSet<User>();
          users.add(user);
          role.setUsers(users);
          userRepository.save(user);

          mav.setViewName("redirect:" + "/registrationSuccessful");
          return mav;
        }
      } else {
        model.addAttribute("", "");
        model.addAttribute("userRegistrationDTO", new User());
        mav.setViewName("userRegistration");
        return mav;
      }
    } else {
      model.addAttribute("", "Error Occured");
      model.addAttribute("userRegistrationDTO", new User());
      mav.setViewName("userRegistration");
      return mav;
    }
  }

  @GetMapping("/registrationSuccessful")
  public String registrationSuccessful(ModelAndView mav, Model model) {
    return "registrationSuccessful";
  }

  @GetMapping("/dualLogin")
  public String dualLogin(ModelAndView mav, Model model) {
    return "dualLogin";
  }

  @GetMapping("/test")
  @ResponseBody
  public String getDetails() {

    return "this is tesing url";

  }
}
