package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.AppointmentResp;
import com.healthcare.dtos.BookAppointment;
import com.healthcare.dtos.CompleteAppointmentDetails;
import com.healthcare.dtos.MarkCompleteDTO;

public interface AppointmentService {

	AppointmentResp bookAppointment(BookAppointment dto);

	List<AppointmentResp> getPatientUpcomingAppointments(Long patientId);
	
	List<AppointmentResp> getDoctorUpcomingAppointments(Long doctorId);

	ApiResponse cancelDocAppointment(Long appointmentId, Long docId);

	List<CompleteAppointmentDetails> getAllAppointments();
	
	ApiResponse markComplete(MarkCompleteDTO dto);

}
