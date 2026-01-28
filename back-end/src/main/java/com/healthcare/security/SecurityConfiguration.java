package com.healthcare.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(request -> request

                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers(
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/auth/**",
                    "/patient/addPatient",
                    "/admin/create",
                    "/admin/byUser",
                    "/doctor/findAllDoctors"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.POST,
                    "/doctor/holiday/**"
                ).hasAuthority("ROLE_DOCTOR")

                .requestMatchers(
                	    "/doctor/edit-profile",
                	    "/doctor/by-user",
                	    "/Appointments/doctor/**"
                	).hasAnyAuthority("ROLE_DOCTOR", "ROLE_ADMIN")

                .requestMatchers(
                    "/patient/edit-profile/**",
                    "/patient/bookAppointment",
                    "/patient/doctors/*/available-slots",
                    "/patient/byUser",
                    "/Appointments/patient/**"
                ).hasAuthority("ROLE_PATIENT")

                .requestMatchers(
                    HttpMethod.POST,
                    "/Appointments/cancel/**"
                ).hasAnyAuthority("ROLE_DOCTOR", "ROLE_PATIENT")

                .requestMatchers(
                    "/patient/AllPatients",
                    "/patient/**",
                    "/doctor/AddDoctors"
                ).hasAuthority("ROLE_ADMIN")

                .requestMatchers(
                    HttpMethod.GET,
                    "/Appointments/allAppointments"
                ).hasAuthority("ROLE_ADMIN")

                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
