// src/components/AdminDashboard.jsx
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
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm fixed-top">
        <div className="container">
          <NavbarBrand
            className="navbar-brand fw-bold text-primary"
            href="/admin"
          >
            E-MED Admin
          </NavbarBrand>

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
                <a className="nav-link" href="/admin">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/doctorList">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/patientList">
                  Patients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/addDoctor">
                  Add Doctor
                </a>
              </li>
            </ul>
            <a
              className="btn btn-outline-primary ms-lg-2"
              href="/login"
              onClick={handleLogout}
            >
              Logout
            </a>
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
              <a href="/" className="btn btn-outline-secondary mb-3">
                ← Back to Home
              </a>
              <h2 className="mb-3 fw-semibold">Admin Dashboard</h2>
              <p className="text-muted mb-0">
                Welcome to E-MED admin panel. Manage doctors and patients
                efficiently.
              </p>
            </div>

            <Row>
              <Col md={6} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <h1 className="fw-bold text-primary mb-2">
                      {stats.doctors}
                    </h1>
                    <p className="text-muted mb-3 fs-5">Total Doctors</p>
                    <a
                      href="/admin/doctorList"
                      className="btn btn-outline-primary btn-lg px-4"
                    >
                      View Doctors
                    </a>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <h1 className="fw-bold text-success mb-2">
                      {stats.patients}
                    </h1>
                    <p className="text-muted mb-3 fs-5">Total Patients</p>
                    <a
                      href="/admin/patientList"
                      className="btn btn-outline-success btn-lg px-4"
                    >
                      View Patients
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Quick Actions */}
            <Card className="shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="mb-4 fw-semibold">Quick Actions</h5>
                <div className="d-flex flex-wrap gap-3">
                  <a
                    href="/admin/addDoctor"
                    className="btn btn-primary btn-lg px-4"
                  >
                    Add New Doctor
                  </a>
                  <a
                    href="/admin/doctorList"
                    className="btn btn-outline-primary btn-lg px-4"
                  >
                    Manage Doctors
                  </a>
                  <a
                    href="/admin/patientList"
                    className="btn btn-outline-success btn-lg px-4"
                  >
                    Manage Patients
                  </a>
                </div>
              </Card.Body>
            </Card>

            {/* System Overview */}
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h5 className="mb-4 fw-semibold">System Overview</h5>
                <Row className="text-center">
                  <Col md={4} className="mb-3">
                    <div className="p-4 bg-white rounded shadow-sm h-100">
                      <h6 className="text-muted mb-2">Active Doctors</h6>
                      <h3 className="fw-bold text-primary mb-0">5</h3>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="p-4 bg-white rounded shadow-sm h-100">
                      <h6 className="text-muted mb-2">Active Patients</h6>
                      <h3 className="fw-bold text-success mb-0">5</h3>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="p-4 bg-white rounded shadow-sm h-100">
                      <h6 className="text-muted mb-2">Today's Appointments</h6>
                      <h3 className="fw-bold text-info mb-0">12</h3>
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
    </div>
  );
};

export default AdminDashboard;
