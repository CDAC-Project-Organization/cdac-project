package com.healthcare.dtos;
/*
 * {
  "appointmentId": 10,
  "doctorName": "Dr. Priya Sharma",
  "patientName" : ....
  "appointmentDateTime": "2025-11-05T10:30:00",
  "status": "SCHEDULED",
  "patientPhone" : .... 
}
 */

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.healthcare.entities.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompleteAppointmentDetails {
	private Long id;
	private String docFirstName;
	private String docLastName;
	private String patientFirstName;
	private String patientLastName;
	private LocalDateTime appointmentDateTime;
	private Status status;		
}
