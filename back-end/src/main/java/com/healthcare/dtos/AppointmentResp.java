package com.healthcare.dtos;
/*
 * {
  "appointmentId": 10,
  "doctorName": "Dr. Priya Sharma",
  "appointmentDateTime": "2025-11-05T10:30:00",
  "status": "SCHEDULED",
  "message": "Appointment booked successfully appointment id ...."
}

 */

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.healthcare.entities.AppointmentStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
//To tell Jackson (HttpMessageCoverter - to skip null values during serialization
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentResp {
	private Long id;
	private String firstName;//doc
	private String lastName;//doc
	private LocalDateTime appointmentDateTime;
	private AppointmentStatus status;	
	private String message;
	public AppointmentResp(Long id, String firstName, String lastName, LocalDateTime appointmentDateTime,
			AppointmentStatus status) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.appointmentDateTime = appointmentDateTime;
		this.status = status;
	}	
	
}
