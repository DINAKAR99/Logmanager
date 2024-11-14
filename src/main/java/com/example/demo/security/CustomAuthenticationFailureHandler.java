package com.example.demo.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Configuration
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserLoginService userLoginService;

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		String userName = request.getParameter("username");

		System.out.println("onAuthenticationFailure ::::::::::::username::::::::::::: " + userName);
		User user = null;
		String failureUrl = "/invalidCredentials";
		user = userRepository.findByUserName(userName);

		if (user != null) {
			failureUrl = "/invalidCredentials?user=true";
			if (user.isAccountNonLocked()) {
				if (user.getFailedAttempts() < UserLoginService.MAX_FAILED_ATTEMPTS - 1) {
					System.out.println(" isAccountNonLocked >>>>>>>>>>>>  " + user.getFailedAttempts());

					int leftLoginAttempts = UserLoginService.MAX_FAILED_ATTEMPTS - 1 - user.getFailedAttempts();
					exception = new LockedException(
							"Username or Password is incorrect !!.  You have " + leftLoginAttempts + " chances left.");

					userLoginService.increaseFailedAttempts(user);
					// Set response type to JSON
					response.setContentType("application/json");
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Set HTTP status to 200
					// Create a JSON response
					PrintWriter out = response.getWriter();
					out.print("{\"message\": \"Username or Password is incorrect !!.  You have \"" + leftLoginAttempts
							+ "\" chances left.\"}");
					out.flush();

				} else {
					userLoginService.increaseFailedAttempts(user);
					userLoginService.lock(user);
					exception = new LockedException("Your account has been locked due to 3 failed attempts."
							+ " It will be unlocked after 30 Minutes.");
					// Set response type to JSON
					response.setContentType("application/json");
					response.setStatus(423); // Set HTTP status to 200
					// Create a JSON response
					PrintWriter out = response.getWriter();
					out.print(
							"{\"message\": \"Your account has been locked due to 3 failed attempts. It will be unlocked after 30 Minutes.\"}");
					out.flush();
				}
			} else if (!user.isAccountNonLocked()) {

				if (userLoginService.unlockWhenTimeExpired(user)) {

					System.out.println("ggggggggggggggggggggggggg");

					user = userRepository.findByUserName(userName);

					int leftLoginAttempts = UserLoginService.MAX_FAILED_ATTEMPTS - 1 - user.getFailedAttempts();
					exception = new LockedException(
							"Username or Password is incorrect !!.  You have " + leftLoginAttempts + " chances left.");

					userLoginService.increaseFailedAttempts(user);
					// Set response type to JSON
					response.setContentType("application/json");
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Set HTTP status to 200
					// Create a JSON response
					PrintWriter out = response.getWriter();
					out.print("{\"message\": \"Username or Password is incorrect !!.  You have \"" + leftLoginAttempts
							+ "\" chances left.\"}");
					out.flush();

				} else {

					long lockTimeInMillis = user.getLockTime().getTime();

					long currentTimeInMillis = System.currentTimeMillis();

					long lockTime = UserLoginService.getLockTimeDuration();

					if (lockTimeInMillis + lockTime > currentTimeInMillis) {

						long leftLockTimeInMin = ((lockTimeInMillis + lockTime) - currentTimeInMillis) / (1000 * 60);
						exception = new LockedException(
								"Too many wrong attempts. You are locked out!. It will be unlocked after "
										+ leftLockTimeInMin + " Minutes.");

						// Set response type to JSON
						response.setContentType("application/json");
						response.setStatus(423); // Set HTTP status to 200
						// Create a JSON response
						PrintWriter out = response.getWriter();
						out.print(
								"{\"message\": \"Too many wrong attempts. You are locked out!. It will be unlocked after \""
										+ leftLockTimeInMin
										+ "\" chances left.\"}");
						out.flush();
					}
				}
			}

		}

	}

}
