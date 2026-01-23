import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Priya Patel",
      specialization: "Cardiology",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "Confirmed"
    },
    {
      id: 2,
      doctorName: "Dr. Amit Kumar",
      specialization: "Dentistry",
      date: "2024-01-18",
      time: "11:00 AM",
      status: "Completed"
    }
  ]);

  const specializations = ["Cardiology", "Dentistry", "General Physician"];
  
  const doctorsBySpecialization = {
    "Cardiology": [
      {
        id: 1,
        name: "Dr. Priya Patel",
        specialty: "Cardiologist",
        todaySlots: ["10:00 AM", "2:00 PM", "4:30 PM"]
      }
    ],
    "Dentistry": [
      {
        id: 2,
        name: "Dr. Amit Kumar",
        specialty: "Dentist",
        todaySlots: ["9:00 AM", "11:00 AM", "3:00 PM"]
      }
    ],
    "General Physician": [
      {
        id: 3,
        name: "Dr. Neha Singh",
        specialty: "General Physician",
        todaySlots: ["10:30 AM", "1:00 PM", "5:00 PM"]
      }
    ]
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedDateForDB = new Date().toISOString().split('T')[0];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleSlotSelect = (doctor, slot) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(slot);
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedSlot) {
      alert("Please select a doctor and time slot");
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      doctorName: selectedDoctor.name,
      specialization: selectedSpecialization,
      date: formattedDateForDB,
      time: selectedSlot,
      status: "Confirmed"
    };

    // Store in appointments table (state)
    setAppointments([...appointments, newAppointment]);
    
    // In a real app, you would send this to backend API
    // Example: await axios.post('/api/appointments', newAppointment);
    
    console.log("Appointment booked:", newAppointment);
    alert(`Appointment booked with ${selectedDoctor.name} at ${selectedSlot}`);
    
    // Reset selections
    setSelectedDoctor(null);
    setSelectedSlot("");
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#48b575" }}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/patient" style={{ color: "#ffffff" }}>
            E-MED Patient
          </a>

          <div className="collapse navbar-collapse" id="patientNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/patient" style={{ color: "#e8f5e9" }}>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/patient/EditPatient" style={{ color: "#e8f5e9" }}>
                  Edit Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/patient/FeedbackPage" style={{ color: "#e8f5e9" }}>
                  Feedback
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

      <div className="container py-4">
        {/* Welcome Card */}
        <div className="shadow-sm border-0 mb-4 p-4 rounded-3" style={{ backgroundColor: "white" }}>
          <h3 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Welcome, Patient!</h3>
          <p className="text-muted">Book appointments with doctors today</p>
        </div>

        {/* Appointment Status */}
        {selectedDoctor && selectedSlot && (
          <div className="alert alert-info mb-4" role="alert">
            <strong>Selected:</strong> {selectedDoctor.name} at {selectedSlot} on {currentDate}
            <button 
              className="btn btn-sm btn-success ms-3"
              onClick={handleBookAppointment}
            >
              Confirm Booking
            </button>
          </div>
        )}

        {/* Specialization Selection */}
        <div className="shadow-sm border-0 mb-4 p-4 rounded-3" style={{ backgroundColor: "white" }}>
          <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Find Doctor by Specialization</h5>
          
          <div className="mb-4">
            <select 
              className="form-control"
              value={selectedSpecialization}
              onChange={(e) => {
                setSelectedSpecialization(e.target.value);
                setSelectedDoctor(null);
                setSelectedSlot("");
              }}
              style={{
                padding: '10px',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                maxWidth: '300px'
              }}
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Doctor Display */}
          {selectedSpecialization && (
            <div className="mt-4">
              <div className="mb-3">
                <h6 className="fw-bold" style={{ color: '#2c3e50' }}>Today's Date: {currentDate}</h6>
              </div>
              
              {doctorsBySpecialization[selectedSpecialization]?.map((doctor) => (
                <div key={doctor.id} className="border p-3 rounded-3 mb-3">
                  <h6 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>{doctor.name}</h6>
                  <p className="text-muted mb-2">{doctor.specialty}</p>
                  
                  <div className="mb-3">
                    <small className="fw-medium" style={{ color: '#2c3e50' }}>Available Time Slots:</small>
                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      {doctor.todaySlots.map((slot, index) => (
                        <button
                          key={index}
                          className={`btn btn-sm ${selectedDoctor?.id === doctor.id && selectedSlot === slot ? 'btn-success' : ''}`}
                          style={{
                            backgroundColor: selectedDoctor?.id === doctor.id && selectedSlot === slot ? '#28a745' : '#48b575',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '5px 12px'
                          }}
                          onClick={() => handleSlotSelect(doctor, slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="shadow-sm border-0 mb-4 p-4 rounded-3" style={{ backgroundColor: "white" }}>
          <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Your Appointments</h5>
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
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.specialization}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <span className={`badge ${appointment.status === 'Confirmed' ? 'bg-success' : 'bg-secondary'}`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Specialization Cards */}
        <div className="shadow-sm border-0 p-4 rounded-3" style={{ backgroundColor: "white" }}>
          <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Available Specializations</h5>
          <div className="row g-3">
            {specializations.map((spec) => (
              <div key={spec} className="col-md-4">
                <div 
                  className="p-3 rounded-3 border cursor-pointer"
                  style={{ 
                    borderColor: '#48b575',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedSpecialization(spec)}
                >
                  <h6 className="fw-bold mb-1" style={{ color: '#2c3e50' }}>{spec}</h6>
                  <small className="text-muted">
                    {spec === "Cardiology" && "Heart specialists"}
                    {spec === "Dentistry" && "Dental care"}
                    {spec === "General Physician" && "General health"}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;