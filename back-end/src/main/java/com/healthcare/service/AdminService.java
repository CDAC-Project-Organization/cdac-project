package com.healthcare.service;

import com.healthcare.dtos.AdminProfileDTO;
import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.CreateAdminRequest;

public interface AdminService {
	
	AdminProfileDTO getAdminByUserId(Long userId);
	 void createAdmin(CreateAdminRequest request);
}
