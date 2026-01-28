// src/components/admin/PatientList.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Form,
  InputGroup,
  Alert,
  Spinner,
  Modal,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success", // 'success' or 'danger'
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch patients from API - Similar to DoctorList
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "http://localhost:8080/patient/AllPatients",
      );

      // Assuming the response structure is similar to doctors
      // Check the actual response structure in console
      console.log("Patients API Response:", response.data);

      // Transform the data based on actual response structure
      const formattedPatients = Array.isArray(response.data)
        ? response.data.map((p) => ({
            id: p.patientId || p.id,
            name: p.patientName || p.name,
            email: p.email,
            gender:
              p.gender === "MALE"
                ? "Male"
                : p.gender === "FEMALE"
                  ? "Female"
                  : p.gender || "N/A",
            bloodGroup: p.bloodGroup || "N/A",
            familyHistory:
              p.familyHistory ||
              p.medicalHistory ||
              "No family history recorded",
            phone: p.phone || p.contactNumber || "N/A",
            age: p.age || "N/A",
          }))
        : [];

      setPatients(formattedPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError(error.response?.data?.message || "Failed to fetch patients");
      setToast({
        show: true,
        message: "Failed to fetch patients",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/Appointments/allAppointments",
      );
      console.log("Appointments API Response:", response.data);
      setAppointments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setToast({
        show: true,
        message: "Failed to fetch appointments",
        variant: "danger",
      });
    }
  };

  // Handle patient deletion
  const handleDelete = async (patientId, patientName) => {
    if (
      window.confirm(
        `Are you sure you want to delete patient: ${patientName}? This action cannot be undone.`,
      )
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/patient/${patientId}`,
        );

        if (response.data.status === "SUCCESS" || response.data.success) {
          // Remove patient from state
          setPatients(patients.filter((patient) => patient.id !== patientId));

          // Show success toast
          setToast({
            show: true,
            message: `Patient ${patientName} deleted successfully`,
            variant: "success",
          });
        } else {
          setToast({
            show: true,
            message: response.data.message || "Failed to delete patient",
            variant: "danger",
          });
        }
      } catch (error) {
        console.error("Error deleting patient:", error);

        if (error.response) {
          setToast({
            show: true,
            message: error.response.data.message || "Failed to delete patient",
            variant: "danger",
          });
        } else if (error.request) {
          setToast({
            show: true,
            message: "Network error. Please check your connection.",
            variant: "danger",
          });
        } else {
          setToast({
            show: true,
            message: "An error occurred. Please try again.",
            variant: "danger",
          });
        }
      }
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(search.toLowerCase()) ||
      patient.email?.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Navbar */}
      <AdminNavbar />

      {/* Toast Notification */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 9999, marginTop: "80px" }}
      >
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          delay={5000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">
              {toast.variant === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div style={{ paddingTop: "80px" }}></div>

      <div className="container py-4">
        {/* Page Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fw-bold mb-2" style={{ color: "#2c3e50" }}>
                Patient Management
              </h2>
              <p className="text-muted mb-0">
                View and manage all registered patients
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button
                onClick={() => {
                  fetchAppointments();
                  setShowAppointmentsModal(true);
                }}
                className="rounded-pill px-4 fw-medium"
                style={{
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                }}
              >
                📅 View Appointments
              </Button>
              <Button
                onClick={fetchPatients}
                disabled={loading}
                className="rounded-pill px-4 fw-medium"
                style={{
                  backgroundColor: "#48b575",
                  color: "white",
                  border: "none",
                }}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Loading...
                  </>
                ) : (
                  "⟳ Refresh"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats and Search Card */}
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card
              className="shadow-sm border-0 h-100"
              style={{ borderRadius: "16px" }}
            >
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-1" style={{ color: "#2c3e50" }}>
                  Total Patients
                </h5>
                <h3 className="mb-0" style={{ color: "#48b575" }}>
                  {loading ? <Spinner size="sm" /> : patients.length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card
              className="shadow-sm border-0 h-100"
              style={{ borderRadius: "16px" }}
            >
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-1" style={{ color: "#2c3e50" }}>
                  Total Appointments
                </h5>
                <h3 className="mb-0" style={{ color: "#3498db" }}>
                  {appointments.length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} lg={6}>
            <Card
              className="shadow-sm border-0 h-100"
              style={{ borderRadius: "16px" }}
            >
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-1" style={{ color: "#2c3e50" }}>
                  Search Patients
                </h5>
                <InputGroup>
                  <InputGroup.Text
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    🔍
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search by name, email, or phone number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSearch("")}
                    >
                      Clear
                    </Button>
                  )}
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Patients Table */}
        <Card className="shadow-sm border-0" style={{ borderRadius: "16px" }}>
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0" style={{ color: "#2c3e50" }}>
              Patients List
            </h5>
            <small className="text-muted">
              {filteredPatients.length} of {patients.length} patients shown
            </small>
          </Card.Header>
          <Card.Body className="p-4">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border"
                  style={{ color: "#48b575" }}
                ></div>
                <p className="mt-3 text-muted">Loading patients...</p>
              </div>
            ) : patients.length === 0 ? (
              <div className="text-center py-5">
                <h5 className="text-muted mb-2">No Patients Found</h5>
                <p className="text-muted">
                  There are no patients registered yet.
                </p>
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-5">
                <p className="mt-3 text-muted">
                  No patients found matching "{search}"
                </p>
                <Button
                  variant="outline-secondary"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Patient Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Age</th>
                      <th>Blood Group</th>
                      <th>Contact</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, index) => (
                      <tr key={patient.id || index}>
                        <td>
                          <div className="fw-semibold">#{patient.id}</div>
                        </td>
                        <td>
                          <div className="fw-semibold">{patient.name}</div>
                        </td>
                        <td>
                          <div className="text-muted">{patient.email}</div>
                        </td>
                        <td>
                          <span
                            className={`badge ${patient.gender === "Male" ? "bg-primary" : patient.gender === "Female" ? "bg-pink" : "bg-secondary"}`}
                          >
                            {patient.gender}
                          </span>
                        </td>
                        <td>
                          <small className="fw-bold">{patient.age}</small>
                        </td>
                        <td>
                          <span className="badge bg-danger">
                            {patient.bloodGroup}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">{patient.phone}</small>
                        </td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                console.log("View details for:", patient.id)
                              }
                              className="rounded-pill"
                              style={{
                                borderColor: "#48b575",
                                color: "#48b575",
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() =>
                                handleDelete(patient.id, patient.name)
                              }
                              className="rounded-pill"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Appointments Modal */}
      <Modal
        show={showAppointmentsModal}
        onHide={() => setShowAppointmentsModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#2c3e50" }}>
            All Appointments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {appointments.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No appointments found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={appointment.appointmentId || index}>
                      <td>#{appointment.appointmentId || index + 1}</td>
                      <td>
                        <div className="fw-semibold">
                          {appointment.patient?.patientName ||
                            appointment.patientName ||
                            "N/A"}
                        </div>
                        <small className="text-muted">
                          {appointment.patient?.email ||
                            appointment.email ||
                            ""}
                        </small>
                      </td>
                      <td>
                        <div className="fw-semibold">
                          {appointment.doctor?.doctorName ||
                            appointment.doctorName ||
                            "N/A"}
                        </div>
                        <small className="text-muted">
                          {appointment.doctor?.speciality ||
                            appointment.speciality ||
                            ""}
                        </small>
                      </td>
                      <td>
                        <div className="fw-semibold">
                          {appointment.appointmentDate
                            ? new Date(
                                appointment.appointmentDate,
                              ).toLocaleDateString()
                            : "N/A"}
                        </div>
                        <small className="text-muted">
                          {appointment.appointmentTime || ""}
                        </small>
                      </td>
                      <td>
                        <span
                          className={`badge ${appointment.status === "CONFIRMED" || appointment.status === "Confirmed" ? "bg-success" : appointment.status === "PENDING" || appointment.status === "Pending" ? "bg-warning" : "bg-secondary"}`}
                        >
                          {appointment.status || "UNKNOWN"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAppointmentsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientList;
