import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientNavbar from './PatientNavbar';

const PatientDashboard = () => {
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "9876543210",
    age: 32,
    bloodType: "B+",
  });

  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Priya Patel",
      specialty: "Cardiology",
      date: "Tomorrow",
      time: "10:30 AM",
      type: "Checkup",
    },
    {
      id: 2,
      doctorName: "Dr. Amit Kumar",
      specialty: "Dentistry",
      date: "Mar 15",
      time: "2:00 PM",
      type: "Cleaning",
    },
  ];

  const appointmentHistory = [
    {
      id: 1,
      date: "Feb 10, 2025",
      doctor: "Dr. Priya Patel",
      specialty: "Cardiology",
      status: "Completed",
    },
    {
      id: 2,
      date: "Jan 25, 2025",
      doctor: "Dr. Amit Kumar",
      specialty: "Dentistry",
      status: "Completed",
    },
    {
      id: 3,
      date: "Jan 15, 2025",
      doctor: "Dr. Neha Singh",
      specialty: "General",
      status: "Completed",
    },
  ];

  const doctorsList = [
    {
      id: 1,
      name: "Dr. Priya Patel",
      specialty: "Cardiologist",
      availability: "Mon, Wed, Fri",
    },
    {
      id: 2,
      name: "Dr. Amit Kumar",
      specialty: "Dentist",
      availability: "Tue, Thu",
    },
    {
      id: 3,
      name: "Dr. Neha Singh",
      specialty: "General Physician",
      availability: "Mon-Fri",
    },
    {
      id: 4,
      name: "Dr. Rajesh Gupta",
      specialty: "Dermatologist",
      availability: "Wed, Thu",
    },
  ];

  const handleFeedbackClick = () => {
    navigate("/patient/FeedbackPage");
  };

  const handleEditProfileClick = () => {
    navigate("/patient/EditPatientProfile");
  };

  const handleViewHistoryClick = () => {
    document
      .getElementById("appointment-history")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-vh-100 bg-light">
      <PatientNavbar />
      <div style={{ paddingTop: "80px" }}></div>
      
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5>Welcome, {patientData.name}!</h5>
                <p className="text-muted small mb-3">Manage your healthcare</p>

                <div className="mb-3">
                  <p className="mb-1 small">
                    <strong>Age:</strong> {patientData.age}
                  </p>
                  <p className="mb-1 small">
                    <strong>Blood:</strong> {patientData.bloodType}
                  </p>
                  <p className="mb-0 small">
                    <strong>Phone:</strong> {patientData.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h6>Upcoming</h6>
              </div>
              <div className="card-body p-3">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="border-bottom pb-2 mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold small">{apt.doctorName}</span>
                      <span className="badge bg-info small">{apt.date}</span>
                    </div>
                    <small className="text-muted">
                      {apt.time} - {apt.type}
                    </small>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-body p-3">
                <div className="row text-center">
                  <div className="col-6">
                    <div className="p-2">
                      <h5 className="text-primary mb-1">
                        {upcomingAppointments.length}
                      </h5>
                      <small>Upcoming</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2">
                      <h5 className="text-primary mb-1">
                        {appointmentHistory.length}
                      </h5>
                      <small>Completed</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div id="doctor-list" className="card mb-4">
              <div className="card-header">
                <h6>Available Doctors</h6>
              </div>
              <div className="card-body p-3">
                <div className="row g-3">
                  {doctorsList.map((doctor) => (
                    <div key={doctor.id} className="col-md-6">
                      <div className="border p-3 rounded">
                        <h6 className="mb-1">{doctor.name}</h6>
                        <p className="text-muted mb-2 small">
                          {doctor.specialty}
                        </p>
                        <small>
                          <strong>Available:</strong> {doctor.availability}
                        </small>
                        <div className="mt-2">
                          <button className="btn btn-primary btn-sm w-100">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="appointment-history" className="card">
              <div className="card-header">
                <h6>Appointment History</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Specialty</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentHistory.map((apt) => (
                        <tr key={apt.id}>
                          <td>{apt.date}</td>
                          <td>{apt.doctor}</td>
                          <td>{apt.specialty}</td>
                          <td>
                            <span className="badge bg-success">Completed</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
