package com.healthcare.dtos;

import lombok.Data;

@Data
public class FeedbackRequestDTO {

    private Integer rating;
    private String comments;
}
