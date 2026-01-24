import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PatientNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
       <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#48b575" }}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/patient" style={{ color: "#ffffff" }}>
            E-MED Patient
          </a>

          <div className="collapse navbar-collapse" id="patientNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/patient" style={{ color: "#e8f5e9" }}>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/patient/EditPatient" style={{ color: "#e8f5e9" }}>
                  Edit Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/patient/FeedbackPage" style={{ color: "#e8f5e9" }}>
                  Feedback
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
    );
};

export default PatientNavbar;
