package com.healthcare.service;

import com.healthcare.dtos.AdminProfileDTO;
import com.healthcare.dtos.ApiResponse;

public interface AdminService {
	
	AdminProfileDTO getAdminByUserId(Long userId);
}
