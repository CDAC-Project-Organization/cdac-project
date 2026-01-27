package com.healthcare.dtos;

import java.time.LocalTime;

import lombok.Data;

@Data
public class EditDoctorRequest {

    private Long doctorId;
    private String doctorName;
    private String email;
    private String speciality;
    private String location;
    private Integer experience;
    private Double fees;
    private LocalTime startTime;
    private LocalTime endTime;
}
