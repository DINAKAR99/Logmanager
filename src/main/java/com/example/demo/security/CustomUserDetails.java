package com.example.demo.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.model.Role;
import com.example.demo.model.ServiceMaster;
import com.example.demo.model.User;

import java.util.*;

public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    private User user;
    private List<ServiceMaster> serviceMasters;

    private Role role;

    public CustomUserDetails(User user, List<ServiceMaster> serviceMasters, Role role) {
        super();
        this.serviceMasters = serviceMasters;
        this.user = user;
        this.role = role;

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public List<ServiceMaster> getServiceMasters() {
        return serviceMasters;
    }

    public void setServiceMasters(List<ServiceMaster> serviceMasters) {
        this.serviceMasters = serviceMasters;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((serviceMasters == null) ? 0 : serviceMasters.hashCode());
        result = prime * result + ((role == null) ? 0 : role.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        CustomUserDetails other = (CustomUserDetails) obj;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (serviceMasters == null) {
            if (other.serviceMasters != null)
                return false;
        } else if (!serviceMasters.equals(other.serviceMasters))
            return false;
        if (role == null) {
            if (other.role != null)
                return false;
        } else if (!role.equals(other.role))
            return false;
        return true;
    }
}
