package com.example.demo.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "lm_user_login_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserLoginDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userLoginDetailsSequenceGenerator")
	@SequenceGenerator(name = "userLoginDetailsSequenceGenerator", allocationSize = 1, initialValue = 1)
	private Long id;

	@Column(name = "user_id")
	private Long userId;
	@Column(name = "user_name")
	private String userName;

	@Column(name = "session_id")
	private String sessionId;

	@Column(name = "login_time")
	private LocalDateTime loginTime = LocalDateTime.now();

	@Column(name = "logout_time")
	private LocalDateTime logoutTime;

	@Column(name = "login_ip_address")
	private String loginIPAddress;

	@Column(name = "is_loggedin")
	private boolean isLogin = false;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(LocalDateTime loginTime) {
		this.loginTime = loginTime;
	}

	public LocalDateTime getLogoutTime() {
		return logoutTime;
	}

	public void setLogoutTime(LocalDateTime logoutTime) {
		this.logoutTime = logoutTime;
	}

	public String getLoginIPAddress() {
		return loginIPAddress;
	}

	public void setLoginIPAddress(String loginIPAddress) {
		this.loginIPAddress = loginIPAddress;
	}

	public boolean isLogin() {
		return isLogin;
	}

	public void setLogin(boolean isLogin) {
		this.isLogin = isLogin;
	}

	@Override
	public String toString() {
		return "UserLoginDetails [id=" + id + ", userId=" + userId + ", loginTime=" + loginTime + ", logoutTime="
				+ logoutTime + ", loginIPAddress=" + loginIPAddress + ", isLogin=" + isLogin + "]";
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
