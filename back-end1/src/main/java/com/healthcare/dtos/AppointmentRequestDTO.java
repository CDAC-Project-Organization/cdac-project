package com.healthcare.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDTO {

    private Long doctorId;
    private Long patientId;

    private LocalDate appointmentDate;
    private LocalTime startTime;
    private LocalTime endTime;
}
