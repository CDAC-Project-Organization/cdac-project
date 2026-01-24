<<<<<<< HEAD
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
=======
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DoctorNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <Navbar 
            expand="lg" 
            fixed="top" 
            style={{ backgroundColor: "#48b575" }}
            className="navbar-dark"
        >
            <Container>
                <Navbar.Brand 
                    href="/doctor" 
                    className="fw-bold fs-4" 
                    style={{ color: "#ffffff" }}
                >
                    E-MED Doctor
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="doctorNavbar" />
                
                <Navbar.Collapse id="doctorNavbar">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link 
                            href="/doctor" 
                            className="fw-medium" 
                            style={{ color: "#e8f5e9" }}
                        >
                            Dashboard
                        </Nav.Link>
                        
                    </Nav>

                    <Nav>
                        <NavDropdown 
                            title="Profile" 
                            id="doctorProfileDropdown"
                            className="fw-medium"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item onClick={() => navigate("/doctor/doctorEdit")}>
                                Edit Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
>>>>>>> ketan
};

export default DoctorNavbar;
