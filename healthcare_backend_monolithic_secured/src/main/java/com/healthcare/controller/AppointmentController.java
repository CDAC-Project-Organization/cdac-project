package com.healthcare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.BookAppointment;
import com.healthcare.dtos.MarkCompleteDTO;
import com.healthcare.service.AppointmentService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {
	//depcy
	private final AppointmentService appointmentService;
	/*
	 * Desc - Book Appointment
	 * URI - /appointments
	 * Method - POST
	 * Payload - {patientId, docId , TS} 
	 * request body -> BookAppointment : DTO
	 * Success Resp - SC 201 , Appointment resp dto
	 * Error Resp - SC 400 + ApiResp - status : failed
	 */
	@PostMapping
	@Operation(description ="Book Appointment" )
	public ResponseEntity<?> bookPatientAppointment(@RequestBody BookAppointment dto)
	{
		System.out.println("in book appointment "+dto);
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(appointmentService.bookAppointment(dto));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse("Failed", e.getMessage()));
		}
	}
	/*
	 * GET /appointments - only under admin access
	 */
	
	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAllAppointments() {
		 ResponseEntity<?> responseEntity = ResponseEntity.ok(appointmentService.getAllAppointments());		 
		 return responseEntity;
	}
	/*
	 * Desc - List Patient's upcoming appointments by patient id
	 * URI - /appointments/patients/{patientId}/upcoming
   	Method - GET
	Path var- patient id
	Response - list of upcoming appointment dtos - id ,ts doc name
	Error Resp - SC 404
	 */
	@GetMapping("/patients/{patientId}/upcoming")
	public ResponseEntity<?> listPatientUpcomingAppointments(@PathVariable Long patientId)
	{
		System.out.println("in list patient upcoming appointments "+patientId);
		try {
			return ResponseEntity.ok(appointmentService.getPatientUpcomingAppointments(patientId));
		} catch (RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
	}
	/*
	 *Desc -  Doctor wants to cancel appointment
	   i/p -  doctorId , appointmentId 
		URI - /appointments/{appoint
		mentId}/doctors/{docId}/cancel
		Method - PATCH
		Error Response - SC 400
		Success Response - SC 200 + Apiresp - success mesg
	 */
	@PatchMapping("/{appointmentId}/doctors/{docId}/cancel")
	public ResponseEntity<?> cancelDoctorAppointment(@PathVariable Long appointmentId ,@PathVariable Long docId){
		System.out.println("in cancel doc "+appointmentId+" "+docId);
		try {
			return ResponseEntity.ok(appointmentService.cancelDocAppointment(appointmentId,docId));
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().build();
		}
	}
	/*
	 * 2. List doctor's upcoming appointments 
	 * i/p : path variable - user id of doctor 
	 * URL -http://host:port/appointments/doctors/{doctorId}/upcoming 
	 * Method - GET 
	 * Path var-  doctor id 
	 * Response - list of upcoming appointment dtos 
	 */
	@GetMapping("/doctors/{doctorId}/upcoming")
	public ResponseEntity<?> listDoctorsUpcomingAppointmentsByDocId(@PathVariable  @NotNull @Positive  Long doctorId) {
		System.out.println("in list doctor's upcoming appointments "+doctorId);
		
			//invoke service layer method
			return ResponseEntity.ok //SC 200
					(appointmentService.getDoctorUpcomingAppointments(doctorId));
		
	}
	
	/*
	 * Desc - Mark appointment complete & prescribe tests(only under doctor role)
	 * URL - http://host:port/appointments/mark-complete-with-tests
	 * Method - POST
   		Eg. Request payload:
		{
		   "appointmentId" : 1,
           "testIds": [1, 2, 3]  		  
		}
		Success Resp - Api Resp with success message
		Error Resp - Handled by Global Exception Handler
	 */
	@PostMapping("/mark-complete-with-tests")
	public ResponseEntity<?> markAppointmentCompleteWithTestsPrescribed(@RequestBody @Valid MarkCompleteDTO dto) {
		System.out.println("in mark complete "+dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(appointmentService.markComplete(dto));
	}
	
	

}
