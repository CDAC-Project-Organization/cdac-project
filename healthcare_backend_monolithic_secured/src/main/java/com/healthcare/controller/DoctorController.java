package com.healthcare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.service.DoctorService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
public class DoctorController {
	//depcy	
	private final DoctorService doctorService;
	/*
	 * Design API end point in Doctor controller
	 * Desc -Get Doctor Specific Details
      URI -/doctors/{userId}
      Method - GET 
      path variable(URI template var) 	 
*  Response - ResponseEntity<?>
	 * error resp - SC 404 (in case of invalid user id) + Api resp (DTO) - err mesg
	 * success - SC 200 + DoctorDTO
	 */
	@GetMapping("/{userId}")
	@Operation(description = "Get Doctor Specific Details by user id")
	public ResponseEntity<?> getDoctorDetails(@PathVariable Long userId) {
		System.out.println("in get doctor details");
		try {
			return ResponseEntity.ok(doctorService.getDoctorDetailsByUserId(userId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage(), "Failed"));
		}
	}
	
	/*
	 * Design API end point in Doctor controller
	 * Desc -Get all doctor details
      URI -/doctors
      Method - GET 
    	 
*  Response - ResponseEntity<?>
	 * 
	 * success - SC 200 + List<DoctorDTO>
	 */
	@GetMapping
	@Operation(description = "Get All Doctor Details ")
	public ResponseEntity<?> getAllDoctorDetails() {
		System.out.println("in get all doctor details - "+doctorService.getClass());		
			return ResponseEntity.ok(doctorService.getAllDoctors());		
	}


}
