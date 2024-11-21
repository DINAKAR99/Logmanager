package com.example.demo.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.filter.JwtAuthFilter;
import com.example.demo.helper.JwtAuthEntrypoint;

@Configuration
public class SecurityConfig {

  @Autowired
  private CustomUserDetailsService userDetailsService;

  @Autowired
  private JwtAuthEntrypoint jwtAuthEntrypoint;

  @Autowired
  private JwtAuthFilter filter;

  @Bean
    CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      
      // Specify frontend origin (React app running on port 5173)
      configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
      
      // Specify allowed HTTP methods
      configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
      
      // Specify allowed headers (you can also narrow this down)
      configuration.setAllowedHeaders(Arrays.asList("*"));
      
      // Allow cookies to be sent (must be true to allow cookies)
      configuration.setAllowCredentials(true);
      
      // Expose headers so the browser can access the 'Set-Cookie' header
      configuration.setExposedHeaders(Arrays.asList("Set-Cookie"));
      
      // Create the URL-based configuration source and register it
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      
      return source;
  }
  

  @Bean
  SecurityFilterChain getfilterchain(HttpSecurity httpsecurity) throws Exception {

    httpsecurity
        .csrf(s -> s.disable()).cors(s -> s.configurationSource(corsConfigurationSource())).authorizeHttpRequests(
            auth -> auth.antMatchers("/test").authenticated()
                .antMatchers("/auth/login", "/user/create", "/auth/refresh", "/protected/api/**", "/logoff", "/public/**",
                    "/dualsessionlogin", "/", "/assets/**")
                .permitAll()
                .anyRequest()
                .authenticated())
        .addFilterBefore(
            filter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling(e -> e.authenticationEntryPoint(jwtAuthEntrypoint))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    // httpsecurity.addFilterBefore(filter,
    // UsernamePasswordAuthenticationFilter.class);
    return httpsecurity.build();

  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  HttpFirewall allowUrlEncodedSlashHttpFirewall() {
    DefaultHttpFirewall firewall = new DefaultHttpFirewall();
    firewall.setAllowUrlEncodedSlash(true); // Allow encoded slashes in URLs
    return firewall;
  }

  @Bean
  AuthenticationManager getAuthManager(AuthenticationConfiguration builder)
      throws Exception {

    return builder.getAuthenticationManager();

  }

  @Bean
  AuthenticationProvider authProvider() {
    System.err.println("AuthenticationProvider method");
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setUserDetailsService(userDetailsService);
    provider.setPasswordEncoder(passwordEncoder());
    // provider.setPasswordEncoder(new BCryptPasswordEncoder());
    return provider;
  }
}
