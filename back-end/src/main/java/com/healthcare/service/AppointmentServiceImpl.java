package com.healthcare.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.AppointmentResponseDTO;
import com.healthcare.dtos.AvailableSlotDto;
import com.healthcare.dtos.DoctorAppointmentResponseDto;
import com.healthcare.dtos.DoctorAvailabilityResponse;
import com.healthcare.dtos.PatientAppointmentResponseDto;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.AppointmentStatus;
import com.healthcare.entities.Doctor;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorHolidayRepository;
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
    private final DoctorHolidayRepository doctorHolidayRepository;

    private static final int SLOT_DURATION_MINUTES = 20;

    @Override
    public List<AppointmentResponseDTO> getAllAppointments() {
        return appointmentRepository.findAllAppointmentsForResponse();
    }
    
    @Override
    public ApiResponse cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

       
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);

        return new ApiResponse(
                "SUCCESS",
                "Appointment cancelled successfully"
        );
    }
    
    
    @Override
    public List<Appointment> getAppointmentsForDoctor(Long doctorId) {

        return appointmentRepository.findByDoctor_DoctorIdAndStatusIn(
                doctorId,
                List.of(
                        AppointmentStatus.BOOKED,
                        AppointmentStatus.CANCELLED
                )
        );
    }
    
    
    
    
    @Override
    public List<DoctorAppointmentResponseDto> getDoctorAppointments(Long doctorId) {
    	
    	 doctorRepository.findById(doctorId)
         .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + doctorId));

        List<Appointment> appointments =
                appointmentRepository.findDoctorAppointmentsWithPatientDetails(
                        doctorId,
                        List.of(
                                AppointmentStatus.BOOKED,
                                AppointmentStatus.CANCELLED
                        )
                );

        List<DoctorAppointmentResponseDto> response = new ArrayList<>();

        for (Appointment appointment : appointments) {

            DoctorAppointmentResponseDto dto = new DoctorAppointmentResponseDto();

           
            dto.setAppointmentId(appointment.getId());
            dto.setAppointmentDate(appointment.getAppointmentDate());
            dto.setStartTime(appointment.getStartTime());
            dto.setEndTime(appointment.getEndTime());
            dto.setStatus(appointment.getStatus());

          
            dto.setPatientName(appointment.getPatient().getUser().getName());
            dto.setPatientEmail(appointment.getPatient().getUser().getEmail());
            dto.setPatientPhone(appointment.getPatient().getUser().getPhone());
            dto.setFamilyHistory(appointment.getPatient().getFamilyHistory());

            response.add(dto);
        }

        return response;
    }
    
    
    
    @Override
    public List<PatientAppointmentResponseDto> getPatientAppointments(Long patientId) {

        
        patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id: " + patientId)
                );

       
        List<Appointment> appointments =
                appointmentRepository.findPatientAppointmentsWithDoctorDetails(
                        patientId,
                        List.of(
                                AppointmentStatus.BOOKED,
                                AppointmentStatus.CANCELLED
                        )
                );

        
        List<PatientAppointmentResponseDto> response = new ArrayList<>();

        for (Appointment appointment : appointments) {

            PatientAppointmentResponseDto dto = new PatientAppointmentResponseDto();

            
            dto.setAppointmentId(appointment.getId());
            dto.setAppointmentDate(appointment.getAppointmentDate());
            dto.setStartTime(appointment.getStartTime());
            dto.setEndTime(appointment.getEndTime());
            dto.setStatus(appointment.getStatus());

           
            dto.setDoctorName(appointment.getDoctor().getUser().getName());
            dto.setDoctorEmail(appointment.getDoctor().getUser().getEmail());
            dto.setDoctorPhone(appointment.getDoctor().getUser().getPhone());
            dto.setSpeciality(appointment.getDoctor().getSpeciality());

            response.add(dto);
        }

        return response;
    }
    
    
    
    
    
    
    
    @Override
    public DoctorAvailabilityResponse getAvailableSlotsForDoctor(Long doctorId) {

        // 1️ Check doctor exists
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found with id: " + doctorId)
                );

        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);

        // 2️ Check holiday
        boolean isHolidayToday =
                doctorHolidayRepository.existsByDoctor_DoctorIdAndHolidayDate(doctorId, today);

        boolean isHolidayTomorrow =
                doctorHolidayRepository.existsByDoctor_DoctorIdAndHolidayDate(doctorId, tomorrow);

        if (isHolidayToday && isHolidayTomorrow) {
            DoctorAvailabilityResponse response = new DoctorAvailabilityResponse();
            response.setMessage("Doctor is unavailable today and tomorrow");
            response.setAvailableSlots(List.of());
            return response;
        }

        // 3 Fetch booked appointments
        List<Appointment> bookedAppointments =
                appointmentRepository.findByDoctor_DoctorIdAndAppointmentDateIn(
                        doctorId,
                        List.of(today, tomorrow)
                );

        //  4 Create booked slot set
        Set<String> bookedSlotKeys = new HashSet<>();
        for (Appointment appointment : bookedAppointments) {
            bookedSlotKeys.add(
                    appointment.getAppointmentDate() + "_" + appointment.getStartTime()
            );
        }

        // 5 Generate available slots
        List<AvailableSlotDto> availableSlots = new ArrayList<>();

        generateSlotsForDate(
                doctor,
                today,
                isHolidayToday,
                bookedSlotKeys,
                availableSlots
        );

        generateSlotsForDate(
                doctor,
                tomorrow,
                isHolidayTomorrow,
                bookedSlotKeys,
                availableSlots
        );

        DoctorAvailabilityResponse response = new DoctorAvailabilityResponse();
        response.setMessage("Available slots fetched successfully");
        response.setAvailableSlots(availableSlots);

        return response;
    }

    private void generateSlotsForDate(
            Doctor doctor,
            LocalDate date,
            boolean isHoliday,
            Set<String> bookedSlotKeys,
            List<AvailableSlotDto> availableSlots
    ) {

        if (isHoliday) return;

        LocalTime slotStart = doctor.getStartTime();
        LocalTime slotEndLimit = doctor.getEndTime();

        while (slotStart.plusMinutes(SLOT_DURATION_MINUTES).isBefore(slotEndLimit)
                || slotStart.plusMinutes(SLOT_DURATION_MINUTES).equals(slotEndLimit)) {

            String slotKey = date + "_" + slotStart;

            if (!bookedSlotKeys.contains(slotKey)) {
                AvailableSlotDto slot = new AvailableSlotDto();
                slot.setDate(date);
                slot.setStartTime(slotStart);
                slot.setEndTime(slotStart.plusMinutes(SLOT_DURATION_MINUTES));
                availableSlots.add(slot);
            }

            slotStart = slotStart.plusMinutes(SLOT_DURATION_MINUTES);
        }
    }
    
    
    
    
    
    
}
