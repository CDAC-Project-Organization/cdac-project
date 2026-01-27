package com.healthcare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.healthcare.dtos.DoctorResponseDTO;
import com.healthcare.entities.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
	
	
	
}
