package com.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignupResponseDTO {
    private String status;
    private String message;
    private Long userId;
}
