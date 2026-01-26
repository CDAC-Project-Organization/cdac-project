package com.healthcare.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FeedbackResponseDTO {

    private Long feedbackId;
    private Integer rating;
    private String comments;
    private Long appointmentId;
    private LocalDateTime createdAt;
}