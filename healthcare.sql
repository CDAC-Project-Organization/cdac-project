/* 1. Create Database */
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

/* =========================================
   2. USER Table
   ========================================= */
CREATE TABLE USER (
    user_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL
);

/* =========================================
   3. DOCTOR Table
   One-to-One with USER
   ========================================= */
CREATE TABLE DOCTOR (
    doctor_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    qualification VARCHAR(100),
    speciality    VARCHAR(100),
    fees          DECIMAL(10,2),

    user_id       BIGINT NOT NULL UNIQUE,

    CONSTRAINT fk_doctor_user
        FOREIGN KEY (user_id)
        REFERENCES USER(user_id)
        ON DELETE CASCADE
);

/* =========================================
   4. PATIENT Table
   One-to-One with USER
   ========================================= */
CREATE TABLE PATIENT (
    patient_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    blood_group     VARCHAR(5),
    gender          VARCHAR(10),
    family_history  TEXT,

    user_id         BIGINT NOT NULL UNIQUE,

    CONSTRAINT fk_patient_user
        FOREIGN KEY (user_id)
        REFERENCES USER(user_id)
        ON DELETE CASCADE
);

/* =========================================
   5. APPOINTMENT Table
   Many-to-One with Doctor & Patient
   ========================================= */
CREATE TABLE APPOINTMENT (
    appointment_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_ts  DATETIME NOT NULL,

    doctor_id       BIGINT NOT NULL,
    patient_id      BIGINT NOT NULL,

    CONSTRAINT fk_appt_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES DOCTOR(doctor_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_appt_patient
        FOREIGN KEY (patient_id)
        REFERENCES PATIENT(patient_id)
        ON DELETE CASCADE
);

/* =========================================
   6. create Indexes for Performance
   ========================================= */
CREATE INDEX idx_appt_doctor ON APPOINTMENT(doctor_id);
CREATE INDEX idx_appt_patient ON APPOINTMENT(patient_id);
CREATE INDEX idx_appt_datetime ON APPOINTMENT(appointment_ts);

