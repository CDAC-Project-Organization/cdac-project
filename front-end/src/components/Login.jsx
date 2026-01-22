import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Initialize temporary users in localStorage if they don't exist
  useEffect(() => {
    if (!localStorage.getItem("tempUsers")) {
      const tempUsers = [
        {
          id: "1",
          email: "admin@123.com",
          password: "123",
          role: "admin",
          name: "Admin User",
          phone: "1234567890"
        },
        {
          id: "2",
          email: "patient@123.com",
          password: "123",
          role: "patient",
          name: "John Patient",
          phone: "9876543210",
          address: "123 Main St",
          dob: "1990-01-01"
        },
        {
          id: "3",
          email: "doctor@123.com",
          password: "123",
          role: "doctor",
          name: "Dr. Smith",
          phone: "5551234567",
          specialization: "Cardiologist",
          experience: "10 years"
        }
      ];
      localStorage.setItem("tempUsers", JSON.stringify(tempUsers));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoginError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if both fields have data
    if (!formData.email.trim() || !formData.password.trim()) {
      setLoginError("Please enter both email and password!");
      return;
    }

    setIsSubmitting(true);
    setLoginError("");
    
    // Simulate API call delay
    setTimeout(() => {
      // Get all temp users from localStorage
      const tempUsers = JSON.parse(localStorage.getItem("tempUsers")) || [];
      
      // Find user with matching email and password
      const user = tempUsers.find(
        u => u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        // Store current user in localStorage (without password for security)
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        
        // Store authentication token
        localStorage.setItem("isAuthenticated", "true");
        
        console.log("Login successful:", userWithoutPassword);
        
        // Navigate based on role
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "patient") {
          navigate("/patient");
        } else if (user.role === "doctor") {
          navigate("/doctor");
        }
      } else {
        setLoginError("Invalid email or password!");
      }
      
      setIsSubmitting(false);
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

                {/* Login Error Alert */}
                {loginError && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {loginError}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setLoginError("")}
                    ></button>
                  </div>
                )}

                {/* Quick Login Instructions
                <div className="alert alert-info mb-4">
                  <small>
                    <strong>Test Credentials:</strong><br/>
                    Admin: admin@emed.com / admin123<br/>
                    Patient: patient@emed.com / patient123<br/>
                    Doctor: doctor@emed.com / doctor123
                  </small>
                </div> */}

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