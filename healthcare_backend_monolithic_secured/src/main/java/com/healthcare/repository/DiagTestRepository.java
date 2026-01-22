package com.healthcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.DiagTest;

public interface DiagTestRepository extends JpaRepository<DiagTest,Long> {

}
