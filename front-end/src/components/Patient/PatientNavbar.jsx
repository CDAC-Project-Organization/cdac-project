import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PatientNavbar = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/patient");
  };

  const handleDoctorsClick = () => {
    navigate("/patient");
    setTimeout(() => {
      document.getElementById("doctor-list")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleFeedbackClick = () => {
    navigate("/patient/FeedbackPage");
  };

  const handleEditProfileClick = () => {
    navigate("/patient/EditPatient");
  };

  const handleViewHistoryClick = () => {
    navigate("/patient");
    setTimeout(() => {
      document.getElementById("appointment-history")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid">
        <a 
          className="navbar-brand fw-bold text-primary" 
          href="#" 
          onClick={handleDashboardClick}
          style={{ cursor: "pointer" }}
        >
          E-MED
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none" 
                onClick={handleDashboardClick}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none" 
                onClick={handleDoctorsClick}
              >
                Doctors
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none" 
                onClick={handleFeedbackClick}
              >
                Feedback
              </button>
            </li>
          </ul>

          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Profile
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleEditProfileClick}
                >
                  Edit Profile
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleViewHistoryClick}
                >
                  Appointment History
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PatientNavbar;
