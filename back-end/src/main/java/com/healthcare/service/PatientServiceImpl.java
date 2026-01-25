//import org.modelmapper.ModelMapper;

package com.healthcare.service;


import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.PatientRequestDTO;
import com.healthcare.dtos.PatientResponseDTO;
import com.healthcare.entities.Patient;
import com.healthcare.entities.User;
import com.healthcare.entities.UserRole;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.repository.PatientRepository;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import com.healthcare.custom_exceptions.DuplicateResourceException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;



@Service
@Transactional
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<PatientResponseDTO> findAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(patient -> {
                    PatientResponseDTO dto =
                            modelMapper.map(patient, PatientResponseDTO.class);
                    dto.setPatientName(patient.getUser().getName());
                    dto.setEmail(patient.getUser().getEmail());
                    return dto;
                })
                .toList();
    }
    
    
    
    
    
    @Override
    public void deletePatientById(Long patientId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id : " + patientId));

        patientRepository.delete(patient);
    }
    
    
    @Override
    public ApiResponse addPatient(PatientRequestDTO dto) {

    	System.out.println(dto);
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        if (userRepository.existsByPhone(dto.getPhone())) {
            throw new DuplicateResourceException("Phone already exists");
        }

        
        User user = modelMapper.map(dto, User.class);
        user.setRole(UserRole.ROLE_PATIENT);
        userRepository.save(user);

        
        Patient patient = modelMapper.map(dto, Patient.class);
        patient.setUser(user);
        patientRepository.save(patient);

        return new ApiResponse(
                "Success",
                "Patient added successfully with id : " + patient.getPatientId()
        );
    }
}