package com.healthcare.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dtos.DoctorDTO;
import com.healthcare.repository.DoctorRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
	private final DoctorRepository doctorRepository;

	@Override
	public List<DoctorDTO> getAllDoctors() {
		// TODO Auto-generated method stub
		return doctorRepository.getAllDoctorDetails();
	}

	@Override
	public DoctorDTO getDoctorDetailsByUserId(Long userId) {
		// TODO Auto-generated method stub
		return doctorRepository.getDoctorDetails(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid user id for doctor"));
	}

}
