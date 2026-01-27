package com.healthcare.service;




import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.DuplicateResourceException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.DoctorRequestDTO;
import com.healthcare.dtos.DoctorResponseDTO;
import com.healthcare.dtos.DoctorUserResponseDTO;
import com.healthcare.dtos.EditDoctorRequest;
import com.healthcare.entities.Doctor;
import com.healthcare.entities.User;
import com.healthcare.entities.UserRole;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
	
	private final DoctorRepository doctorRepository;
	private final ModelMapper modelMapper;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
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

	 @Override
	    public void addDoctor(DoctorRequestDTO dto) {

		 
	        if (userRepository.existsByEmail(dto.getEmail())) {
	        	
	            throw new DuplicateResourceException("Email already exists");
	        }

	        if (userRepository.existsByPhone(dto.getPhone())) {
	            throw new DuplicateResourceException("Phone already exists");
	        }

	        
	        User user = modelMapper.map(dto, User.class);
	        user.setRole(UserRole.ROLE_DOCTOR);
	        user.setPassword(
	                passwordEncoder.encode(dto.getPassword())
	        );
	        userRepository.save(user);

	        Doctor doctor = modelMapper.map(dto, Doctor.class);
	        doctor.setUser(user);

	        doctorRepository.save(doctor);
	    }

	 public ApiResponse editDoctorProfile(EditDoctorRequest request) {

	        Doctor doctor = doctorRepository.findById(request.getDoctorId())
	                .orElseThrow(() ->
	                        new ResourceNotFoundException("Doctor not found with id: " + request.getDoctorId()));

	        modelMapper.map(request, doctor);

	        User user = doctor.getUser();
	        user.setName(request.getDoctorName());
	        user.setEmail(request.getEmail());

	        doctorRepository.save(doctor);

	        return new ApiResponse("SUCCESS", "Doctor profile updated successfully");
	    }
	
	
	 public ApiResponse deleteDoctorById(Long doctorId) {

		    Doctor doctor = doctorRepository.findById(doctorId)
		            .orElseThrow(() ->
		                    new ResourceNotFoundException("Doctor not found with id: " + doctorId));

		    doctorRepository.delete(doctor);

		    return new ApiResponse("SUCCESS", "Doctor deleted successfully");
		}
	 
	 
	 @Override
	    public DoctorUserResponseDTO getDoctorByUserId(Long userId) {

	        Doctor doctor = doctorRepository.findByUser_Id(userId)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException("Doctor not found for user id: " + userId)
	                );

	       
	        DoctorUserResponseDTO dto =
	                modelMapper.map(doctor, DoctorUserResponseDTO.class);

	        // Map nested User fields manually (best practice)
	        dto.setUserId(doctor.getUser().getId());
	        dto.setName(doctor.getUser().getName());
	        dto.setEmail(doctor.getUser().getEmail());
	        dto.setPhone(doctor.getUser().getPhone());

	        return dto;
	    }
		
	


}
