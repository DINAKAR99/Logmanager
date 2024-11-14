package com.example.demo.security;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.RefreshToken;
import com.example.demo.model.User;
import com.example.demo.repository.RefreshTokenRepo;
import com.example.demo.repository.UserRepository;

@Service
public class RefreshTokenService {

    public long refreshTokenValidity = 30 * 60 * 1000; // min::second::millisec

    @Autowired
    UserRepository userRepo;

    @Autowired
    RefreshTokenRepo refreshTokenRepo;

    public RefreshToken createRefreshToken(String username) {
        User user1 = userRepo.findByUserName(username);
        RefreshToken refreshToken = user1.getRefreshToken();

        if (refreshToken == null) {

            refreshToken = RefreshToken.builder().refreshToken(UUID.randomUUID().toString())
                    .expiry(Instant.now().plusMillis(refreshTokenValidity)).user(user1).build();

        } else {
            refreshToken.setExpiry(Instant.now().plusMillis(refreshTokenValidity));
        }

        user1.setRefreshToken(refreshToken);

        refreshTokenRepo.save(refreshToken);

        return refreshToken;
    }

    public RefreshToken verifyRefreshToken(RefreshToken rt) {

        RefreshToken byRefreshToken = refreshTokenRepo.findByRefreshToken(rt.getRefreshToken());
        if (byRefreshToken == null) {
            throw new RuntimeException("given rf token doesnt exist ");

        }
        if (byRefreshToken.getExpiry().compareTo(Instant.now()) < 0) {
            throw new RuntimeException("  rf token expired ");

        }

        return byRefreshToken;

    }
}
