package com.healthcare.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AvailableSlotDto {

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
}
