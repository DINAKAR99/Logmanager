package com.example.demo.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users_mst")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userSequenceGenerator")
    @SequenceGenerator(name = "userSequenceGenerator", allocationSize = 1, initialValue = 50000)
    @Column(name = "user_id", unique = true)
    private Long userId;

    @NotNull
    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "password", length = 60)
    private String password;

    @Column(name = "real_password", length = 60)
    private String realPassword;

    @Column(name = "user_mobile")
    private String userMobile;

    @Size(min = 5, max = 100)
    @Column(name = "user_email", length = 100)
    private String userEmail;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "updated_by")
    private Long updatedBy;

    @Column(name = "created_on")
    private LocalDateTime createdOn = LocalDateTime.now();

    @Column(name = "updated_on")
    private LocalDateTime updatedOn;

    @Column(name = "created_ip_address")
    private String createdIpAddress;

    @Column(name = "updated_ip_address")
    private String updatedIpAddress;

    @Column(name = "account_non_locked")
    private boolean accountNonLocked = true;

    @Column(name = "failed_attempts")
    private int failedAttempts = 0;
    @Column(name = "employee_id")
    private int empid = 0;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne
    @JsonIgnore
    private RefreshToken refreshToken;

    public RefreshToken getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(RefreshToken refreshToken) {
        this.refreshToken = refreshToken;
    }

    @Transient
    private String captcha;

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public int getFailedAttempts() {
        return failedAttempts;
    }

    public void setFailedAttempts(int failedAttempt) {
        this.failedAttempts = failedAttempt;
    }

    public Date getLockTime() {
        return lockTime;
    }

    public void setLockTime(Date lockTime) {
        this.lockTime = lockTime;
    }

    @Column(name = "lock_time")
    private Date lockTime;

    public String getPassword() {
        return password;
    }

    public String getRealPassword() {
        return realPassword;
    }

    public void setRealPassword(String rawPassword) {
        this.realPassword = rawPassword;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getCreatedIpAddress() {
        return createdIpAddress;
    }

    public void setCreatedIpAddress(String createdIpAddress) {
        this.createdIpAddress = createdIpAddress;
    }

    public String getUpdatedIpAddress() {
        return updatedIpAddress;
    }

    public void setUpdatedIpAddress(String updatedIpAddress) {
        this.updatedIpAddress = updatedIpAddress;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDateTime getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(LocalDateTime updatedOn) {
        this.updatedOn = updatedOn;
    }

    public User(@NotNull @Size(min = 1, max = 50) String userName, @NotNull @Size(min = 20, max = 60) String password,
            String realPassword,
            @Size(max = 10) String gender, int userDistrictCode, int userMandalCode, int userVillageCode,
            String userMobile, @Size(min = 5, max = 100) String userEmail,
            Long createdBy, Long updatedBy,
            LocalDateTime createdOn, LocalDateTime updatedOn) {
        super();
        this.userName = userName;
        this.password = password;
        this.realPassword = realPassword;
        this.userMobile = userMobile;
        this.userEmail = userEmail;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
    }

    public User() {

    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getEmpid() {
        return empid;
    }

    public void setEmpid(int empid) {
        this.empid = empid;
    }

}
