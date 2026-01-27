package com.healthcare.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dtos.AdminProfileDTO;
import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.CreateAdminRequest;
import com.healthcare.entities.Admin;
import com.healthcare.entities.User;
import com.healthcare.entities.UserRole;
import com.healthcare.security.UserPrincipal;
import com.healthcare.repository.AdminRepository;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	 private final UserRepository userRepository;
	    private final AdminRepository adminRepository;
	    private final PasswordEncoder passwordEncoder;

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
	    
	    
	    @Override
	    public void createAdmin(CreateAdminRequest request) {

	        // 1️⃣ Create User
	        User user = new User();
	        user.setName(request.getName());
	        user.setEmail(request.getEmail());
	        user.setPassword(
	                passwordEncoder.encode(request.getPassword()) // 🔐 bcrypt
	        );
	        user.setPhone(request.getName());
	        user.setRole(UserRole.ROLE_ADMIN);

	        userRepository.save(user);

	        // 2️⃣ Create Admin
	        Admin admin = new Admin();
	        admin.setUser(user);

	        adminRepository.save(admin);
	    }
	    
	    
	    
   
}
