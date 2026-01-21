// src/components/DoctorDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import DoctorNavbar from "./DoctorNavbar";

const initialAppointments = [
  {
    id: 1,
    patientName: "Rohan Patil",
    time: "10:00 AM",
    reason: "Follow-up for blood pressure",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Sneha Gupta",
    time: "10:45 AM",
    reason: "Skin allergy checkup",
    status: "Pending",
  },
  {
    id: 3,
    patientName: "Aman Verma",
    time: "11:30 AM",
    reason: "New consultation - fever",
    status: "Confirmed",
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
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt.id}>
                  <td>{index + 1}</td>
                  <td>{appt.patientName}</td>
                  <td>{appt.time}</td>
                  <td>{appt.reason}</td>
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
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
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
