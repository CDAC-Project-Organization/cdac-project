import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Initialize temporary users
  useEffect(() => {
    if (!localStorage.getItem("tempUsers")) {
      const tempUsers = [
        {
          id: "1",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
          name: "Admin User"
        },
        {
          id: "2",
          email: "patient@example.com",
          password: "patient123",
          role: "patient",
          name: "John Patient"
        },
        {
          id: "3",
          email: "doctor@example.com",
          password: "doctor123",
          role: "doctor",
          name: "Dr. Smith"
        }
      ];
      localStorage.setItem("tempUsers", JSON.stringify(tempUsers));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoginError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      setLoginError("Please enter both email and password");
      return;
    }

    setIsSubmitting(true);
    setLoginError("");
    
    setTimeout(() => {
      const tempUsers = JSON.parse(localStorage.getItem("tempUsers")) || [];
      const user = tempUsers.find(
        u => u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        localStorage.setItem("isAuthenticated", "true");
        
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "patient") {
          navigate("/patient");
        } else if (user.role === "doctor") {
          navigate("/doctor");
        }
      } else {
        setLoginError("Invalid email or password");
      }
      
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ 
      backgroundColor: "#f5f7fa"
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                    E-MED Login
                  </h2>
                  <p className="text-muted mb-0">
                    Sign in to access your account
                  </p>
                </div>

                {loginError && (
                  <div className="alert alert-danger alert-dismissible fade show rounded-3" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {loginError}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setLoginError("")}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
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
                  </div>

                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg fw-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Login
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mb-4">
                    <small className="text-muted">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-decoration-none fw-medium">
                        Sign up
                      </Link>
                    </small>
                  </div>

                  <div className="text-center">
                    <Link to="/" className="text-decoration-none d-inline-flex align-items-center">
                      <i className="bi bi-arrow-left me-2"></i>
                      Back to Home
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;