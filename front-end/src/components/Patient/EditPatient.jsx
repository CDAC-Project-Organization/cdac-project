import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // AXIOS IMPORT
import PatientNavbar from "./PatientNavbar";

function EditPatient() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    address: "",
    gender: "MALE",
    dateOfBirth: "",
    bloodGroup: "A_POSITIVE",
    familyHistory: "",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/80/4a6fa5/ffffff?text=P",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // AXIOS CONFIGURATION
  const API_BASE_URL = "http://localhost:8080";
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  // Fetch patient data
  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  // AXIOS GET REQUEST
  const fetchPatientData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/patient/${patientId}`); // AXIOS GET
      const patient = response.data;

      setFormData({
        patientName: patient.patientName || "",
        email: patient.email || "",
        phone: patient.phone || "",
        address: patient.address || "",
        gender: patient.gender || "MALE",
        dateOfBirth: patient.dateOfBirth || "",
        bloodGroup: patient.bloodGroup || "A_POSITIVE",
        familyHistory: patient.familyHistory || "",
      });

      if (patient.profileImage) {
        setPreview(`${API_BASE_URL}${patient.profileImage}`);
      }
    } catch (err) {
      console.error("Error fetching patient data:", err);
      setMessage({
        type: "danger",
        text: "Failed to load patient data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image" && files && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (message.text) setMessage({ type: "", text: "" });
  };

  // AXIOS PUT REQUEST
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const updateData = {
        patientName: formData.patientName,
        phone: formData.phone || null,
        address: formData.address || null,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth || null,
        bloodGroup: formData.bloodGroup,
        familyHistory: formData.familyHistory || null,
      };

      const response = await api.put(
        `/patient/edit-profile/${patientId}`,
        updateData,
      ); // AXIOS PUT

      setMessage({ type: "success", text: "Profile updated successfully!" });
      fetchPatientData();
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      console.error("Error updating patient:", err);
      setMessage({
        type: "danger",
        text:
          err.response?.data?.message ||
          "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    fetchPatientData();
    setMessage({ type: "", text: "" });
  };

  const formatBloodGroup = (bg) => {
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
            <p className="mt-3">Loading patient data...</p>
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
              Edit Profile Information
            </h1>
            <p className="text-muted">Update your personal details below</p>
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
              />
            </div>
          </div>
        </div>

        {message.text && (
          <div
            className={`alert alert-${message.type} alert-dismissible fade show mb-4`}
            role="alert"
          >
            {message.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage({ type: "", text: "" })}
            ></button>
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
                  <label className="form-label fw-medium">Contact Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
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
                  <label className="form-label fw-medium">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
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
                  <label className="form-label fw-medium">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ""}
                    onChange={handleChange}
                  />
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
                    name="profile_image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Note: Image upload depends on backend implementation
                  </small>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
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
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPatient;
