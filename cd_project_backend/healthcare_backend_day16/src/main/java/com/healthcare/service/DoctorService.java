package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.DoctorResponseDTO;
import com.healthcare.entities.Doctor;

public interface DoctorService {
	
	public List<DoctorResponseDTO> findAllDoctors();
}
