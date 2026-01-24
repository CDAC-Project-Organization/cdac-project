package com.healthcare.service;

import java.util.List;

import com.healthcare.dtos.ApiResponse;
import com.healthcare.dtos.AuthRequest;
import com.healthcare.dtos.AuthResp;
import com.healthcare.dtos.UserDTO;
import com.healthcare.entities.User;

public interface UserService {
//get all users
	List<UserDTO> getAllUsers();

	String addUser(User user);

	ApiResponse deleteUserDetails(Long userId);

	User getUserDetails(Long userId);

	ApiResponse updateDetails(Long id, User user);

	AuthResp authenticate(AuthRequest request);
	ApiResponse encryptPasswords();
}
