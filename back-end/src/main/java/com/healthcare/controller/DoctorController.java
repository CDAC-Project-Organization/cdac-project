package com.healthcare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.DoctorHolidayRequestDTO;
import com.healthcare.dtos.DoctorHolidayResponseDTO;
import com.healthcare.dtos.DoctorRequestDTO;
import com.healthcare.dtos.DoctorUserResponseDTO;
import com.healthcare.dtos.EditDoctorRequest;
import com.healthcare.entities.DoctorHoliday;
import com.healthcare.security.UserPrincipal;
import com.healthcare.service.DoctorService;

import jakarta.validation.Valid;
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
	
	
	@PostMapping("/AddDoctors")
	public ResponseEntity<ApiResponse> addDoctor(@RequestBody @Valid DoctorRequestDTO dto) {
	    doctorService.addDoctor(dto);
	    return ResponseEntity
	            .status(HttpStatus.CREATED)
	            .body(new ApiResponse("Success", "Doctor added successfully"));
	}
	
	
	
	
	 @PutMapping("/edit-profile")
	    public ResponseEntity<ApiResponse> editDoctorProfile(
	            @RequestBody EditDoctorRequest request) {

	        ApiResponse response = doctorService.editDoctorProfile(request);
	        return ResponseEntity.ok(response);
	    }
	 
	 
	 
	 @DeleteMapping("/{doctorId}")
	 public ResponseEntity<ApiResponse> deleteDoctor(@PathVariable Long doctorId) {

	     ApiResponse response = doctorService.deleteDoctorById(doctorId);
	     return ResponseEntity.ok(response);
	 }

	
	 @GetMapping("/by-user")
	 public ResponseEntity<DoctorUserResponseDTO> getDoctorForLoggedInUser() {

	     UserPrincipal principal =
	             (UserPrincipal) SecurityContextHolder
	                     .getContext()
	                     .getAuthentication()
	                     .getPrincipal();

	     Long userId = principal.getUserId();

	     DoctorUserResponseDTO response =
	             doctorService.getDoctorByUserId(userId);

	     return ResponseEntity.ok(response);
	 }

	 
	   @PostMapping("/holiday/{doctorId}")
	    public ResponseEntity<?> addDoctorHoliday(
	            @PathVariable Long doctorId,
	            @RequestBody DoctorHolidayRequestDTO request
	    ) {
		   DoctorHoliday holiday =
		            doctorService.addDoctorHoliday(doctorId, request);

		    DoctorHolidayResponseDTO response = new DoctorHolidayResponseDTO();
		    response.setHolidayId(holiday.getHolidayId());
		    response.setHolidayDate(holiday.getHolidayDate());
		    response.setReason(holiday.getReason());
		    response.setDoctorId(holiday.getDoctor().getDoctorId());

		    return ResponseEntity.ok(response);
	    }
	
	
	
	
}
