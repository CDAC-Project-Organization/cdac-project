package com.healthcare.dtos;

import com.healthcare.entities.BloodGroup;
import com.healthcare.entities.Gender;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class EditPatientRequest {

    private String patientName;

    @Email(message = "Invalid email format")
    private String email;

    private Gender gender;

    private BloodGroup bloodGroup;

    private String familyHistory;

    private String profileImage;
}
