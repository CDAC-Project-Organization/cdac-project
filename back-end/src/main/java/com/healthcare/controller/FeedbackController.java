package com.healthcare.controller;

import com.healthcare.dtos.FeedbackRequestDTO;
import com.healthcare.dtos.FeedbackResponseDTO;
import com.healthcare.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping("/{appointmentId}")
    public ResponseEntity<FeedbackResponseDTO> createFeedback(
            @PathVariable Long appointmentId,
            @RequestBody FeedbackRequestDTO request) {

        FeedbackResponseDTO response =
                feedbackService.createFeedback(appointmentId, request);

        return ResponseEntity.ok(response);
    }
}
