/* =========================================
   1. Create Database
   ========================================= */
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

/* =========================================
   2. USERS Table
   ========================================= */
CREATE TABLE users (
    user_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    user_role   ENUM('ROLE_PATIENT', 'ROLE_DOCTOR', 'ROLE_ADMIN') NOT NULL
);

/* =========================================
   3. DOCTOR Table
   One-to-One with USERS
   Static working hours
   ========================================= */
CREATE TABLE doctor (
    doctor_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    qualification  VARCHAR(100),
    speciality     VARCHAR(100),
    fees           DECIMAL(10,2),

    start_time     TIME NOT NULL,   -- static start time
    end_time       TIME NOT NULL,   -- static end time

    profile_image  VARCHAR(255),

    user_id        BIGINT NOT NULL UNIQUE,

    CONSTRAINT fk_doctor_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

/* =========================================
   4. PATIENT Table
   One-to-One with USERS
   ========================================= */
CREATE TABLE patient (
    patient_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    blood_group    VARCHAR(5),
    gender         VARCHAR(10),
    family_history TEXT,

    profile_image  VARCHAR(255),

    user_id        BIGINT NOT NULL UNIQUE,

    CONSTRAINT fk_patient_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

/* =========================================
   5. APPOINTMENT Table
   Each appointment = 20 minutes (logic side)
   ========================================= */
CREATE TABLE appointment (
    appointment_id   BIGINT AUTO_INCREMENT PRIMARY KEY,

    appointment_date DATE NOT NULL,
    start_time       TIME NOT NULL,
    end_time         TIME NOT NULL,

    doctor_id        BIGINT NOT NULL,
    patient_id       BIGINT NOT NULL,

    status ENUM('BOOKED', 'CANCELLED', 'COMPLETED') DEFAULT 'BOOKED',

    CONSTRAINT fk_appt_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctor(doctor_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_appt_patient
        FOREIGN KEY (patient_id)
        REFERENCES patient(patient_id)
        ON DELETE CASCADE,

    -- Prevent double booking
    UNIQUE (doctor_id, appointment_date, start_time)
);

/* =========================================
   6. DOCTOR HOLIDAY Table
   Doctors unavailable on selected dates
   ========================================= */
CREATE TABLE doctor_holiday (
    holiday_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    holiday_date DATE NOT NULL,
    reason       VARCHAR(255),

    doctor_id    BIGINT NOT NULL,

    CONSTRAINT fk_holiday_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctor(doctor_id)
        ON DELETE CASCADE,

    UNIQUE (doctor_id, holiday_date)
);

/* =========================================
   7. Indexes for Performance
   ========================================= */
CREATE INDEX idx_appt_doctor ON appointment(doctor_id);
CREATE INDEX idx_appt_patient ON appointment(patient_id);
CREATE INDEX idx_appt_date ON appointment(appointment_date);

CREATE INDEX idx_holiday_date ON doctor_holiday(holiday_date);


CREATE TABLE feedback (
    feedback_id     INT AUTO_INCREMENT PRIMARY KEY,
    rating          INT NOT NULL,
    comments        TEXT,
    appointment_id  INT NOT NULL,

    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- ✅ added column

    CONSTRAINT fk_feedback_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointment(appointment_id)
        ON DELETE CASCADE
);