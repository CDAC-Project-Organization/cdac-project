package com.healthcare.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.DoctorHoliday;

public interface DoctorHolidayRepository extends JpaRepository<DoctorHoliday, Long> {

    boolean existsByDoctor_DoctorIdAndHolidayDate(Long doctorId, LocalDate date);
}

