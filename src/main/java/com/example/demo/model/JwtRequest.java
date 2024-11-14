package com.example.demo.model;

import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JwtRequest {
    @NotNull(message = "Username is required")
    public String user;
    @NotNull(message = "Password is required")
    public String password;
}
