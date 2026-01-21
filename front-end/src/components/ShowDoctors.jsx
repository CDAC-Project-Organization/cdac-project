
import React, { useState } from "react";
import { useNavigate } from "react-router";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Aditi Sharma",
    specialization: "Cardiologist",
    clinic_name: "HeartCare Clinic",
    clinic_location: "Andheri East, Mumbai",
    consultation_fee: 800.0,
    available_days: "Mon, Wed, Fri",
    available_time: "10:00 AM - 1:00 PM",
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialization: "Dermatologist",
    clinic_name: "SkinGlow Center",
    clinic_location: "Kothrud, Pune",
    consultation_fee: 600.0,
    available_days: "Tue, Thu, Sat",
    available_time: "4:00 PM - 8:00 PM",
  },
  {
    id: 3,
    name: "Dr. Priya Nair",
    specialization: "Pediatrician",
    clinic_name: "Happy Kids Clinic",
    clinic_location: "HSR Layout, Bengaluru",
    consultation_fee: 700.0,
    available_days: "Mon - Sat",
    available_time: "9:30 AM - 12:30 PM",
  },
];

const ShowDoctors = () => {
  const [doctors] = useState(initialDoctors);

  const navigate = useNavigate();
  const handleBookAppointment = (doctorId) => {
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">
            E-MED
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#emedNavbarDoctors"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="emedNavbarDoctors">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Signup
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <h2 className="mb-4">Doctors List</h2>
        <div className="row g-4">
          {doctors.map((doc) => (
            <div key={doc.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-1">{doc.name}</h5>
                  <p className="text-muted mb-2">{doc.specialization}</p>

                  <p className="mb-1">
                    <strong>Clinic:</strong> {doc.clinic_name}
                  </p>
                  <p className="mb-1">
                    <strong>Location:</strong> {doc.clinic_location}
                  </p>
                  <p className="mb-1">
                    <strong>Fee:</strong> ₹{doc.consultation_fee.toFixed(2)}
                  </p>
                  <p className="mb-1">
                    <strong>Days:</strong> {doc.available_days}
                  </p>
                  <p className="mb-3">
                    <strong>Time:</strong> {doc.available_time}
                  </p>
                </div>
                <div className="card-footer bg-white border-0 pt-0">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleBookAppointment(doc.id)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowDoctors;
