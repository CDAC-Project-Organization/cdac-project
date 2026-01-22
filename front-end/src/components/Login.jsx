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
          email: "admin@123.com",
          password: "123",
          role: "admin",
          name: "Admin User"
        },
        {
          id: "2",
          email: "patient@123.com",
          password: "123",
          role: "patient",
          name: "John Patient"
        },
        {
          id: "3",
          email: "doctor@123.com",
          password: "123",
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
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#48b575" }}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/" style={{ color: "#ffffff" }}>
            E-MED
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/" style={{ color: "#e8f5e9" }}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/login" style={{ color: "#e8f5e9" }}>
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/signup" style={{ color: "#e8f5e9" }}>
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: "80px" }}></div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="mb-4 text-center">
              <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Login to E-MED</h2>
              <p className="text-muted mb-0">Sign in to access your account</p>
            </div>

            <div className="shadow-sm border-0 p-4 rounded-3" style={{ backgroundColor: "white" }}>
              {loginError && (
                <div className="alert alert-danger rounded-3 mb-4">
                  <div className="d-flex align-items-center">
                    <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>⚠️</span>
                    <span>{loginError}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-medium" style={{ color: '#2c3e50' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      padding: '10px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px'
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-medium" style={{ color: '#2c3e50' }}>
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
                    style={{
                      padding: '10px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px'
                    }}
                  />
                </div>

                <div className="d-grid mb-4">
                  <button
                    type="submit"
                    className="btn py-2 fw-medium"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: '#48b575',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1.1rem'
                    }}
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
                </div>

                <div className="text-center mb-3">
                  <small className="text-muted">
                    Don't have an account?{' '}
                    <Link to="/signup" className="fw-medium" style={{ color: '#48b575' }}>
                      Sign up
                    </Link>
                  </small>
                </div>

              

                {/* <div className="text-center">
                  <Link to="/" className="fw-medium" style={{ color: '#48b575' }}>
                    ← Back to Home
                  </Link>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="py-4 mt-5" style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}>
        <div className="container text-center">
          <small style={{ color: "#95a5a6" }}>
            © 2024 E-MED Healthcare. All rights reserved.
          </small>
        </div>
      </footer> */}
    </div>
  );
};

export default Login;