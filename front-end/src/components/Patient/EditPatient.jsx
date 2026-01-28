import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientNavbar from "./PatientNavbar";

function EditPatient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    gender: "MALE",
    bloodGroup: "A_POSITIVE",
    familyHistory: "",
    profileImage: ""
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/80/4a6fa5/ffffff?text=P",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // AXIOS CONFIGURATION
  const API_BASE_URL = "http://localhost:8080";

  // Get JWT token and patient ID from session storage (same as PatientDashboard)
  const getToken = () => sessionStorage.getItem("jwtToken");
  const getPatientId = () => {
    return sessionStorage.getItem("patientId") || localStorage.getItem("patientId");
  };

  // Create authenticated axios instance (same as PatientDashboard)
  const getApi = () => {
    const token = getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }
    return axios.create({
      baseURL: API_BASE_URL,
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
  };

  // Fetch patient data for logged-in user
  useEffect(() => {
    // Check authentication (same as PatientDashboard)
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const userRole = sessionStorage.getItem("userRole");
    const token = getToken();

    if (!isAuthenticated || userRole !== "ROLE_PATIENT" || !token) {
      alert("Please login as patient to access this page");
      navigate("/login");
      return;
    }

    fetchPatientData();
  }, [navigate]);

  // Fetch current patient data using JWT token (same as PatientDashboard)
  const fetchPatientData = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const api = getApi();
      
      // Fetch patient data using JWT token (same as PatientDashboard)
      const response = await api.get("/patient/byUser");
      const patient = response.data;

      console.log("Fetched patient data from /patient/byUser:", patient);

      // Populate form with fetched data (only required fields as per API)
      setFormData({
        patientName: patient.patientName || "",
        email: patient.email || "",
        gender: patient.gender || "MALE",
        bloodGroup: patient.bloodGroup || "A_POSITIVE",
        familyHistory: patient.familyHistory || "",
        profileImage: patient.profileImage || ""
      });

      // Store patient ID in session storage (same as PatientDashboard)
      if (patient.patientId) {
        sessionStorage.setItem("patientId", patient.patientId);
        localStorage.setItem("patientId", patient.patientId);
        console.log("Stored patientId:", patient.patientId);
      }

      // Set profile image preview if available
      if (patient.profileImage) {
        setPreview(`${API_BASE_URL}${patient.profileImage}`);
      }

    } catch (err) {
      console.error("Error fetching patient data:", err);
      
      if (err.response?.status === 401) {
        setMessage({
          type: "danger",
          text: "Session expired. Please login again.",
        });
        setTimeout(() => {
          sessionStorage.clear();
          localStorage.clear();
          navigate("/login");
        }, 2000);
      } else {
        setMessage({
          type: "danger",
          text: err.response?.data?.message || "Failed to load patient data. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Handle file upload for profile image
    if (name === "profileImage" && files && files[0]) {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
      
      // Convert file to base64 for API
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (message.text) setMessage({ type: "", text: "" });
  };

  // AXIOS PUT REQUEST - update patient profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const api = getApi();
      const patientId = getPatientId();
      
      if (!patientId) {
        setMessage({
          type: "danger",
          text: "Patient ID not found. Please login again.",
        });
        setIsSubmitting(false);
        return;
      }

      // Prepare update data with only required fields as per API
      const updateData = {
        patientName: formData.patientName,
        email: formData.email,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        familyHistory: formData.familyHistory,
        profileImage: formData.profileImage || null
      };

      console.log("Updating patient with ID:", patientId);
      console.log("Update data:", updateData);

      // Send PUT request to update profile with patientId in URL
      const response = await api.put(`/patient/edit-profile/${patientId}`, updateData);

      console.log("Update response:", response.data);

      setMessage({ 
        type: "success", 
        text: response.data?.message || "Profile updated successfully! Redirecting to dashboard..." 
      });
      
      // Refresh data after successful update
      fetchPatientData();
      
      // Navigate back to dashboard after 2 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
        navigate("/patient/");
      }, 1000);
      
    } catch (err) {
      console.error("Error updating patient profile:", err);
      
      if (err.response?.status === 401) {
        setMessage({
          type: "danger",
          text: "Session expired. Please login again.",
        });
        setTimeout(() => {
          sessionStorage.clear();
          localStorage.clear();
          navigate("/login");
        }, 2000);
      } else if (err.response?.status === 400) {
        setMessage({
          type: "warning",
          text: err.response.data?.message || "Please check your input data.",
        });
      } else if (err.response?.status === 404) {
        setMessage({
          type: "danger",
          text: "Patient not found. Please login again.",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage({
          type: "danger",
          text: err.response?.data?.message || "Failed to update profile. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    fetchPatientData();
    setMessage({ type: "", text: "" });
  };

  const formatBloodGroup = (bg) => {
    if (!bg) return "";
    return bg
      .replace("_", "+")
      .replace("POSITIVE", "+")
      .replace("NEGATIVE", "-");
  };

  const parseBloodGroup = (displayBg) => {
    const map = {
      "A+": "A_POSITIVE",
      "A-": "A_NEGATIVE",
      "B+": "B_POSITIVE",
      "B-": "B_NEGATIVE",
      "O+": "O_POSITIVE",
      "O-": "O_NEGATIVE",
      "AB+": "AB_POSITIVE",
      "AB-": "AB_NEGATIVE",
    };
    return map[displayBg] || "A_POSITIVE";
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light">
        <PatientNavbar />
        <div style={{ paddingTop: "80px" }}></div>
        <div className="container py-4">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <PatientNavbar />
      <div style={{ paddingTop: "80px" }}></div>

      <div className="container py-4">
        <div className="row mb-4 align-items-center">
          <div className="col">
            <h1 className="h2 fw-bold text-primary">
              Edit Your Profile
            </h1>
            <p className="text-muted">Update your personal details</p>
          </div>
          <div className="col-auto">
            <div
              className="rounded-circle border border-3 border-white shadow"
              style={{ width: "80px", height: "80px", overflow: "hidden" }}
            >
              <img
                src={preview}
                className="w-100 h-100 object-fit-cover"
                alt="Profile"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80/4a6fa5/ffffff?text=P";
                }}
              />
            </div>
          </div>
        </div>

        {message.text && (
          <div
            className={`alert alert-${message.type} alert-dismissible fade show mb-4`}
            role="alert"
          >
            <div className="d-flex align-items-center">
              <span className="flex-grow-1">{message.text}</span>
              <button
                type="button"
                className="btn-close"
                onClick={() => setMessage({ type: "", text: "" })}
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}

        <div className="card shadow">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">Email Address</label>
                  <input
                    type="email"
                    className="form-control bg-light"
                    value={formData.email}
                    disabled
                    readOnly
                  />
                  <small className="text-muted">Email cannot be changed</small>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">Gender *</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">Blood Group</label>
                  <select
                    className="form-select"
                    name="bloodGroup"
                    value={formatBloodGroup(formData.bloodGroup)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bloodGroup: parseBloodGroup(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label fw-medium">Family History</label>
                  <textarea
                    className="form-control"
                    name="familyHistory"
                    value={formData.familyHistory || ""}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter any family medical history..."
                  />
                </div>

                <div className="col-12 mb-4">
                  <label className="form-label fw-medium">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Upload a new profile image (optional)
                  </small>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/patient/")}
                  disabled={isSubmitting}
                >
                  <i className="bi bi-arrow-left me-1"></i>
                  Back to Dashboard
                </button>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Reset Changes
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Debug info - Remove in production */}
        <div className="mt-4 small text-muted">
          <p className="mb-1">
            <strong>Debug Info:</strong> Patient ID: {getPatientId()}
          </p>
          <p className="mb-0">
            <strong>API Endpoint:</strong> PUT {API_BASE_URL}/patient/edit-profile/{getPatientId()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditPatient;