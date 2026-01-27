package com.healthcare.dtos;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DoctorAvailabilityResponse {

    private String message;
    private List<AvailableSlotDto> availableSlots;
}
