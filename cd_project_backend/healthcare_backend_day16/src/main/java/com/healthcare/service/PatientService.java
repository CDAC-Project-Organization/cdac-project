package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.PatientRequestDTO;
import com.healthcare.dtos.PatientResponseDTO;

public interface PatientService {
	
//List<PatientResponseDTO> findAllPatients();
	List<PatientResponseDTO> findAllPatients();
	
	//void deletePatientById(Long patientId);

	//void deletePatientById(Long id);

	void deletePatientById(Long id);

	//ApiResponse addPatient(PatientRequestDTO dto);

	//void deletePatientById(Long id);
	
	//ApiResponse addPatient(PatientRequestDTO dto);

	//ApiResponse addPatient(PatientRequestDTO dto);
	
	ApiResponse addPatient(PatientRequestDTO dto);
	
}
