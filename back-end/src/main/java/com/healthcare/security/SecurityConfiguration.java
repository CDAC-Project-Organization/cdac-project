package com.healthcare.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration // To declare a java config class (equivalent to bean config xml file)
@EnableWebSecurity // to enable spring security
@EnableMethodSecurity // optional to add method level authorization rules
@RequiredArgsConstructor
@Slf4j
public class SecurityConfiguration {
	// ctor based D.I
	private final PasswordEncoder passwordEncoder;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;


	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		 http.csrf(csrf -> csrf.disable());

		    http.sessionManagement(session ->
		            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		    http.authorizeHttpRequests(request ->
		            request
		                .requestMatchers(
		                        "/v3/api-docs/**",
		                        "/swagger-ui/**",
		                        "/auth/**",
		                        "/patient/addPatient"
		                ).permitAll()

		                .requestMatchers(HttpMethod.GET, "/doctors").permitAll()
		                .requestMatchers(HttpMethod.GET, "/patients").hasRole("ADMIN")
		                .requestMatchers(HttpMethod.POST, "/appointments").hasRole("PATIENT")
		                .requestMatchers(HttpMethod.GET, "/patients/{userId}").hasRole("ADMIN")
		                .requestMatchers("/doctor/AddDoctors").hasRole("ADMIN")
		                .requestMatchers(HttpMethod.POST,
		                        "/appointments/mark-complete-with-tests").hasRole("DOCTOR")

		                .anyRequest().authenticated()
		    );

		    http.addFilterBefore(
		            jwtAuthenticationFilter,
		            org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
		    );

		    return http.build();
		
	}

	// Configure AuthManager as spring bean
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
