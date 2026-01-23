import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/admin");
  };

  const handleDoctorsClick = () => {
    navigate("/admin/doctorList");
  };

  const handlePatientsClick = () => {
    navigate("/admin/patientList");
  };

  const handleAddDoctorClick = () => {
    navigate("/admin/addDoctor");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm fixed-top">
      <div className="container">
        <a 
          className="navbar-brand fw-bold text-primary" 
          href="#" 
          onClick={handleDashboardClick}
          style={{ cursor: "pointer" }}
        >
          E-MED Admin
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#adminNavbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                onClick={handlePatientsClick}
              >
                Patients
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none" 
                onClick={handleAddDoctorClick}
              >
                Add Doctor
              </button>
            </li>
          </ul>

          <button
            className="btn btn-outline-primary ms-lg-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
