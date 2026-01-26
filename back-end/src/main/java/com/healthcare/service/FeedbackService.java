package com.healthcare.service;

import com.healthcare.dtos.FeedbackRequestDTO;
import com.healthcare.dtos.FeedbackResponseDTO;

public interface FeedbackService {

    FeedbackResponseDTO createFeedback(Long appointmentId, FeedbackRequestDTO request);
}
