package com.healthcare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthcare.entities.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

	 Optional<Admin> findByUser_Id(Long userId);
}
