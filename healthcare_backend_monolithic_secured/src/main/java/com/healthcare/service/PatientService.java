package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.PatientDTO;
import com.healthcare.dtos.PatientRegDTO;
import com.healthcare.dtos.PatientResp;

public interface PatientService {
	// get patient details by user id
	PatientResp getPatientDetailsByUserId(Long userId);

	List<PatientDTO> getAllPatients();

	// method to sign up
	ApiResponse registerNewPatient(PatientRegDTO reqDTO);

}
