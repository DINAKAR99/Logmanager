package com.example.demo.repository;

import com.example.demo.model.UserLoginDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

public interface UserLoginDetailsRepository
  extends JpaRepository<UserLoginDetails, Long> {
  UserLoginDetails findByUserId(Long userId);
  UserLoginDetails findByUserName(String username);

  UserLoginDetails findBySessionId(String sessionId);

  @Modifying
  @Query(
    value = "UPDATE user_login_details SET is_loggedin=false  WHERE is_login=?1",
    nativeQuery = true
  )
  void updateLoginIsFalse(boolean isLogin);
}
