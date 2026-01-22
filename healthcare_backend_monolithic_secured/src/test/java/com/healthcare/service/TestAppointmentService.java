package com.healthcare.service;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.healthcare.custom_exceptions.InvalidInputException;
import com.healthcare.dtos.AppointmentResp;
import com.healthcare.dtos.BookAppointment;

@SpringBootTest // enables all spring beans including - controller , service , dao , entities
//By default - transactions are not rolled back
class TestAppointmentService {
	@Autowired
	private AppointmentService appointmentService;

	@Test
	void testBookAppointment() {
		BookAppointment newAppointment = new BookAppointment(2l, 1l, LocalDateTime.parse("2026-03-11T18:20"));
		try {
			AppointmentResp bookAppointment = appointmentService.bookAppointment(newAppointment);
			assertEquals(3l, bookAppointment.getId());
		} catch (Exception e) {
			assertEquals(true, e.getMessage().contains("Unavailable"));
		}

	}

}
