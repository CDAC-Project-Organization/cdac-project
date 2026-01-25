package com.healthcare.dtos;

import java.time.LocalDate;

import com.healthcare.entities.BloodGroup;
import com.healthcare.entities.Gender;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientRequestDTO {

    // USER fields
    private String name;
    private String email;
    private String password;
    private String phone;
    private LocalDate dob;

    // PATIENT fields
    private BloodGroup bloodGroup;
    private Gender gender;
    private String familyHistory;
    private String profileImage;
}
