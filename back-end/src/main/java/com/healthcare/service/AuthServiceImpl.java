package com.healthcare.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.healthcare.dtos.LoginRequest;
import com.healthcare.dtos.LoginResponse;
import com.healthcare.entities.User;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Override
    public LoginResponse login(LoginRequest request) {

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return new LoginResponse(
                "FAILED",
                "Invalid email or password",
                null,
                null
            );
        }

        User user = userOpt.get();

        // Plain-text comparison (NO SECURITY as requested)
        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse(
                "FAILED",
                "Invalid email or password",
                null,
                null
            );
        }

        return new LoginResponse(
            "SUCCESS",
            "Login successful",
            user.getRole().name(),
            user.getId()
        );
    }
}
