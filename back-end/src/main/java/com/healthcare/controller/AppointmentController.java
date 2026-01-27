package com.healthcare.controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/Appointments")
@RequiredArgsConstructor
@CrossOrigin
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/allAppointments")
    public ResponseEntity<?> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }
    
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<?> getDoctorAppointments(
            @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                appointmentService.getDoctorAppointments(doctorId)
        );
    }
    
    
    @PutMapping("/cancel/{appointmentId}")
    public ResponseEntity<?> cancelAppointment(
            @PathVariable Long appointmentId) {

        ApiResponse response = appointmentService.cancelAppointment(appointmentId);
        return ResponseEntity.ok(response);
    }
    
    
    
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getPatientAppointments(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                appointmentService.getPatientAppointments(patientId)
        );
    }
    
    
    
    
}
