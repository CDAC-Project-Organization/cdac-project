import { useState } from "react";
import axios from "axios";
import PatientNavbar from "./PatientNavbar";

const FEEDBACK_API_URL = "http://localhost:8080/api/feedback";
const DEFAULT_RATING = 5;

function FeedbackPage({ appointmentId }) {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.post(FEEDBACK_API_URL, {
        appointment_id: appointmentId,
        rating,
        comments: comments.trim(),
      });

      setSuccess("Feedback submitted successfully.");
      setRating(DEFAULT_RATING);
      setComments("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <PatientNavbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">

                <h4 className="text-center fw-semibold mb-2">
                  Appointment Feedback
                </h4>
                <p className="text-center text-muted mb-4">
                  Please share your experience
                </p>

                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success py-2">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Rating */}
                  <div className="mb-3">
                    <label className="form-label fw-medium">Rating</label>
                    <select
                      className="form-select"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      disabled={loading}
                      required
                    >
                      <option value={1}>⭐ 1 - Poor</option>
                      <option value={2}>⭐⭐ 2 - Fair</option>
                      <option value={3}>⭐⭐⭐ 3 - Good</option>
                      <option value={4}>⭐⭐⭐⭐ 4 - Very Good</option>
                      <option value={5}>⭐⭐⭐⭐⭐ 5 - Excellent</option>
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
                      disabled={loading}
                    />
                  </div>

                  {/* Submit */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Feedback"}
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
