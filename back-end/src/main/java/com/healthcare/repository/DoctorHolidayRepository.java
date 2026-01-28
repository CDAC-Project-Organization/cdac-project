package com.healthcare.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.DoctorHoliday;

public interface DoctorHolidayRepository extends JpaRepository<DoctorHoliday, Long> {

    boolean existsByDoctor_DoctorIdAndHolidayDate(Long doctorId, LocalDate date);
    
    Optional<DoctorHoliday> findByDoctor_DoctorIdAndHolidayDate(
            Long doctorId, LocalDate holidayDate
    );
}

