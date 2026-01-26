package com.healthcare.dtos;


import lombok.Data;

import java.time.LocalTime;

@Data
public class DoctorUserResponseDTO {

    private Long doctorId;
    private String qualification;
    private String speciality;
    private String location;
    private Double fees;
    private Integer experience;
    private LocalTime startTime;
    private LocalTime endTime;
    private String profileImage;

    // user details
    private Long userId;
    private String name;
    private String email;
    private String phone;
}
