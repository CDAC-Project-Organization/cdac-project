package com.healthcare.service;

import com.healthcare.dtos.LoginRequest;
import com.healthcare.dtos.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
