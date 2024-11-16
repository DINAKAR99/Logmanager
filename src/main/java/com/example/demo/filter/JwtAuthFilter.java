package com.example.demo.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.helper.JwtAuthEntrypoint;
import com.example.demo.helper.JwtHelper;

import io.jsonwebtoken.ExpiredJwtException;

import io.jsonwebtoken.MalformedJwtException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final Logger l1 = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Value("${app.welcome.message}")
    private String welcomeMessage;
    @Autowired
    private JwtHelper jwthelper;

    @Autowired
    private UserDetailsService userds;

    @Autowired
    private JwtAuthEntrypoint jwtAuthenticationEntryPoint;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        l1.info("Header :{}", header);
        l1.warn(welcomeMessage);
        // Get the request URI
        String requestURI = request.getRequestURI();
        l1.info("Request URI: {}", requestURI);

        // Skip filtering if the path starts with "/public"
        if (requestURI.startsWith("/Logify/public") || requestURI.startsWith("/Logify/")
                || requestURI.startsWith("/Logify/logoff")) {
            l1.info("Skipping filter for public path: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }
        String userName = null;
        String token = null;

        if (header != null && header.startsWith("Bearer")) {
            token = header.substring(7);

            try {
                userName = jwthelper.getUsernameFromToken(token);
                l1.info("Extracted Username: {}", userName);
            } catch (IllegalArgumentException e) {
                l1.info("Illegal argument while fetching username");
                jwtAuthenticationEntryPoint.commence(request, response, null); // Trigger unauthorized response
            } catch (ExpiredJwtException e) {
                l1.info("Expired JWT token");
                jwtAuthenticationEntryPoint.commence(request, response, null); // Trigger unauthorized response
                return; // Skip further processing
            } catch (MalformedJwtException e) {
                l1.info("JWT token is malformed");
                jwtAuthenticationEntryPoint.commence(request, response, null); // Trigger unauthorized response
                return; // Skip further processing
            } catch (Exception e) {
                l1.error("Unexpected error while processing token", e);
                jwtAuthenticationEntryPoint.commence(request, response, null); // Trigger unauthorized response
                return;
            }
        } else {
            l1.info("Invalid header value");
            jwtAuthenticationEntryPoint.commence(request, response, null); // Trigger unauthorized response
            return;
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userByUsername = this.userds.loadUserByUsername(userName);

            Boolean validateToken = this.jwthelper.validateToken(token, userByUsername);

            if (validateToken) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userByUsername, validateToken, userByUsername.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                l1.info("Token validation failed");
                jwtAuthenticationEntryPoint.commence(request, response, null); // Trigger unauthorized response
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}