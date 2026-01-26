package com.healthcare.repository;

import com.healthcare.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

	Optional<Feedback> findByAppointment_Id(Long appointmentId);

}
