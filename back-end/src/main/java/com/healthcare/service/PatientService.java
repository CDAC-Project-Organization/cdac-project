package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.AppointmentRequestDTO;
import com.healthcare.dtos.EditPatientRequest;
import com.healthcare.dtos.PatientRequestDTO;
import com.healthcare.dtos.PatientResponseDTO;

public interface PatientService {
	

	List<PatientResponseDTO> findAllPatients();
	
	

	void deletePatientById(Long id);

	
	
	ApiResponse addPatient(PatientRequestDTO dto);

	ApiResponse editPatientProfile(Long patientId, EditPatientRequest request);
	
	ApiResponse bookAppointment(AppointmentRequestDTO dto);

	
}