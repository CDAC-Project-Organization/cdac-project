package com.healthcare.security;

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
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(request -> request

                /* ===================== PUBLIC ===================== */
                .requestMatchers(
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/auth/**",
                    "/patient/addPatient",
                    "/admin/create",
                    "/admin/byUser",
                    "/doctor/findAllDoctors"
                ).permitAll()

                /* ===================== PATIENT ===================== */
                .requestMatchers(
                    "/patient/edit-profile/**",
                    "/patient/bookAppointment",
                    "/patient/doctors/*/available-slots", // ✅ FIXED
                    "/patient/byUser",
                    "/Appointments/patient/**"
                ).hasAuthority("ROLE_PATIENT")

                .requestMatchers(
                    HttpMethod.POST,
                    "/Appointments/cancel/**"
                ).hasAuthority("ROLE_PATIENT")

                /* ===================== ADMIN ===================== */
                .requestMatchers(
                    "/patient/AllPatients",
                    "/patient/**",
                    "/doctor/AddDoctors",
                    "/doctor/**"
                ).hasAuthority("ROLE_ADMIN")

                .requestMatchers(
                    HttpMethod.GET,
                    "/Appointments/allAppointments"
                ).hasAuthority("ROLE_ADMIN")

                /* ===================== DOCTOR ===================== */
                .requestMatchers(
                    "/doctor/edit-profile",
                    "/doctor/by-user",
                    "/Appointments/doctor/**"
                ).hasAuthority("ROLE_DOCTOR")

                .requestMatchers(
                    HttpMethod.POST,
                    "/Appointments/cancel/**"
                ).hasAuthority("ROLE_DOCTOR")

                /* ===================== DEFAULT ===================== */
                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
