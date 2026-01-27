package com.healthcare.service;

import com.healthcare.dtos.LoginRequest;
import com.healthcare.dtos.LoginResponse;
import com.healthcare.dtos.SignupRequestDTO;
import com.healthcare.dtos.SignupResponseDTO;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    SignupResponseDTO signup(SignupRequestDTO request);
}
