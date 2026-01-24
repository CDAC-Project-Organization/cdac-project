package com.healthcare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.dtos.PatientDTO;
import com.healthcare.entities.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
//derived query to get patient details by user id
	// select p from Patient p where p.userDetails.id=:pid
	Optional<Patient> findByUserDetailsId(Long userId);
	
	// get all patient details - joining user details
		@Query("select new com.healthcare.dtos.PatientDTO(p.id,u.firstName,u.lastName,p.gender,p.bloodGroup,p.familyHistory) from Patient p join p.userDetails u")
		List<PatientDTO> getAllPatientDetails();


	// get specific patient's details - joining user details
	@Query("select new com.healthcare.dtos.PatientDTO(p.id,u.firstName,u.lastName,p.gender,p.bloodGroup,p.familyHistory) from Patient p join p.userDetails u where u.id=:id")
	Optional<PatientDTO> getPatientDetail(@Param("id") Long id);

}
