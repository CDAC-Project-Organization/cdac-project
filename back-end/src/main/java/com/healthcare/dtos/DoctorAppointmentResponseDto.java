package com.healthcare.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.healthcare.entities.AppointmentStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DoctorAppointmentResponseDto {

    // Appointment details
    private Long appointmentId;
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private AppointmentStatus status;

    // Patient details
    private String patientName;
    private String patientEmail;
    private String patientPhone;
    private String familyHistory;
}
