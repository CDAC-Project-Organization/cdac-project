package com.healthcare.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.healthcare.dtos.AppointmentResp;
import com.healthcare.dtos.CompleteAppointmentDetails;
import com.healthcare.entities.Status;
/*
 * To declare a unit test case 
 *  - for testing DAO Layer
 *  - Enables only Repository , Entity layer
 *  - Does not include - RestController , Service layer beans
 *  - Adds @Transactional by default 
 *  - At the end pf test case - Tx is rolled back automatically *  
 *  - Expects another (in memory DB - H2 | HSQL) separate DB for testing
 */
@DataJpaTest
/*
 * To continue with main DB (mysql) , instead of a test DB
 */
@AutoConfigureTestDatabase(replace = Replace.NONE)
class AppointmentRepositoryTest {
	//depcy - Field Level D.I
	@Autowired
	private AppointmentRepository appointmentRepository;

	@Test //method level arg (Junit 5) to declare a test method
	void testGetAllPatientsUpcomingAppointments() {
		//call method under test
		List<AppointmentResp> list = appointmentRepository.getAllPatientsUpcomingAppointments(2l,LocalDateTime.now(),Status.SCHEDULED);
		//when the expected result matches with actual - test case passes
		assertEquals(2, list.size());
	}
	
	@Test
	void testGetAllAppointments() {
		List<CompleteAppointmentDetails> list = appointmentRepository.getAllAppointments();
		list.forEach(System.out::println);
		assertEquals(3, list.size());
	}

}
