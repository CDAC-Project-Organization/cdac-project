package com.healthcare.service;




import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.dtos.DoctorResponseDTO;
import com.healthcare.entities.Doctor;
import com.healthcare.repository.DoctorRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
	
	private final DoctorRepository doctorRepository;
	private final ModelMapper modelMapper;
	
	@Override
	public List<DoctorResponseDTO> findAllDoctors() {
		
		  List<Doctor> doctors = doctorRepository.findAll();
		  return doctors.stream()
		            .map(doctor -> {

		                DoctorResponseDTO dto =
		                        modelMapper.map(doctor, DoctorResponseDTO.class);

		                dto.setDoctorName(doctor.getUser().getName());
		                dto.setEmail(doctor.getUser().getEmail());

		                return dto;
		            })
		            .toList(); 
	
		
	}
		
	


}
