package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.DoctorRequestDTO;
import com.healthcare.dtos.DoctorResponseDTO;
import com.healthcare.dtos.DoctorUserResponseDTO;
import com.healthcare.dtos.EditDoctorRequest;

public interface DoctorService {
	
	public List<DoctorResponseDTO> findAllDoctors();
	
	public void addDoctor(DoctorRequestDTO dto);

	public ApiResponse editDoctorProfile(EditDoctorRequest request);

	public ApiResponse deleteDoctorById(Long doctorId);
	
	public DoctorUserResponseDTO getDoctorByUserId(Long userId);
}
