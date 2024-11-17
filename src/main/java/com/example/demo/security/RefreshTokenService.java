package com.example.demo.security;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.demo.model.RefreshToken;
import com.example.demo.model.User;
import com.example.demo.repository.RefreshTokenRepo;
import com.example.demo.repository.UserRepository;

@Service
public class RefreshTokenService {

    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenService.class);

    // You can make this configurable if needed
    private final long refreshTokenValidity = 30 * 60 * 1000; // 30 minutes in milliseconds

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RefreshTokenRepo refreshTokenRepo;

    // Create a new refresh token for the user or update the existing one
    public RefreshToken createRefreshToken(String username) {
        User user = userRepo.findByUserName(username);
        if (user == null) {
            throw new RuntimeException("User not found: " + username);
        }

        RefreshToken refreshToken = user.getRefreshToken();

        // If the user doesn't have a refresh token, create a new one
        if (refreshToken == null) {
            refreshToken = new RefreshToken();
            refreshToken.setRefreshToken(UUID.randomUUID().toString());
        }

        // Update the expiry time
        refreshToken.setExpiry(Instant.now().plusMillis(refreshTokenValidity));
        refreshToken.setUser(user);

        // Save the refresh token to the database
        refreshTokenRepo.save(refreshToken);

        logger.info("Refresh token created/updated for user: {}", username);

        return refreshToken;
    }

    // Verify the provided refresh token, check its validity
    public RefreshToken verifyRefreshToken(String refreshTokenValue) {
        RefreshToken refreshToken = refreshTokenRepo.findByRefreshToken(refreshTokenValue);

        if (refreshToken == null) {
            logger.error("Refresh token not found: {}", refreshTokenValue);
            throw new RuntimeException("Invalid refresh token");
        }

        // Check if the refresh token is expired
        if (refreshToken.getExpiry().isBefore(Instant.now())) {
            logger.error("Refresh token expired: {}", refreshTokenValue);
            throw new RuntimeException("Refresh token expired");
        }

        logger.info("Refresh token is valid: {}", refreshTokenValue);
        return refreshToken;
    }
}
