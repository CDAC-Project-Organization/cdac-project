package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.DoctorDTO;

public interface DoctorService {
	// add a method to get doc details by user id
	DoctorDTO getDoctorDetailsByUserId(Long userId);

	List<DoctorDTO> getAllDoctors();
}
