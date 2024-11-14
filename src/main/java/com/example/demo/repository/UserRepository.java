package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String username);

    public User findByUserId(Long userName);

    @Query("UPDATE User u SET u.failedAttempts = ?1 WHERE u.userId = ?2")
    @Modifying
    public void updateFailedAttempts(int failAttempts, Long userId);

}