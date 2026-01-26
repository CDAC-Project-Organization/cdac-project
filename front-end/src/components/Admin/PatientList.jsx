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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // AXIOS IMPORT
import AdminNavbar from "./AdminNavbar";

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);

  // AXIOS CONFIGURATION
  const API_BASE_URL = "http://localhost:8080";
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  // AXIOS GET REQUEST FOR PATIENTS
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await api.get("/patient/AllPatients"); // AXIOS GET
      setPatients(
        response.data.map((p) => ({
          id: p.patientId,
          name: p.patientName,
          email: p.email,
          gender: p.gender === "MALE" ? "Male" : "Female",
          bloodGroup: p.bloodGroup,
          familyHistory: p.familyHistory,
        })),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  // AXIOS GET REQUEST FOR APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const response = await api.get("/Appointments/allAppointments"); // AXIOS GET
      setAppointments(response.data);
    } catch (err) {
      alert("Failed to load appointments");
    }
  };

  // AXIOS DELETE REQUEST
  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete patient: ${name}?`)) {
      try {
        await api.delete(`/patient/${id}`); // AXIOS DELETE
        setPatients(patients.filter((p) => p.id !== id));
        alert("Patient deleted!");
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <AdminNavbar />

      <div style={{ paddingTop: "80px" }}></div>

      <div className="container py-4">
        {error && (
          <Alert
            variant="danger"
            className="mb-3"
            onClose={() => setError(null)}
            dismissible
          >
            {error}
          </Alert>
        )}

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fw-bold mb-2">Patient Management</h2>
              <p className="text-muted mb-0">View and manage patients</p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="info"
                onClick={() => {
                  fetchAppointments();
                  setShowAppointmentsModal(true);
                }}
              >
                View Appointments
              </Button>
              <Button
                variant="primary"
                onClick={fetchPatients}
                disabled={loading}
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

        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">
                <h5 className="text-muted mb-1">Total Patients</h5>
                <h3 className="mb-0 text-primary">
                  {loading ? <Spinner size="sm" /> : patients.length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">
                <h5 className="text-muted mb-1">Total Appointments</h5>
                <h3 className="mb-0 text-warning">{appointments.length}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} lg={6}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-1">Search</h5>
                <InputGroup>
                  <InputGroup.Text>🔍</InputGroup.Text>
                  <Form.Control
                    placeholder="Search patients by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Patients List</h5>
            <small className="text-muted">
              {filteredPatients.length} of {patients.length} patients
            </small>
          </Card.Header>
          <Card.Body className="p-4">
            {loading ? (
              <div className="text-center py-5">
                <Spinner variant="primary" />
                <p className="mt-3 text-muted">Loading...</p>
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
                <p className="text-muted">
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
                <Table hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Patient</th>
                      <th>Contact</th>
                      <th>Medical Details</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((p) => (
                      <tr key={p.id}>
                        <td>#{p.id}</td>
                        <td>
                          <div className="fw-semibold">{p.name}</div>
                          <small className="text-muted">{p.gender}</small>
                        </td>
                        <td>
                          <div className="text-muted">{p.email}</div>
                        </td>
                        <td>
                          {p.bloodGroup && (
                            <div className="mb-1">
                              <span className="badge bg-info">
                                {p.bloodGroup.replace("_", " ")}
                              </span>
                            </div>
                          )}
                          {p.familyHistory && (
                            <small className="text-muted d-block">
                              {p.familyHistory.length > 50
                                ? `${p.familyHistory.substring(0, 50)}...`
                                : p.familyHistory}
                            </small>
                          )}
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(p.id, p.name)}
                          >
                            <i className="bi bi-trash me-1"></i>Delete
                          </Button>
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

      <Modal
        show={showAppointmentsModal}
        onHide={() => setShowAppointmentsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>All Appointments</Modal.Title>
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
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a, i) => (
                    <tr key={i}>
                      <td>#{a.appointmentId || i + 1}</td>
                      <td>
                        <div>{a.patient?.patientName || "N/A"}</div>
                        <small className="text-muted">
                          {a.patient?.email || ""}
                        </small>
                      </td>
                      <td>
                        <div>{a.doctor?.doctorName || "N/A"}</div>
                        <small className="text-muted">
                          {a.doctor?.specialization || ""}
                        </small>
                      </td>
                      <td>
                        <div>
                          {a.appointmentDate
                            ? new Date(a.appointmentDate).toLocaleDateString()
                            : "N/A"}
                        </div>
                        <small className="text-muted">
                          {a.appointmentTime || ""}
                        </small>
                      </td>
                      <td>
                        <span
                          className={`badge ${a.status === "CONFIRMED" ? "bg-success" : a.status === "PENDING" ? "bg-warning" : "bg-secondary"}`}
                        >
                          {a.status || "UNKNOWN"}
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
