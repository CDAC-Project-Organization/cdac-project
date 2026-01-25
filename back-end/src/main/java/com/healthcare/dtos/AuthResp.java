package com.healthcare.dtos;

import com.healthcare.entities.UserRole;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
//user id ,name, email , role , message
public class AuthResp {
	private Long id;	
	private String firstName;	
	private String lastName;	
	private String email;	
	private UserRole userRole;
	private String message;
	
}
