package com.healthcare.dtos;

import com.healthcare.entities.BloodGroup;
import com.healthcare.entities.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//p.id,u.firstName,u.lastName,p.gender,p.bloodGroup,p.familyHistory
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
	private Long patientId;
	private String firstName;
	private String lastName;
	private Gender gender;
	private BloodGroup bloodGroup;	
	private String familyHistory;	
	
}
