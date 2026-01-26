package com.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String status;
    private String message;
    private String role;
    private Long userId;
}
