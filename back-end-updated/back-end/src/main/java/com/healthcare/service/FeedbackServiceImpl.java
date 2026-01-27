package com.healthcare.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.DuplicateResourceException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dtos.FeedbackRequestDTO;
import com.healthcare.dtos.FeedbackResponseDTO;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.Feedback;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.FeedbackRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

	private final FeedbackRepository feedbackRepository;
    private final AppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public FeedbackResponseDTO createFeedback(Long appointmentId, FeedbackRequestDTO request) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Appointment not found with id: " + appointmentId)
                );

       
        feedbackRepository.findByAppointment_Id(appointmentId)
                .ifPresent(f -> {
                    throw new DuplicateResourceException("Feedback already exists for this appointment");
                });

        
        Feedback feedback = modelMapper.map(request, Feedback.class);
        feedback.setAppointment(appointment);

        Feedback savedFeedback = feedbackRepository.save(feedback);

       
        FeedbackResponseDTO response =
                modelMapper.map(savedFeedback, FeedbackResponseDTO.class);

       
        response.setAppointmentId(appointmentId);

        return response;
    }

}
