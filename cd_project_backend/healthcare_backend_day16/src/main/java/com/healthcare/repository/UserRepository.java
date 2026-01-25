package com.healthcare.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.dtos.UserDTO;
import com.healthcare.entities.UserRole;
import com.healthcare.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	 boolean existsByEmail(String email);
	    boolean existsByPhone(String phone);
}
