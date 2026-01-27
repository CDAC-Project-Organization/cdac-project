import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientNavbar from "./PatientNavbar";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [groupedSlots, setGroupedSlots] = useState({});
  const [loading, setLoading] = useState({
    doctors: true,
    appointments: true,
    slots: false,
  });
  const [error, setError] = useState(null);
  const [patientName, setPatientName] = useState("Patient");

  const API_BASE_URL = "http://localhost:8080";
  const getToken = () => sessionStorage.getItem("jwtToken");

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/login");
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const userRole = sessionStorage.getItem("userRole");
    if (!isAuthenticated || userRole !== "ROLE_PATIENT") navigate("/login");

    fetchDoctors();
    fetchPatientAppointments();

    const token = getToken();
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded?.sub) {
          const nameFromEmail = decoded.sub.split("@")[0];
          setPatientName(
            nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
          );
        }
      } catch (e) {}
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedDoctor) fetchAvailableSlots(selectedDoctor.doctorId);
    else {
      setGroupedSlots({});
      setSelectedDate("");
      setSelectedSlot("");
    }
  }, [selectedDoctor]);

  const fetchDoctors = async () => {
    setLoading((prev) => ({ ...prev, doctors: true }));
    try {
      const response = await api.get("/doctor/findAllDoctors");
      const mappedDoctors = response.data.map((doc) => ({
        doctorId: doc.doctorId,
        doctorName: doc.doctorName,
        specialization: doc.speciality,
        clinicAddress: doc.location,
        consultationFee: doc.fees,
        startTime: doc.startTime,
        endTime: doc.endTime,
      }));
      setDoctors(mappedDoctors);
      setSpecializations([
        ...new Set(response.data.map((doc) => doc.speciality)),
      ]);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors");
    } finally {
      setLoading((prev) => ({ ...prev, doctors: false }));
    }
  };

  const fetchPatientAppointments = async () => {
    setLoading((prev) => ({ ...prev, appointments: true }));
    try {
      const patientId = localStorage.getItem("patientId");
      if (patientId) {
        const response = await api.get(`/patient/appointments/${patientId}`);
        setAppointments(response.data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, appointments: false }));
    }
  };

  const fetchAvailableSlots = async (doctorId) => {
    setLoading((prev) => ({ ...prev, slots: true }));
    setGroupedSlots({});
    setSelectedDate("");
    setSelectedSlot("");
    try {
      const response = await api.get(
        `/patient/doctors/${doctorId}/available-slots`,
      );
      const data = response.data;
      if (data.availableSlots?.length) {
        const grouped = {};
        data.availableSlots.forEach((slot) => {
          const startTime = slot.startTime || "00:00:00";
          const [hours, minutes] = startTime.split(":");
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? "PM" : "AM";
          const hour12 = hour % 12 || 12;
          const formattedSlot = {
            display: `${hour12}:${minutes} ${ampm}`,
            date: slot.date,
            startTime,
          };
          if (!grouped[slot.date]) grouped[slot.date] = [];
          grouped[slot.date].push(formattedSlot);
        });
        setGroupedSlots(grouped);
      }
    } catch (err) {
      console.error("Error:", err);
      setGroupedSlots({});
    } finally {
      setLoading((prev) => ({ ...prev, slots: false }));
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      alert("Select doctor, date & time slot");
      return;
    }
    try {
      const patientId = localStorage.getItem("patientId");
      if (!patientId) {
        alert("Login first");
        navigate("/login");
        return;
      }
      const appointmentData = {
        patientId: parseInt(patientId),
        doctorId: selectedDoctor.doctorId,
        appointmentDate: selectedDate,
        appointmentTime: selectedSlot,
        status: "BOOKED",
      };
      const response = await api.post(
        "/patient/bookAppointment",
        appointmentData,
      );
      if (response.status === 200 || response.status === 201) {
        alert(
          `Appointment booked with ${selectedDoctor.doctorName} on ${formatDate(selectedDate)} at ${selectedSlot}`,
        );
        fetchPatientAppointments();
        setSelectedDoctor(null);
        setSelectedDate("");
        setSelectedSlot("");
        setGroupedSlots({});
      }
    } catch (err) {
      console.error("Error:", err);
      alert(`Failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      (!selectedSpecialization ||
        doc.specialization === selectedSpecialization) &&
      (!searchLocation.trim() ||
        doc.clinicAddress
          ?.toLowerCase()
          .includes(searchLocation.toLowerCase())),
  );

  return (
    <div
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <PatientNavbar /> <div style={{ paddingTop: "80px" }}></div>
      <div className="container py-4">
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show mb-4"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        <div
          className="shadow-sm border-0 mb-4 p-4 rounded-3"
          style={{ backgroundColor: "white" }}
        >
          <h3 className="fw-bold mb-2" style={{ color: "#2c3e50" }}>
            Welcome, {patientName}!
          </h3>
          <p className="text-muted">Book appointments with doctors today</p>
        </div>

        {selectedDoctor && selectedDate && selectedSlot && (
          <div
            className="alert alert-info mb-4 d-flex justify-content-between align-items-center"
            role="alert"
          >
            <div>
              <strong>Selected:</strong> {selectedDoctor.doctorName} on{" "}
              {formatDate(selectedDate)} at {selectedSlot}
            </div>
            <button
              className="btn btn-sm btn-success"
              onClick={handleBookAppointment}
              disabled={loading.slots}
            >
              {loading.slots ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        )}

        <div
          className="shadow-sm border-0 mb-4 p-4 rounded-3"
          style={{ backgroundColor: "white" }}
        >
          <h5 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
            Find Doctor by Specialization & Location
          </h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label
                className="form-label fw-medium"
                style={{ color: "#2c3e50" }}
              >
                Specialization
              </label>
              <select
                className="form-control"
                value={selectedSpecialization}
                onChange={(e) => {
                  setSelectedSpecialization(e.target.value);
                  setSelectedDoctor(null);
                  setSelectedDate("");
                  setSelectedSlot("");
                  setGroupedSlots({});
                }}
                disabled={loading.doctors}
              >
                <option value="">Select Specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label
                className="form-label fw-medium"
                style={{ color: "#2c3e50" }}
              >
                Location (Optional)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter city or area"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                disabled={loading.doctors}
              />
            </div>
          </div>

          {selectedSpecialization && (
            <div className="mt-4">
              <div className="mb-3">
                <h6 className="fw-bold" style={{ color: "#2c3e50" }}>
                  Current Date:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h6>
              </div>
              {loading.doctors ? (
                <div className="text-center py-4">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                  <p className="mt-2 text-muted">Loading doctors...</p>
                </div>
              ) : filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.doctorId}
                    className="border p-3 rounded-3 mb-3"
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6
                          className="fw-bold mb-2"
                          style={{ color: "#2c3e50" }}
                        >
                          {doctor.doctorName}
                        </h6>
                        <p className="mb-1 text-muted">
                          {doctor.specialization}
                        </p>
                        <p className="mb-2">
                          <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                          <small>{doctor.clinicAddress}</small>
                        </p>
                        <p className="mb-1">
                          <i className="bi bi-clock-fill text-secondary me-1"></i>
                          <small>
                            Hours: {formatTime(doctor.startTime)} -{" "}
                            {formatTime(doctor.endTime)}
                          </small>
                        </p>
                        <p className="mb-1">
                          <i className="bi bi-currency-rupee text-success me-1"></i>
                          <small>Fee: ₹{doctor.consultationFee}</small>
                        </p>
                      </div>
                      <button
                        className={`btn ${selectedDoctor?.doctorId === doctor.doctorId ? "btn-success" : "btn-outline-primary"} rounded-pill`}
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setSelectedDate("");
                          setSelectedSlot("");
                        }}
                        disabled={loading.slots}
                      >
                        {selectedDoctor?.doctorId === doctor.doctorId
                          ? "Selected"
                          : "Select"}
                      </button>
                    </div>

                    {selectedDoctor?.doctorId === doctor.doctorId && (
                      <div className="mt-3">
                        <p className="mb-2 fw-medium">Available Time Slots:</p>
                        {loading.slots ? (
                          <div className="text-center py-2">
                            <div
                              className="spinner-border spinner-border-sm text-primary"
                              role="status"
                            ></div>
                            <small className="ms-2">Fetching slots...</small>
                          </div>
                        ) : Object.keys(groupedSlots).length > 0 ? (
                          <div>
                            {Object.keys(groupedSlots).map((date) => (
                              <div key={date} className="mb-4">
                                <div className="d-flex align-items-center mb-2">
                                  <div className="bg-light px-3 py-1 rounded-pill me-3">
                                    <strong>{formatDate(date)}</strong>
                                  </div>
                                  <small className="text-muted">{date}</small>
                                </div>
                                <div className="d-flex flex-wrap gap-2">
                                  {groupedSlots[date].map((slot, index) => (
                                    <button
                                      key={index}
                                      className={`btn btn-sm ${selectedDate === date && selectedSlot === slot.display ? "btn-success" : "btn-outline-success"}`}
                                      onClick={() => {
                                        setSelectedDate(date);
                                        setSelectedSlot(slot.display);
                                      }}
                                    >
                                      {slot.display}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <small className="text-muted d-block mt-2">
                              <i className="bi bi-info-circle me-1"></i>Slots
                              grouped by date
                            </small>
                          </div>
                        ) : (
                          <div className="text-center py-3">
                            <p className="text-muted mb-2">
                              No available slots.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No doctors found.</p>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      setSearchLocation("");
                      setSelectedSpecialization("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="shadow-sm border-0 mb-4 p-4 rounded-3"
          style={{ backgroundColor: "white" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0" style={{ color: "#2c3e50" }}>
              Your Appointments
            </h5>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={fetchPatientAppointments}
              disabled={loading.appointments}
            >
              {loading.appointments ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          {loading.appointments ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Loading appointments...</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={appointment.appointmentId || index}>
                      <td>{appointment.appointmentId || index + 1}</td>
                      <td>
                        {appointment.doctorName ||
                          appointment.doctor?.doctorName ||
                          "N/A"}
                      </td>
                      <td>
                        {appointment.specialization ||
                          appointment.doctor?.specialization ||
                          "N/A"}
                      </td>
                      <td>
                        {appointment.appointmentDate
                          ? formatDate(appointment.appointmentDate)
                          : "N/A"}
                      </td>
                      <td>
                        {formatTime(appointment.appointmentTime) || "N/A"}
                      </td>
                      <td>
                        <span
                          className={`badge ${appointment.status === "CONFIRMED" || appointment.status === "BOOKED" ? "bg-success" : appointment.status === "COMPLETED" ? "bg-info" : appointment.status === "CANCELLED" ? "bg-danger" : "bg-secondary"}`}
                        >
                          {appointment.status || "PENDING"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">No appointments found.</p>
              <p className="text-muted">Book your first appointment above!</p>
            </div>
          )}
        </div>

        <div
          className="shadow-sm border-0 p-4 rounded-3"
          style={{ backgroundColor: "white" }}
        >
          <h5 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
            Available Specializations
          </h5>
          {loading.doctors ? (
            <div className="text-center py-3">
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              ></div>
            </div>
          ) : specializations.length > 0 ? (
            <div className="row g-3">
              {specializations.map((spec) => (
                <div key={spec} className="col-md-4">
                  <div
                    className="p-3 rounded-3 border cursor-pointer"
                    style={{ borderColor: "#48b575", cursor: "pointer" }}
                    onClick={() => setSelectedSpecialization(spec)}
                  >
                    <h6 className="fw-bold mb-1" style={{ color: "#2c3e50" }}>
                      {spec}
                    </h6>
                    <small className="text-muted">
                      {
                        doctors.filter((doc) => doc.specialization === spec)
                          .length
                      }{" "}
                      doctors
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No specializations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
