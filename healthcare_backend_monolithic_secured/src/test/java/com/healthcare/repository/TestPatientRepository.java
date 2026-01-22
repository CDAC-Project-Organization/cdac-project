package com.healthcare.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.healthcare.dtos.PatientDTO;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
//@Rollback(false)
class TestPatientRepository {
	@Autowired
	private PatientRepository patientRepository;

	@Test
	void testGetAllPatientDetails() {
		//invoke method 
		List<PatientDTO> list = patientRepository.getAllPatientDetails();
		//assert size of the list
		assertEquals(3, list.size());
		assertEquals("Ankit", list.get(0).getFirstName());
		
		
	}

}
