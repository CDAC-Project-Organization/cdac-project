package com.healthcare.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.healthcare.custom_exceptions.DuplicateResourceException;
import com.healthcare.dtos.LoginRequest;
import com.healthcare.dtos.LoginResponse;
import com.healthcare.dtos.SignupRequestDTO;
import com.healthcare.dtos.SignupResponseDTO;
import com.healthcare.entities.Doctor;
import com.healthcare.entities.Patient;
import com.healthcare.entities.User;
import com.healthcare.entities.UserRole;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public LoginResponse login(LoginRequest request) {

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return new LoginResponse(
                "FAILED",
                "Invalid email or password",
                null,
                null
            );
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse(
                "FAILED",
                "Invalid email or password",
                null,
                null
            );
        }

        return new LoginResponse(
            "SUCCESS",
            "Login successful",
            user.getRole().name(),
            user.getId()
        );
    }
    @Override
    public SignupResponseDTO signup(SignupRequestDTO request) {

        // 1️⃣ Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        // 2️⃣ Check duplicate phone
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException("Phone already exists");
        }

        // 3️⃣ Create User entity
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // ⚠️ later encrypt
        user.setPhone(request.getPhone());

        // 4️⃣ Set Role
        if (request.getRole().equalsIgnoreCase("PATIENT")) {
            user.setRole(UserRole.ROLE_PATIENT);
        } else if (request.getRole().equalsIgnoreCase("DOCTOR")) {
            user.setRole(UserRole.ROLE_DOCTOR);
        } else {
            user.setRole(UserRole.ROLE_ADMIN);
        }

        User savedUser = userRepository.save(user);

        // 5️⃣ Create Patient/Doctor entity automatically (IMPORTANT 🔥)
        if (user.getRole() == UserRole.ROLE_PATIENT) {
            Patient patient = new Patient();
            patient.setUser(savedUser);
            patientRepository.save(patient);
        }

        if (user.getRole() == UserRole.ROLE_DOCTOR) {
            Doctor doctor = new Doctor();
            doctor.setUser(savedUser);
            doctorRepository.save(doctor);
        }

        return new SignupResponseDTO(
                "SUCCESS",
                "User registered successfully",
                savedUser.getId()
        );
    }


}
