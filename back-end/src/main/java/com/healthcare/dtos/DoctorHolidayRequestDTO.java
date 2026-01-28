package com.healthcare.dtos;



import lombok.Data;
import java.time.LocalDate;

@Data
public class DoctorHolidayRequestDTO {

    private LocalDate holidayDate;
    private String reason;
}
