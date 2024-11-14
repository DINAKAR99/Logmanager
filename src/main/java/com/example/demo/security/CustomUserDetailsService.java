package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import com.example.demo.model.Role;
import com.example.demo.model.ServiceMaster;
import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.ServiceMasterRepository;
import com.example.demo.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    Logger log = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    private ServiceMasterRepository serviceMasterRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = null;

        user = userRepository.findByUserName(username);

        Role role = null;
        List<ServiceMaster> serviceMasters = null;
        // If user not found, throw exception
        if (user == null) {
            System.out.println("yep its me-------------------");
            throw new UsernameNotFoundException("User not found");
        }
        if (user != null && user.isAccountNonLocked()) {
            role = user.getRole();
            serviceMasters = serviceMasterRepository.getAllServicesByRole(role.getRoleId()).stream()
                    .filter(serviceMaster -> serviceMaster.getDeleteFlag().equals("F")).collect(Collectors.toList());

        }

        return new CustomUserDetails(user, serviceMasters, role);
    }

}
