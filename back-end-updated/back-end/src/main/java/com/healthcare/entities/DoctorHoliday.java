package com.healthcare.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(
    name = "doctor_holiday",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"doctor_id", "holiday_date"})
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorHoliday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long holidayId;

    @Column(name = "holiday_date", nullable = false)
    private LocalDate holidayDate;

    private String reason;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @CreationTimestamp
    private LocalDate createdOn;
}
