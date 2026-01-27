package com.healthcare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.healthcare.dtos.LoginRequest;
import com.healthcare.dtos.LoginResponse;
import com.healthcare.dtos.SignupRequestDTO;
import com.healthcare.dtos.SignupResponseDTO;
import com.healthcare.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {
    	

        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequestDTO request) {

        SignupResponseDTO response = authService.signup(request);
        return ResponseEntity.ok(response);
    }


   
    
    
}
