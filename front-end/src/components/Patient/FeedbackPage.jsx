import { useState } from "react";
import axios from "axios";
import PatientNavbar from './PatientNavbar';

function FeedbackPage({ appointmentId }) {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/feedback", {
        appointment_id: appointmentId,
        rating,
        comments,
      });
      alert("Feedback submitted successfully");
      setRating(5);
      setComments("");
    } catch {
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <PatientNavbar />
      <div style={{ paddingTop: "80px" }}></div>
      
      <div className="container py-5">
        <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="text-center mb-2 fw-semibold">
                Appointment Feedback
              </h4>
              <p className="text-center text-muted mb-4">
                Please share your experience
              </p>

              <form onSubmit={handleSubmit}>
                {/* Rating */}
                <div className="mb-3">
                  <label className="form-label fw-medium">Rating</label>
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
                  <label className="form-label fw-medium">Comments</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Optional"
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
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
