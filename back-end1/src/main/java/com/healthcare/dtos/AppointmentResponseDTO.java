package com.healthcare.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.healthcare.entities.AppointmentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppointmentResponseDTO {

    private Long appointmentId;
    private String patientName;
    private String doctorName;
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private AppointmentStatus status;
}
