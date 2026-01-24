import { useNavigate } from "react-router";
import React from 'react';


function AdminNavbar(){
     const navigate = useNavigate();
     const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

    return(
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#48b575" }}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/admin" style={{ color: "#ffffff" }}>
            E-MED Admin
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/admin" style={{ color: "#e8f5e9" }}>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/admin/doctorList" style={{ color: "#e8f5e9" }}>
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/admin/patientList" style={{ color: "#e8f5e9" }}>
                  Patients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/admin/addDoctor" style={{ color: "#e8f5e9" }}>
                  Add Doctor
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/admin/appointments" style={{ color: "#e8f5e9" }}>
                  All Appointment
                </a>
              </li>
            </ul>
            <button
              className="btn btn-light rounded-pill px-4 ms-lg-2 fw-medium"
              onClick={handleLogout}
              style={{ color: "#48b575" }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )

}
export default AdminNavbar;