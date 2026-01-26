package com.healthcare.service;

import java.util.List;
import com.healthcare.dtos.AppointmentResponseDTO;

public interface AppointmentService {

    List<AppointmentResponseDTO> getAllAppointments();
}
