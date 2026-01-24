import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorNavbar = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/doctor");
  };

  const handleProfileClick = () => {
    navigate("/doctor/doctorEdit");
  };

  const handleAppointmentsClick = () => {
    navigate("/doctor");
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
          E-MED Doctor
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#doctorNavbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="doctorNavbarNav">
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
                onClick={handleAppointmentsClick}
              >
                Appointments
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
                  onClick={handleProfileClick}
                >
                  Edit Profile
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

export default DoctorNavbar;
