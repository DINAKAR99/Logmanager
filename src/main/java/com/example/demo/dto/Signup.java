package com.example.demo.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Signup {
    @NotNull(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String user;
    @NotNull(message = "Empid is required") 
    private String empid;

    @NotNull(message = "Password is required")
    @Size(min = 6, max = 8, message = "Password length must be between 6 and 8 characters")
    private String password; 
     
    @NotNull(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Phone number is required")
    @Pattern(regexp = "^[6789]\\d{9}$", message = "Phone number must be 10 digits and start with 9, 8, 7, or 6")
    private String phonenumber;

    @NotNull(message = "Captcha is required")
    private String captcha;

    
}