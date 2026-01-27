package com.healthcare.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.dtos.AppointmentResponseDTO;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.AppointmentStatus;
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
    
    List<Appointment> findByDoctor_DoctorIdAndStatusIn(
            Long doctorId,
            List<AppointmentStatus> statuses
    );
    
    @Query("""
            SELECT a
            FROM Appointment a
            JOIN FETCH a.patient p
            JOIN FETCH p.user u
            WHERE a.doctor.doctorId = :doctorId
            AND a.status IN :statuses
        """)
        List<Appointment> findDoctorAppointmentsWithPatientDetails(
                @Param("doctorId") Long doctorId,
                @Param("statuses") List<AppointmentStatus> statuses
        );
    
    @Query("""
            SELECT a
            FROM Appointment a
            JOIN FETCH a.doctor d
            JOIN FETCH d.user u
            WHERE a.patient.patientId = :patientId
            AND a.status IN :statuses
        """)
        List<Appointment> findPatientAppointmentsWithDoctorDetails(
                @Param("patientId") Long patientId,
                @Param("statuses") List<AppointmentStatus> statuses
        );
    
    List<Appointment> findByDoctor_DoctorIdAndAppointmentDateIn(
            Long doctorId,
            List<LocalDate> dates
    );
    
    boolean existsByDoctorAndAppointmentDateAndStartTime(
            Doctor doctor,
            LocalDate appointmentDate,
            LocalTime startTime
    );
    
    
}
