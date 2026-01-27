
package com.healthcare.service;

import org.modelmapper.ModelMapper;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.AppointmentRequestDTO;
import com.healthcare.dtos.EditPatientRequest;
import com.healthcare.dtos.PatientRequestDTO;
import com.healthcare.dtos.PatientResponseDTO;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.AppointmentStatus;
import com.healthcare.entities.Doctor;
import com.healthcare.entities.Patient;
import com.healthcare.entities.User;
import com.healthcare.entities.UserRole;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import com.healthcare.custom_exceptions.DuplicateResourceException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<PatientResponseDTO> findAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(patient -> {
                    PatientResponseDTO dto = modelMapper.map(patient, PatientResponseDTO.class);
                    dto.setPatientName(patient.getUser().getName());
                    dto.setEmail(patient.getUser().getEmail());
                    return dto;
                })
                .toList();
    }

    @Override
    public void deletePatientById(Long patientId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient not found with id : " + patientId));

        patientRepository.delete(patient);
    }

    @Override
    public ApiResponse addPatient(PatientRequestDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        if (userRepository.existsByPhone(dto.getPhone())) {
            throw new DuplicateResourceException("Phone already exists");
        }

<<<<<<< HEAD
        User user = modelMapper.map(dto, User.class);
        user.setRole(UserRole.ROLE_PATIENT);
        user.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );
        userRepository.save(user);
=======
        // ✅ Create User manually (do NOT use modelMapper here)
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setRole(UserRole.ROLE_PATIENT); // ✅ ALWAYS PATIENT
        user.setDob(dto.getDob());
        User savedUser = userRepository.save(user);
>>>>>>> b549b52485ec9151b99a08e9942fba3b20c1bf57

        // ✅ Create Patient
        Patient patient = modelMapper.map(dto, Patient.class);
        patient.setUser(savedUser);
        patientRepository.save(patient);

        return new ApiResponse(
                "SUCCESS",
                "Patient added successfully with id : " + patient.getPatientId()
        );
    }


    @Override
    public ApiResponse editPatientProfile(Long patientId, EditPatientRequest request) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient not found with id : " + patientId));

        User user = patient.getUser();

        // Update name
        if (request.getPatientName() != null) {
            user.setName(request.getPatientName());
        }

        // Update email (with duplicate check)
        if (request.getEmail() != null &&
                !request.getEmail().equals(user.getEmail())) {

            if (userRepository.existsByEmail(request.getEmail())) {
                throw new DuplicateResourceException("Email already exists");
            }
            user.setEmail(request.getEmail());
        }

        // Update patient fields
        if (request.getGender() != null) {
            patient.setGender(request.getGender());
        }

        if (request.getBloodGroup() != null) {
            patient.setBloodGroup(request.getBloodGroup());
        }

        if (request.getFamilyHistory() != null) {
            patient.setFamilyHistory(request.getFamilyHistory());
        }

        if (request.getProfileImage() != null) {
            patient.setProfileImage(request.getProfileImage());
        }

        patientRepository.save(patient);

        return new ApiResponse("SUCCESS", "Patient profile updated successfully");
    }
    
    
    @Override
    public ApiResponse bookAppointment(AppointmentRequestDTO dto) {

      
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id : " + dto.getPatientId()));

        if (!patient.getUser().getRole().equals(UserRole.ROLE_PATIENT)) {
            throw new RuntimeException("Only patients can book appointments");
        }

        
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id : " + dto.getDoctorId()));

        
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setStartTime(dto.getStartTime());
        appointment.setEndTime(dto.getEndTime());
        appointment.setStatus(AppointmentStatus.BOOKED);

        appointmentRepository.save(appointment);

        return new ApiResponse(
                "Success",
                "Appointment booked successfully with id : " + appointment.getId()
        );
    }
    
    
    
    @Override
    public PatientResponseDTO getPatientByUserId(Long userId) {

        Patient patient = patientRepository.findByUser_Id(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found for userId : " + userId));

        PatientResponseDTO dto = new PatientResponseDTO();

        dto.setPatientId(patient.getPatientId());
        dto.setPatientName(patient.getUser().getName());
        dto.setEmail(patient.getUser().getEmail());

        dto.setBloodGroup(patient.getBloodGroup());
        dto.setGender(patient.getGender());
        dto.setFamilyHistory(patient.getFamilyHistory());

        return dto;
    }
    

}