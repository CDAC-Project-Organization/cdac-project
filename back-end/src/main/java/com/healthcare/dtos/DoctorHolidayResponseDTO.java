package com.healthcare.dtos;

import java.time.LocalDate;
import lombok.Data;

@Data
public class DoctorHolidayResponseDTO {

    private Long holidayId;
    private LocalDate holidayDate;
    private String reason;
    private Long doctorId;
}
