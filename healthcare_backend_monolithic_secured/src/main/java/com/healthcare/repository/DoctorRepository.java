package com.healthcare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.dtos.DoctorDTO;
import com.healthcare.entities.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
	@Query("select new com.healthcare.dtos.DoctorDTO(d.id,u.firstName,u.lastName,d.speciality,d.fees) from Doctor d join d.userDetails u")
	List<DoctorDTO> getAllDoctorDetails();
	
	@Query("select new com.healthcare.dtos.DoctorDTO(d.id,u.firstName,u.lastName,d.speciality,d.fees) from Doctor d join d.userDetails u where u.id=:id")
	Optional<DoctorDTO> getDoctorDetails(@Param("id") Long id);
	
}
