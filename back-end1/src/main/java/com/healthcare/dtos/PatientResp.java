package com.healthcare.dtos;

import com.healthcare.entities.BloodGroup;
import com.healthcare.entities.Gender;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PatientResp {
	private Long id;//patient id 
	private BloodGroup bloodGroup;	
	private Gender gender;	
	private String familyHistory;	
}
