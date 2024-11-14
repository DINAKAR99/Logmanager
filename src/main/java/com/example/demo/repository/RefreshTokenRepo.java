package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.RefreshToken;

import java.util.List;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Integer> {
    RefreshToken findByRefreshToken(String refreshToken);
}
