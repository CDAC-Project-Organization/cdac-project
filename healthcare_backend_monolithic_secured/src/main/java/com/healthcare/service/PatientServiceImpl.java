package com.healthcare.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.ApiException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.PatientDTO;
import com.healthcare.dtos.PatientRegDTO;
import com.healthcare.dtos.PatientResp;
import com.healthcare.entities.Patient;
import com.healthcare.entities.UserRole;
import com.healthcare.repository.PatientRepository;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {
	//ctor based D.I
	private final PatientRepository patientRepository;
	private final ModelMapper modelMapper;
	private final UserRepository userRepository;

	@Override
	public PatientResp getPatientDetailsByUserId(Long userId) {
		//1. get patient details
		Patient entity=patientRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid user id to fetch patient specific details!!!!!"));
		//2. entity -> dto : ModelMapper
		return modelMapper.map(entity, PatientResp.class);
	}
	public ApiResponse registerNewPatient(PatientRegDTO reqDTO) {
		// 1. validate for dup email or phone
		if(userRepository.existsByEmailOrPhone(reqDTO.getUserDetails().getEmail(),reqDTO.getUserDetails().getPhone()))
			throw new ApiException("Email alread Exists !!!!!");
		// 2. in case of no dup email -> dto -> entity (deep copy- highlight)
		Patient entity = modelMapper.map(reqDTO, Patient.class);		
		//2.5 assign patient role
		entity.getUserDetails().setUserRole(UserRole.ROLE_PATIENT);
		//3. save patient entity (highlight - JPA cascade)
		Patient persistentEntity=patientRepository.save(entity);//users : insert -> PK -> child rec -> patients : FK		
		//4. ret api resp dto
		return new ApiResponse("New Patient Registered with ID="+persistentEntity.getId(), "Success");
	}

	@Override
	public List<PatientDTO> getAllPatients() {
		// TODO Auto-generated method stub
		return patientRepository.getAllPatientDetails();
	}
}
