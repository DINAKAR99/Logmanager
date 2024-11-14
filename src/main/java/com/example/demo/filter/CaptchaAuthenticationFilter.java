package com.example.demo.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.demo.controller.LoginController;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CaptchaAuthenticationFilter implements Filter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        // Read the JSON body
        System.out.println("the session is: " + httpRequest.getSession().getId());

        // Convert JSON to a String (or parse it)
        String userCaptcha = null;
        String requestURI = httpRequest.getRequestURI();
        // Convert JSON to a Map

        // Check if this is the login request
        if (requestURI.endsWith("/login")) {
            ConcurrentHashMap<Integer, String> capthaStore = LoginController.captchaStore;
            String captchaId = capthaStore.get(1);
            System.out.println("the uri " + requestURI);
            // Extract the captcha from the parsed JSON

            System.out.println("stored captha: " + captchaId);
            // String userName = request.getParameter("username");

            // System.out.println(" ::::::::username::::::::::::: " + userName);
            // if ((userCaptcha == null) || !(userCaptcha.equals(captchaId))) {
            // System.out.println("d]yes--------");
            // // Redirect to CAPTCHA failure page
            // // Forward the request to the CAPTCHA failure controller
            // RequestDispatcher dispatcher =
            // httpRequest.getRequestDispatcher("/captchafailure");
            // dispatcher.forward(httpRequest, httpResponse);
            // return;
            // }
        }

        // Continue filter chain
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // Cleanup logic if needed
    }
}
