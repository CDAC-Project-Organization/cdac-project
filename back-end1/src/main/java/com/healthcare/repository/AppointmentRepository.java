package com.healthcare.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.healthcare.dtos.AppointmentResponseDTO;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.Doctor;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("""
        SELECT new com.healthcare.dtos.AppointmentResponseDTO(
            a.id,
            p.user.name,
            d.user.name,
            a.appointmentDate,
            a.startTime,
            a.endTime,
            a.status
        )
        FROM Appointment a
        JOIN a.patient p
        JOIN a.doctor d
    """)
    List<AppointmentResponseDTO> findAllAppointmentsForResponse();
    
    boolean existsByDoctorAndAppointmentDateAndStartTime(
            Doctor doctor,
            LocalDate appointmentDate,
            LocalTime startTime
    );
    
}
