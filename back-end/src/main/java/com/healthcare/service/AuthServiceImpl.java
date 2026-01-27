package com.healthcare.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.healthcare.security.JwtUtils;
import com.healthcare.security.UserPrincipal;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    // =========================
    // LOGIN
    // =========================
    @Override
    public LoginResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        UserPrincipal principal =
                (UserPrincipal) authentication.getPrincipal();

        String token = jwtUtils.generateToken(principal);

        return new LoginResponse(
                "SUCCESS",
                "Login successful",
                principal.getUserRole(),
                principal.getUserId(),
                token
        );
    }

    // =========================
    // SIGNUP
    // =========================
    @Override
    public SignupResponseDTO signup(SignupRequestDTO request) {

        // 1️⃣ Duplicate email check
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        // 2️⃣ Duplicate phone check
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException("Phone already exists");
        }

        // 3️⃣ Create User
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // ⚠️ encrypt later
        user.setPhone(request.getPhone());

        // 4️⃣ Assign Role
        if (request.getRole().equalsIgnoreCase("PATIENT")) {
            user.setRole(UserRole.ROLE_PATIENT);
        } else if (request.getRole().equalsIgnoreCase("DOCTOR")) {
            user.setRole(UserRole.ROLE_DOCTOR);
        } else {
            user.setRole(UserRole.ROLE_ADMIN);
        }

        User savedUser = userRepository.save(user);

        // 5️⃣ Auto-create role-specific entity
        if (savedUser.getRole() == UserRole.ROLE_PATIENT) {
            Patient patient = new Patient();
            patient.setUser(savedUser);
            patientRepository.save(patient);
        }

        if (savedUser.getRole() == UserRole.ROLE_DOCTOR) {
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
