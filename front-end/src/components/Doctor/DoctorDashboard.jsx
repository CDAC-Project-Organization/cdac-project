// src/components/DoctorDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import DoctorNavbar from './DoctorNavbar';

const initialAppointments = [
  {
    id: 1,
    patientName: "Rohan Patil",
    time: "10:00 AM",
    date: "2024-01-23",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Sneha Gupta",
    time: "10:45 AM",
    date: "2024-01-23",
    status: "Pending",
  },
  {
    id: 3,
    patientName: "Aman Verma",
    time: "11:30 AM",
    date: "2024-01-24",
    status: "Confirmed",
  },
  {
    id: 4,
    patientName: "Priya Sharma",
    time: "2:00 PM",
    date: "2024-01-24",
    status: "Confirmed",
  },
  {
    id: 5,
    patientName: "Amit Kumar",
    time: "3:30 PM",
    date: "2024-01-25",
    status: "Pending",
  },
];

const DoctorDashboard = () => {
  const [appointments] = useState(initialAppointments);
  const navigate = useNavigate();
  const handleProfile = () => {
    // later: navigate to /doctor/profile
    navigate("/doctor/doctorEdit");
    console.log("Go to doctor profile");
  };

  const handleLogout = () => {
    // later: clear token/localStorage and redirect to login
    navigate("/login");
    console.log("Doctor logged out");
  };

  return (
    <div className="min-vh-100 bg-light">
      <DoctorNavbar />
      <div style={{ paddingTop: "80px" }}></div>
      
      {/* Content */}
      <div className="container py-4">
        <h3 className="mb-3">Today&apos;s Appointments</h3>
        <p className="text-muted">
          Here are all the appointments booked for you today.
        </p>

        <div className="table-responsive shadow-sm bg-white rounded">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Time</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt.id}>
                  <td>{index + 1}</td>
                  <td>{appt.patientName}</td>
                  <td>{appt.time}</td>
                  <td>{appt.date}</td>
                  <td>
                    <span
                      className={
                        "badge " +
                        (appt.status === "Confirmed"
                          ? "bg-success"
                          : "bg-warning text-dark")
                      }
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No appointments booked for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
