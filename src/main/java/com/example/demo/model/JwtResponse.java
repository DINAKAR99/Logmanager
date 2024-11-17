package com.example.demo.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {
    private String jwttoken;
    public String username;
    public Long userid;
    public int empid;
    public String teamid;
    public int role;
    public String message;
    public RefreshToken refreshtoken;
}
