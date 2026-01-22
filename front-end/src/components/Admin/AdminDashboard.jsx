
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Button,
  NavbarBrand,
} from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ doctors: 5, patients: 5 });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#ecf0f1", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Navbar */}
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

      <div style={{ paddingTop: "80px" }}></div>

      {/* Main Content */}
      <Container className="py-5">
        {/* Show dashboard only on home route */}
        {window.location.pathname === "/admin" ? (
          <>
            <div className="mb-4">
              <h2 className="mb-3 fw-bold" style={{ color: "#2c3e50" }}>Admin Dashboard</h2>
              <p className="text-muted mb-0">
                Welcome to E-MED admin panel. Manage doctors and patients efficiently.
              </p>
            </div>

            <Row>
              <Col md={6} className="mb-4">
                <Card className="shadow-sm h-100 border-0" style={{ borderRadius: "16px" }}>
                  <Card.Body className="text-center p-4">
                    <h1 className="fw-bold mb-2" style={{ color: "#48b575" }}>
                      {stats.doctors}
                    </h1>
                    <p className="text-muted mb-3 fs-5">Total Doctors</p>
                    <a
                      href="/admin/doctorList"
                      className="btn rounded-pill px-4"
                      style={{ 
                        backgroundColor: "#48b575", 
                        color: "white", 
                        border: "none",
                        fontWeight: "600"
                      }}
                    >
                      View Doctors
                    </a>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className="shadow-sm h-100 border-0" style={{ borderRadius: "16px" }}>
                  <Card.Body className="text-center p-4">
                    <h1 className="fw-bold mb-2" style={{ color: "#48b575" }}>
                      {stats.patients}
                    </h1>
                    <p className="text-muted mb-3 fs-5">Total Patients</p>
                    <a
                      href="/admin/patientList"
                      className="btn rounded-pill px-4"
                      style={{ 
                        backgroundColor: "#48b575", 
                        color: "white", 
                        border: "none",
                        fontWeight: "600"
                      }}
                    >
                      View Patients
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Quick Actions */}
            <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-4">
                <h5 className="mb-4 fw-bold" style={{ color: "#2c3e50" }}>Quick Actions</h5>
                <div className="d-flex flex-wrap gap-3">
                  <a
                    href="/admin/addDoctor"
                    className="btn rounded-pill px-4 fw-medium"
                    style={{ 
                      backgroundColor: "#48b575", 
                      color: "white", 
                      border: "none",
                      padding: "10px 24px"
                    }}
                  >
                    Add New Doctor
                  </a>
                  <a
                    href="/admin/doctorList"
                    className="btn rounded-pill px-4 fw-medium"
                    style={{ 
                      border: "2px solid #48b575",
                      color: "#48b575", 
                      backgroundColor: "transparent",
                      padding: "10px 24px"
                    }}
                  >
                    Manage Doctors
                  </a>
                  <a
                    href="/admin/patientList"
                    className="btn rounded-pill px-4 fw-medium"
                    style={{ 
                      border: "2px solid #48b575",
                      color: "#48b575", 
                      backgroundColor: "transparent",
                      padding: "10px 24px"
                    }}
                  >
                    Manage Patients
                  </a>
                  <a
                    href="/admin/appointments"
                    className="btn rounded-pill px-4 fw-medium"
                    style={{ 
                      border: "2px solid #48b575",
                      color: "#48b575", 
                      backgroundColor: "transparent",
                      padding: "10px 24px"
                    }}
                  >
                    All Appointments
                  </a>
                </div>
              </Card.Body>
            </Card>

            {/* System Overview */}
            <Card className="shadow-sm border-0" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-4">
                <h5 className="mb-4 fw-bold" style={{ color: "#2c3e50" }}>System Overview</h5>
                <Row className="text-center">
                  <Col md={4} className="mb-3">
                    <div className="p-4 rounded" style={{ 
                      backgroundColor: "#ffffff",
                      border: "1px solid #e9ecef"
                    }}>
                      <h6 className="text-muted mb-2">Active Doctors</h6>
                      <h3 className="fw-bold mb-0" style={{ color: "#48b575" }}>5</h3>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="p-4 rounded" style={{ 
                      backgroundColor: "#ffffff",
                      border: "1px solid #e9ecef"
                    }}>
                      <h6 className="text-muted mb-2">Active Patients</h6>
                      <h3 className="fw-bold mb-0" style={{ color: "#48b575" }}>5</h3>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="p-4 rounded" style={{ 
                      backgroundColor: "#ffffff",
                      border: "1px solid #e9ecef"
                    }}>
                      <h6 className="text-muted mb-2">Today's Appointments</h6>
                      <h3 className="fw-bold mb-0" style={{ color: "#48b575" }}>12</h3>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        ) : (
          <Outlet />
        )}
      </Container>

      {/* Footer */}
      <footer className="py-4 mt-5" style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}>
        <div className="container text-center">
          <small style={{ color: "#95a5a6" }}>
            © 2026 E-MED Admin Panel. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;