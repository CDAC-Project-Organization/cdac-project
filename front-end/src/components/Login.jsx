import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if both fields have data
    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Please enter both email and password!");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate login validation (replace with real API call later)
    setTimeout(() => {
      console.log("Login data:", formData);
      
      // Store user data in localStorage for EditPatient page
      localStorage.setItem("user", JSON.stringify({
        user_id: "123", // dummy patient ID
        email: formData.email
      }));
      
      setIsSubmitting(false);
      navigate("/admin"); // Navigate only if data is entered
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h3 className="card-title text-center mb-3">E-MED Login</h3>
                <p className="text-center text-muted mb-4">
                  Sign in to manage your appointments.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  <div className="text-center">
                    <small className="text-muted">
                      New to E-MED?{" "}
                      <a href="/signup" className="text-primary">
                        Create an account
                      </a>
                    </small>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-muted mt-3 mb-0">
              <a href="/" className="text-decoration-none">
                ← Back to Home
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
