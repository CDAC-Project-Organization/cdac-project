package com.healthcare.service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dtos.AdminProfileDTO;
import com.healthcare.dtos.ApiResponse;
import com.healthcare.entities.Admin;
import com.healthcare.entities.User;
import com.healthcare.security.UserPrincipal;
import com.healthcare.repository.AdminRepository;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	 private final AdminRepository adminRepository;

	    public AdminProfileDTO getAdminByUserId(Long userId) {

	        Admin admin = adminRepository.findByUser_Id(userId)
	                .orElseThrow(() -> new ResourceNotFoundException("Admin not found for userId: " + userId));

	        return new AdminProfileDTO(
	                admin.getAdminId(),
	                admin.getUser().getName(),
	                admin.getUser().getEmail(),
	                admin.getUser().getId()
	        );
	    }
   
}
