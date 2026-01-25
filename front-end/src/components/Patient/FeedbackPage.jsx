import { useState, useEffect } from "react";
import PatientNavbar from './PatientNavbar';

function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample patient appointments
  const sampleAppointments = [
    {
      id: 1,
      doctorName: "Dr. Priya Patel",
      specialization: "Cardiology",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "Completed"
    },
    {
      id: 2,
      doctorName: "Dr. Amit Kumar",
      specialization: "Dentistry",
      date: "2024-01-18",
      time: "11:00 AM",
      status: "Completed"
    },
    {
      id: 3,
      doctorName: "Dr. Neha Singh",
      specialization: "General Physician",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "Completed"
    }
  ];

  useEffect(() => {
    // Simulate loading patient appointments
    setTimeout(() => {
      // Filter only completed appointments (patients can only give feedback for completed appointments)
      const completedAppointments = sampleAppointments.filter(apt => apt.status === "Completed");
      setPatientAppointments(completedAppointments);
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert("Please select a doctor");
      return;
    }

    try {
      // In real app, this would be an API call
      console.log("Feedback submitted:", {
        doctorName: selectedDoctor,
        rating,
        comments,
        submissionDate: new Date().toISOString()
      });
      
      alert("Feedback submitted successfully!");
      setRating(5);
      setComments("");
      setSelectedDoctor("");
    } catch {
      alert("Failed to submit feedback");
    }
  };

  // Get unique doctors from completed appointments
  const getUniqueDoctors = () => {
    const uniqueDoctors = [];
    const seen = new Set();
    
    patientAppointments.forEach(appointment => {
      if (!seen.has(appointment.doctorName)) {
        seen.add(appointment.doctorName);
        uniqueDoctors.push({
          name: appointment.doctorName,
          specialization: appointment.specialization,
          lastAppointmentDate: appointment.date
        });
      }
    });
    
    return uniqueDoctors;
  };

  return (
    <div className="min-vh-100 bg-light">
      <PatientNavbar />
      <div style={{ paddingTop: "80px" }}></div>
      
      <div className="container py-5">
        <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="text-center mb-2 fw-semibold">
                Appointment Feedback
              </h4>
              <p className="text-center text-muted mb-4">
                Share your experience with your doctor
              </p>

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading your appointments...</p>
                </div>
              ) : patientAppointments.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-calendar-x text-muted" style={{ fontSize: '3rem' }}></i>
                  <p className="mt-3 text-muted">
                    You don't have any completed appointments yet.
                  </p>
                  <p className="text-muted">
                    You can only give feedback for doctors you've had appointments with.
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.href = '/patient'}
                  >
                    Book an Appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Doctor Selection */}
                  <div className="mb-4">
                    <label className="form-label fw-medium">
                      Select Doctor <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      required
                    >
                      <option value="">Choose a doctor you've visited</option>
                      {getUniqueDoctors().map((doctor, index) => (
                        <option key={index} value={doctor.name}>
                          {doctor.name} ({doctor.specialization}) - Last visited: {doctor.lastAppointmentDate}
                        </option>
                      ))}
                    </select>
                    <small className="text-muted">
                      Only doctors from your completed appointments are shown
                    </small>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <label className="form-label fw-medium">
                      Rating <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      required
                    >
                      <option value="1">⭐ 1 - Poor</option>
                      <option value="2">⭐⭐ 2 - Fair</option>
                      <option value="3">⭐⭐⭐ 3 - Good</option>
                      <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                      <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                    </select>
                  </div>

                  {/* Comments */}
                  <div className="mb-4">
                    <label className="form-label fw-medium">Comments (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Share your experience with this doctor..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Submit Feedback
                    </button>
                  </div>
                </form>
              )}

              {/* Appointment History Summary */}
              {!loading && patientAppointments.length > 0 && (
                <div className="mt-4 pt-4 border-top">
                  <h6 className="fw-medium mb-3">Your Completed Appointments</h6>
                  <div className="small text-muted">
                    {patientAppointments.map((apt, index) => (
                      <div key={apt.id} className="mb-2">
                        <span className="fw-medium">{apt.doctorName}</span> - {apt.specialization} 
                        <span className="text-muted ms-2">({apt.date} at {apt.time})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
