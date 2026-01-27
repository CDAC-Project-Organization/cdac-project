package com.healthcare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.healthcare.dtos.LoginRequest;
import com.healthcare.dtos.LoginResponse;
import com.healthcare.service.AuthService;

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
    
   
    
    
}
