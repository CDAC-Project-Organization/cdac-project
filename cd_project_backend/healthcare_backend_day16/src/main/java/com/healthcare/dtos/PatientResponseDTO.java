package com.healthcare.dtos;

import com.healthcare.entities.BloodGroup;
import com.healthcare.entities.Gender;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PatientResponseDTO {
	private Long patientId;//patient id 
	
	private String patientName;
    private String email;
	
	private BloodGroup bloodGroup;	
	private Gender gender;	
	private String familyHistory;	
}
