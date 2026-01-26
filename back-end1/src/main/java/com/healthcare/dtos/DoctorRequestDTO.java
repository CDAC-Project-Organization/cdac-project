package com.healthcare.dtos;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class DoctorRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private LocalDate dob;

   

    @NotBlank(message = "Qualification is required")
    private String qualification;

    @NotBlank(message = "Speciality is required")
    private String speciality;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Fees is required")
    private Double fees;

    @NotNull(message = "Experience is required")
    private Integer experience;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    private LocalTime endTime;
}
