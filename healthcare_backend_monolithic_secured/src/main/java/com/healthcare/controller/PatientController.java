package com.healthcare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.PatientRegDTO;
import com.healthcare.service.PatientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/patients")
//lombok
@RequiredArgsConstructor
public class PatientController {
	//depcy : ctor based D.I
	private final PatientService patientService;
	/*
	 * *
	 * Design API end point in Patient controller
	 * Desc -Get Patient Specific Details
      URI -/patients/{userId}
      Method - GET 
      path variable(URI template var) 	 
*  Response - ResponseEntity<?>
	 * error resp - SC 404 (in case of invalid user id) + Api resp (DTO) - err mesg
	 * success - SC 200 + Patient DTO
	 */
@GetMapping("/{userId}")
//Patient should be able see only its own details
//@PreAuthorize("#userId == authentication.principal.userId")
public ResponseEntity<?> getPatientDetails(@PathVariable Long userId)
{
	System.out.println("in get patient details "+userId);
	try {
		return ResponseEntity.ok(patientService.getPatientDetailsByUserId(userId));
	} catch (RuntimeException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ApiResponse("Failed", e.getMessage()));
	}
}
/*
 * Desc - Patient Registration 
 * URL - http://host:port/patients/signup 
 * Method - POST 
 * Payload - req dto 
 * Success resp - api resp + SC 201 
 * Failed - api resp + SC 400
 */
@PostMapping("/signup")
public ResponseEntity<?> registerPatient(@RequestBody @Valid
		PatientRegDTO dto) {
	System.out.println("in patient reg " + dto);
	
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(patientService.registerNewPatient(dto));		
	
}
/*
 * GET /patients - only under admin access
 */
@GetMapping
public ResponseEntity<?> getAllPatients() {
	 ResponseEntity<?> responseEntity = ResponseEntity.ok(patientService.getAllPatients());
	 return responseEntity;
}

	

}
