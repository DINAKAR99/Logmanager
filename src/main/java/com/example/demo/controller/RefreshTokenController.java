package com.example.demo.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.helper.JwtHelper;
import com.example.demo.model.JwtResponse;
import com.example.demo.model.RefreshToken;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.RefreshTokenService;

@RestController
@RequestMapping("/public/token")
public class RefreshTokenController {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtHelper jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    // Refresh the access token using the refresh token
    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refreshToken(HttpServletRequest request) {
        System.out.println("in refresh token--------------------------------");
        // Retrieve the refresh token from HttpOnly cookies
        String refreshToken = getRefreshTokenFromCookies(request);
        System.out.println(refreshToken);

        if (refreshToken == null) {
            return ResponseEntity.status(403).body( JwtResponse.builder().message("Refresh token is missing or invalid").build());
        }

        try {
            // Verify the refresh token
            RefreshToken rt = refreshTokenService.verifyRefreshToken(refreshToken);

            // Use the user information from the refresh token to issue a new access token
            User user = rt.getUser();
            String newAccessToken = jwtTokenProvider.generateTokenByUser(user);

            // Return the new access token and refresh token in the response
            JwtResponse jwtResponse =  JwtResponse.builder().jwttoken(newAccessToken).refreshtoken(rt).build();

            return ResponseEntity.ok(jwtResponse);
        } catch (RuntimeException e) {
            // If refresh token is invalid or expired
            return ResponseEntity.status(403).body( JwtResponse.builder().message("Invalid or expired refresh token").build());
        }
    }

    // Helper method to get the refresh token from cookies
    private String getRefreshTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;  // Return null if refresh token cookie is not found
    }
}
