package com.healthcare.dtos;

import com.healthcare.entities.BloodGroup;
import com.healthcare.entities.Gender;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter

@NoArgsConstructor



public class PatientResponseDTO {
	private Long patientId;
	
	private String patientName;
    private String email;
	
	private BloodGroup bloodGroup;	
	private Gender gender;	
	private String familyHistory;	
}