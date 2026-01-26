import React, { useState, useEffect } from "react";
import { Table, Button, Card, Badge, Spinner, Alert } from "react-bootstrap";
import axios from "axios"; // AXIOS IMPORT
import AdminNavbar from "./AdminNavbar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // AXIOS CONFIGURATION
  const API_BASE_URL = "http://localhost:8080";
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  // AXIOS GET REQUEST
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/Appointments/allAppointments"); // AXIOS GET
      setAppointments(response.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load appointments",
      );
    } finally {
      setLoading(false);
    }
  };

  // AXIOS DELETE REQUEST
  const handleDelete = async (appointmentId, patientName) => {
    if (!window.confirm(`Delete appointment for ${patientName}?`)) return;
    try {
      await api.delete(`/Appointments/${appointmentId}`); // AXIOS DELETE
      setAppointments(
        appointments.filter((app) => app.appointmentId !== appointmentId),
      );
      alert(`Appointment deleted!`);
    } catch (err) {
      alert(`Delete failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "BOOKED":
      case "CONFIRMED":
      case "Scheduled":
        return <Badge bg="primary">{status}</Badge>;
      case "COMPLETED":
      case "Completed":
        return <Badge bg="success">{status}</Badge>;
      case "CANCELLED":
      case "Cancelled":
        return <Badge bg="danger">{status}</Badge>;
      case "PENDING":
        return <Badge bg="warning">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status || "Pending"}</Badge>;
    }
  };

  const formatTime = (startTime, endTime) => {
    if (!startTime) return "Time not specified";
    const start = startTime.substring(0, 5); // Get HH:MM from HH:MM:SS
    if (!endTime) return start;
    const end = endTime.substring(0, 5);
    return `${start} - ${end}`;
  };

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
            <Button
              variant="outline-danger"
              size="sm"
              onClick={fetchAppointments}
              className="ms-3"
            >
              Retry
            </Button>
          </Alert>
        )}

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fw-bold mb-2">Appointments Management</h2>
              <p className="text-muted mb-0">
                View and manage all patient appointments
              </p>
            </div>
            <Button
              variant="primary"
              onClick={fetchAppointments}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" className="me-2" /> : null}Refresh
            </Button>
          </div>
        </div>

        <Card
          className="shadow-sm mb-4 border-0"
          style={{ borderRadius: "16px" }}
        >
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1">Total Appointments</h5>
                <h3 className="mb-0 text-primary">
                  {loading ? <Spinner size="sm" /> : appointments.length}
                </h3>
              </div>
              <div className="d-flex gap-3">
                <div className="text-center">
                  <div className="fw-bold text-primary">
                    {
                      appointments.filter(
                        (a) =>
                          a.status === "BOOKED" ||
                          a.status === "CONFIRMED" ||
                          a.status === "PENDING",
                      ).length
                    }
                  </div>
                  <small className="text-muted">Active</small>
                </div>
                <div className="text-center">
                  <div className="fw-bold text-success">
                    {
                      appointments.filter((a) => a.status === "COMPLETED")
                        .length
                    }
                  </div>
                  <small className="text-muted">Completed</small>
                </div>
                <div className="text-center">
                  <div className="fw-bold text-danger">
                    {
                      appointments.filter((a) => a.status === "CANCELLED")
                        .length
                    }
                  </div>
                  <small className="text-muted">Cancelled</small>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card className="shadow-sm border-0" style={{ borderRadius: "16px" }}>
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">All Appointments</h5>
            <small className="text-muted">
              {loading ? "Loading..." : `${appointments.length} appointments`}
            </small>
          </Card.Header>
          <Card.Body className="p-4">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-muted">Loading appointments...</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No appointments found</p>
                <Button variant="outline-primary" onClick={fetchAppointments}>
                  Refresh
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.appointmentId}>
                        <td>#{appointment.appointmentId}</td>
                        <td>
                          <div className="fw-semibold">
                            {appointment.patientName || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="fw-semibold">
                            {appointment.doctorName || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="fw-semibold">
                            {appointment.appointmentDate
                              ? new Date(
                                  appointment.appointmentDate,
                                ).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="text-muted">
                            {formatTime(
                              appointment.startTime,
                              appointment.endTime,
                            )}
                          </div>
                        </td>
                        <td>{getStatusBadge(appointment.status)}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() =>
                                handleDelete(
                                  appointment.appointmentId,
                                  appointment.patientName,
                                )
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
    </div>
  );
};

export default Appointments;
