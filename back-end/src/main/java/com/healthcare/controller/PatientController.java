package com.healthcare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
import com.healthcare.dtos.AppointmentRequestDTO;
import com.healthcare.dtos.DoctorAvailabilityResponse;
import com.healthcare.dtos.EditPatientRequest;
import com.healthcare.dtos.PatientRequestDTO;
import com.healthcare.dtos.PatientResponseDTO;
import com.healthcare.service.AppointmentService;
import com.healthcare.service.PatientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final AppointmentService appointmentService;

    
    @GetMapping("/AllPatients")
    public ResponseEntity<List<PatientResponseDTO>> getAllPatients() {
        return ResponseEntity.ok(patientService.findAllPatients());
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePatient(@PathVariable Long id) {

        patientService.deletePatientById(id);

        return ResponseEntity.ok(
                new ApiResponse(
                        "Success",
                        "Patient deleted successfully with id : " + id
                )
        );
    }
    
    @PostMapping("/addPatient")
    public ResponseEntity<ApiResponse> addPatient(
    		@RequestBody PatientRequestDTO dto){
    	System.out.println(dto);
    	return ResponseEntity.ok(patientService.addPatient(dto));
    }

    @PutMapping("/edit-profile/{patientId}")
    public ResponseEntity<ApiResponse> editPatientProfile(
        @PathVariable Long patientId,
        @RequestBody @Valid EditPatientRequest request) {

    ApiResponse response = patientService.editPatientProfile(patientId, request);
    return ResponseEntity.ok(response);
}
    
    @GetMapping("/doctors/{doctorId}/available-slots")
    public ResponseEntity<DoctorAvailabilityResponse> getAvailableSlots(
            @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                appointmentService.getAvailableSlotsForDoctor(doctorId)
        );
    }
    
    @PostMapping("/bookAppointment")
    public ResponseEntity<ApiResponse> bookAppointment(
            @RequestBody AppointmentRequestDTO dto) {

        return ResponseEntity.ok(patientService.bookAppointment(dto));
    }
    
    @GetMapping("/byUser/{userId}")
    public ResponseEntity<PatientResponseDTO> getPatientByUserId(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                patientService.getPatientByUserId(userId)
        );
    }

}