package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.AppointmentResponseDTO;
import com.healthcare.dtos.DoctorAppointmentResponseDto;
import com.healthcare.dtos.DoctorAvailabilityResponse;
import com.healthcare.dtos.PatientAppointmentResponseDto;
import com.healthcare.entities.Appointment;

public interface AppointmentService {

    List<AppointmentResponseDTO> getAllAppointments();
    ApiResponse cancelAppointment(Long appointmentId);
    List<Appointment> getAppointmentsForDoctor(Long doctorId);
    
    List<DoctorAppointmentResponseDto> getDoctorAppointments(Long doctorId);
    
    List<PatientAppointmentResponseDto> getPatientAppointments(Long patientId);
    
    DoctorAvailabilityResponse getAvailableSlotsForDoctor(Long doctorId);
}
