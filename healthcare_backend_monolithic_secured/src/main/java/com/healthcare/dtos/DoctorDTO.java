package com.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
//d.id,u.firstName,u.lastName,d.speciality,d.fees
@Getter
@Setter
@AllArgsConstructor
public class DoctorDTO {
	private Long doctorId;
	private String firstName;
	private String lastName;
	private String speciality;
	private int fees;
	
}
