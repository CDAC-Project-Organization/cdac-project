import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
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
        clinicLocation: "Andheri East, Mumbai",
        todaySlots: ["10:00 AM", "2:00 PM", "4:30 PM"]
      },
      {
        id: 4,
        name: "Dr. Rajesh Kumar",
        specialty: "Cardiologist",
        clinicLocation: "Bandra West, Mumbai",
        todaySlots: ["9:00 AM", "11:30 AM", "3:30 PM"]
      },
      {
        id: 5,
        name: "Dr. Anjali Desai",
        specialty: "Cardiologist",
        clinicLocation: "Pune Camp, Pune",
        todaySlots: ["8:30 AM", "1:00 PM", "5:00 PM"]
      }
    ],
    "Dentistry": [
      {
        id: 2,
        name: "Dr. Amit Kumar",
        specialty: "Dentist",
        clinicLocation: "Kothrud, Pune",
        todaySlots: ["9:00 AM", "11:00 AM", "3:00 PM"]
      },
      {
        id: 6,
        name: "Dr. Sneha Reddy",
        specialty: "Dentist",
        clinicLocation: "Koramangala, Bengaluru",
        todaySlots: ["10:30 AM", "2:30 PM", "4:00 PM"]
      },
      {
        id: 7,
        name: "Dr. Vikram Mehta",
        specialty: "Dentist",
        clinicLocation: "Juhu, Mumbai",
        todaySlots: ["8:00 AM", "12:00 PM", "6:00 PM"]
      }
    ],
    "General Physician": [
      {
        id: 3,
        name: "Dr. Neha Singh",
        specialty: "General Physician",
        clinicLocation: "HSR Layout, Bengaluru",
        todaySlots: ["10:30 AM", "1:00 PM", "5:00 PM"]
      },
      {
        id: 8,
        name: "Dr. Arjun Sharma",
        specialty: "General Physician",
        clinicLocation: "Andheri West, Mumbai",
        todaySlots: ["9:30 AM", "2:30 PM", "4:30 PM"]
      },
      {
        id: 9,
        name: "Dr. Kavita Nair",
        specialty: "General Physician",
        clinicLocation: "Baner, Pune",
        todaySlots: ["11:00 AM", "3:00 PM", "6:30 PM"]
      }
    ]
  };

  // Check for pre-selected doctor from booking flow
  useEffect(() => {
    const storedDoctor = localStorage.getItem('selectedDoctorForBooking');
    if (storedDoctor) {
      const doctor = JSON.parse(storedDoctor);
      
      // Map the specialization from the stored doctor to our dropdown
      const specializationMap = {
        'Cardiologist': 'Cardiology',
        'Dermatologist': 'Dentistry', // Map to Dentistry for demo
        'Pediatrician': 'General Physician' // Map to General Physician for demo
      };
      
      const mappedSpecialization = specializationMap[doctor.specialization] || 'General Physician';
      
      // Set the specialization
      setSelectedSpecialization(mappedSpecialization);
      
      // Find and set the corresponding doctor from our doctors list
      const doctorInList = doctorsBySpecialization[mappedSpecialization]?.find(d => 
        d.name.toLowerCase().includes(doctor.name.toLowerCase().split(' ')[1]) || 
        d.specialty.toLowerCase().includes(doctor.specialization.toLowerCase())
      );
      
      if (doctorInList) {
        setSelectedDoctor(doctorInList);
      }
      
      // Clear the stored doctor after processing
      localStorage.removeItem('selectedDoctorForBooking');
    }
  }, []);

  // Filter doctors by location
  const getFilteredDoctors = (doctors) => {
    if (!searchLocation.trim()) return doctors;
    
    return doctors.filter(doctor => 
      doctor.clinicLocation.toLowerCase().includes(searchLocation.toLowerCase())
    );
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
        
        {/* Pre-selected Doctor Message */}
        {selectedDoctor && !selectedSlot && (
          <div className="alert alert-success mb-4" role="alert">
            <strong>Doctor Pre-selected:</strong> {selectedDoctor.name} ({selectedDoctor.specialty})
            <br />
            <small>Please select a time slot below to complete your booking.</small>
          </div>
        )}

        {/* Specialization Selection */}
        <div className="shadow-sm border-0 mb-4 p-4 rounded-3" style={{ backgroundColor: "white" }}>
          <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Find Doctor by Specialization & Location</h5>
          
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium" style={{ color: '#2c3e50' }}>
                Specialization
              </label>
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
                  borderRadius: '8px'
                }}
              >
                <option value="">Select Specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium" style={{ color: '#2c3e50' }}>
                Location (Optional)
              </label>
              <input 
                type="text"
                className="form-control"
                placeholder="Enter location (e.g., Mumbai, Pune)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                style={{
                  padding: '10px',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

          {/* Doctor Display */}
          {selectedSpecialization && (
            <div className="mt-4">
              <div className="mb-3">
                <h6 className="fw-bold" style={{ color: '#2c3e50' }}>Today's Date: {currentDate}</h6>
              </div>
              
              {getFilteredDoctors(doctorsBySpecialization[selectedSpecialization] || [])?.length > 0 ? (
                getFilteredDoctors(doctorsBySpecialization[selectedSpecialization] || [])?.map((doctor) => (
                  <div key={doctor.id} className="border p-3 rounded-3 mb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>{doctor.name}</h6>
                        <p className="mb-1 text-muted">{doctor.specialty}</p>
                        <p className="mb-2">
                          <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                          <small>{doctor.clinicLocation}</small>
                        </p>
                      </div>
                      <button
                        className={`btn ${selectedDoctor?.id === doctor.id ? 'btn-success' : 'btn-outline-primary'} rounded-pill`}
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setSelectedSlot("");
                        }}
                      >
                        {selectedDoctor?.id === doctor.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                    
                    {selectedDoctor?.id === doctor.id && (
                      <div className="mt-3">
                        <p className="mb-2 fw-medium">Available Time Slots:</p>
                        <div className="d-flex flex-wrap gap-2">
                          {doctor.todaySlots.map((slot, index) => (
                            <button
                              key={index}
                              className={`btn btn-sm ${selectedSlot === slot ? 'btn-success' : 'btn-outline-success'}`}
                              onClick={() => setSelectedSlot(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No doctors found matching your location search.</p>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setSearchLocation("")}
                  >
                    Clear Location Filter
                  </button>
                </div>
              )}
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