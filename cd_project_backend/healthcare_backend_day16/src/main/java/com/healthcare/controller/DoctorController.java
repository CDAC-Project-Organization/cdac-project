package com.healthcare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.entities.Doctor;
import com.healthcare.service.DoctorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DoctorController {
	
	private final DoctorService doctorService;
	
	@GetMapping("/findAllDoctors")
	ResponseEntity<?> AllDoctors(){
		
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.findAllDoctors());
		 
	}
	
	
	
	
	
}
