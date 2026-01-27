package com.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProfileDTO {

    private Long adminId;
    private String adminName;
    private String email;
    private Long userId;
}

