package com.healthcare.service;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.InvalidInputException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.AppointmentResp;
import com.healthcare.dtos.BookAppointment;
import com.healthcare.dtos.CompleteAppointmentDetails;
import com.healthcare.dtos.MarkCompleteDTO;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.DiagTest;
import com.healthcare.entities.Doctor;
import com.healthcare.entities.Patient;
import com.healthcare.entities.Status;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DiagTestRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
	private final AppointmentRepository appointmentRepository;
	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;
	private final ModelMapper modelMapper;
	private final DiagTestRepository diagTestRepository;
	

	@Override
	public AppointmentResp bookAppointment(BookAppointment dto) {
		// 1. validate if doc exists
		Doctor doctor=doctorRepository.findById(dto.getDoctorId())
				.orElseThrow(() -> 
				new ResourceNotFoundException("Invalid doctor ID!!!!!"));
		//2  validate if patient exists
				Patient patient=patientRepository.findById(dto.getPatientId())
						.orElseThrow(() -> 
						new ResourceNotFoundException("Invalid Patient ID!!!"));
		//3. check if doc is available - Spring Data - derived query
				//assumption - 30 min appointment slot
				LocalDateTime start=dto.getTimeSlot().minusMinutes(30);
				LocalDateTime end=dto.getTimeSlot().plusMinutes(30);
				if(appointmentRepository.existsByMyDoctorIdAndAppointmentDateTimeGreaterThanEqualAndAppointmentDateTimeLessThanEqualAndStatus(dto.getDoctorId(), start, end, Status.SCHEDULED))
					throw new InvalidInputException("Appointment Unavailable !!!!");				
		//4. create appointment entity -> establish E-R , set status...save
				Appointment appointment=new Appointment();
				appointment.setAppointmentDateTime(dto.getTimeSlot());
				appointment.setMyDoctor(doctor);//appointment *-----> 1 doctor
				appointment.setMyPatient(patient);//appointment *-----> 1 patient
				appointment.setStatus(Status.SCHEDULED);
				Appointment persistentEntity = appointmentRepository.save(appointment);
		//5. entity -> dto -> send it to the caller
				AppointmentResp respDTO = modelMapper.map(persistentEntity, AppointmentResp.class);
				respDTO.setFirstName(doctor.getUserDetails().getFirstName());
				respDTO.setLastName(doctor.getUserDetails().getLastName());
				respDTO.setMessage("Appointment Booked with ID "+persistentEntity.getId());
		return respDTO;
	}
	@Override
	public List<AppointmentResp> getPatientUpcomingAppointments(Long patientId) {		
		return appointmentRepository.getAllPatientsUpcomingAppointments(patientId, LocalDateTime.now(), Status.SCHEDULED);
	}
	
	@Override
	public List<AppointmentResp> getDoctorUpcomingAppointments(Long doctorId) {		
		return appointmentRepository.getAllDoctorsUpcomingAppointments(doctorId, LocalDateTime.now(), Status.SCHEDULED);
	}
	@Override
	public ApiResponse cancelDocAppointment(Long appointmentId, Long docId) {
		// 1. validate appointment
		Appointment appointment=appointmentRepository.findById(appointmentId).orElseThrow(() -> new ResourceNotFoundException("Invalid Appointment ID!!!!"));
		//2. validate if doc is the owner of the appointment & sts- scheduled
		if(docId == appointment.getMyDoctor().getId() && appointment.getStatus()==Status.SCHEDULED)
		{
			//appointment : persistent
			appointment.setStatus(Status.CANCELLED);
			return new ApiResponse("Success", "Apointment Cancelled!!!!");
		}
		throw new InvalidInputException("Invalid doctor or appointment is not scheduled !!!!!");
	}
	@Override
	public List<CompleteAppointmentDetails> getAllAppointments() {
		// TODO Auto-generated method stub
		return appointmentRepository.getAllAppointments();
	}
	
	@Override
	public ApiResponse markComplete(MarkCompleteDTO dto) {
		// 1. validate appointment id & status-SCHEDULED (only scheduled appointments can be marked a completed !)
		Appointment appointment=appointmentRepository.findById(dto.getAppointmentId()).orElseThrow(() -> new ResourceNotFoundException("Invalid appointment ID !"));
		//appointment : PERSISTENT
		//2. validate status
		if(appointment.getStatus() != Status.SCHEDULED)
			throw new InvalidInputException("Only Scheduled appointments can be marked as complete !!!!");
		//4. all valid inputs  - mark appointment status - complete
		appointment.setStatus(Status.COMPLETED);
		//5 . Add diag tests - many-many 
		List<DiagTest> testsByIds = diagTestRepository.findAllById(dto.getTestIds());
		//6 . Add them to appointment diag tests
		appointment.getDiagTests().addAll(testsByIds);		
		return new ApiResponse("Appointment ID "+dto.getAppointmentId()+"    Completed & tests prescribed ", "Success");
	}
	
	

}
