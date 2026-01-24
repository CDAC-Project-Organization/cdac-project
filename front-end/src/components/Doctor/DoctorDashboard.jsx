// src/components/DoctorDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import DoctorNavbar from "./DoctorNavbar";

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

  // Doctor information
  const doctorInfo = {
    name: "Dr. Doctor 123",
    specialization: "Cardiology",
    slotsPerDay: 5,
    availableSlots: [],
  };

  const handleProfile = () => {
    navigate("/doctor/doctorEdit");
    console.log("Go to doctor profile");
  };

  const handleLogout = () => {
    navigate("/login");
    console.log("Doctor logged out");
  };

  return (
    <div className="min-vh-100 bg-light">
      <DoctorNavbar />
<<<<<<< HEAD
      
=======
      <div style={{ paddingTop: "80px" }}></div>

>>>>>>> ketan
      {/* Content */}
      <div className="container py-4">
        <h3 className="mb-3">Today&apos;s Appointments</h3>
        <p className="text-muted">
          Here are all the appointments booked for you today.
        </p>

        {/* Doctor Info Block */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  Specialization
                </h6>
                <h4 className="card-title fw-bold" style={{ color: "#48b575" }}>
                  {doctorInfo.specialization}
                </h4>
                <p className="card-text">Dr. {doctorInfo.name.split(" ")[1]}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-1 text-muted">
                  Today's Patient Number
                </h6>
                <h4 className="card-title fw-bold" style={{ color: "#48b575" }}>
                  {doctorInfo.slotsPerDay}
                </h4>
                {/* <p className="card-text text-muted">
                  {doctorInfo.availableSlots.length} slots available today
                </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Available Slots */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Today's Appointments</h5>
            <div className="d-flex flex-wrap gap-2">
              {doctorInfo.availableSlots.map((slot, index) => (
                <span
                  key={index}
                  className="badge bg-light text-dark border px-3 py-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments Table */}
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
