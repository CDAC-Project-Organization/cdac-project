package com.healthcare.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.dtos.AppointmentResp;
import com.healthcare.dtos.CompleteAppointmentDetails;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.Status;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
//check for doc's availability
	boolean existsByMyDoctorIdAndAppointmentDateTimeGreaterThanEqualAndAppointmentDateTimeLessThanEqualAndStatus
	(Long docId, LocalDateTime start,LocalDateTime end,Status sts);
	//list patient's upcoming appointments - Here you will have to add mapping from entity ->dto , in service layer.
	List<Appointment> findByMyPatientIdAndStatusAndAppointmentDateTimeAfter(Long patientId,Status status,LocalDateTime dateTime);
	//JPQL ctor expression to list doctor's upcoming appointments - Here you will NOT have to add mapping from entity ->dto , in service layer, since DAO layer itself is returning DTO List
	@Query("select new com.healthcare.dtos.AppointmentResp(a.id,a.myPatient.userDetails.firstName,a.myPatient.userDetails.lastName,a.appointmentDateTime,a.status) from Appointment a where a.myDoctor.id=:did and a.appointmentDateTime > :dt and a.status=:sts order by a.appointmentDateTime desc")
	List<AppointmentResp> getAllDoctorsUpcomingAppointments(@Param("did") Long doctorId, @Param("dt")LocalDateTime now,@Param("sts") Status sts);
	@Query("select new com.healthcare.dtos.AppointmentResp(a.id,a.myDoctor.userDetails.firstName,a.myDoctor.userDetails.lastName,a.appointmentDateTime,a.status) from Appointment a where a.myPatient.id=:pid and a.appointmentDateTime > :dt and a.status=:sts order by a.appointmentDateTime desc")
	List<AppointmentResp> getAllPatientsUpcomingAppointments(@Param("pid") Long patientId, @Param("dt")LocalDateTime now,@Param("sts") Status sts);

	
	//JPQL ctor expression to get all appointments - accessible to admin role
	
		@Query("select new com.healthcare.dtos.CompleteAppointmentDetails(a.id,doc.firstName,doc.lastName,pat.firstName,pat.lastName,a.appointmentDateTime,a.status) from Appointment a join a.myDoctor.userDetails doc join a.myPatient.userDetails pat order by a.appointmentDateTime desc")
		List<CompleteAppointmentDetails> getAllAppointments();

}
