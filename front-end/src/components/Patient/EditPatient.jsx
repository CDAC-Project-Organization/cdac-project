import { useState } from "react";
import PatientNavbar from './PatientNavbar';

function EditPatient() {
  const [formData, setFormData] = useState({
    name: "Abc",
    email: "Abc@example.com",
    phone: "9876543210",
    address: "123, MG Road, Pune, Maharashtra 411001",
    gender: "Male",
    date_of_birth: "1995-08-15",
    blood_group: "O+",
    profile_image: null,
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/80/4a6fa5/ffffff?text=JD"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_image") {
      setFormData((prev) => ({ ...prev, profile_image: files[0] }));
      if (files[0]) {
        setPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsSubmitting(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }, 1500);
  };

  const handleCancel = () => {
    setFormData({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "9876543210",
      address: "123, MG Road, Pune, Maharashtra 411001",
      gender: "Male",
      date_of_birth: "1995-08-15",
      blood_group: "O+",
      profile_image: null,
    });
    setPreview("https://via.placeholder.com/80/4a6fa5/ffffff?text=JD");
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="min-vh-100 bg-light">
      <PatientNavbar />
      <div style={{ paddingTop: "80px" }}></div>
      
      <div className="container py-4">
        <div className="row mb-4 align-items-center">
        <div className="col">
          <h1 className="h2 fw-bold text-primary">Edit Profile Information</h1>
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

      {/* Message Alert */}
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

      {/* Main Form */}
      <div className="card shadow">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email (disabled) */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Email Address</label>
                <input
                  type="email"
                  className="form-control bg-light"
                  value={formData.email || ""}
                  disabled
                />
              </div>

              {/* Phone */}
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

              {/* Blood Group */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Blood Group</label>
                <select
                  className="form-select"
                  name="blood_group"
                  value={formData.blood_group || ""}
                  onChange={handleChange}
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

              {/* Address */}
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

              {/* Gender */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="date_of_birth"
                  value={formData.date_of_birth || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Profile Image Upload */}
              <div className="col-12 mb-4">
                <label className="form-label fw-medium">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="profile_image"
                  onChange={handleChange}
                  accept="image/*"
                />
                <small className="text-muted">
                  Leave empty to keep current image
                </small>
              </div>
            </div>

            {/* Form Buttons */}
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
  </div>
  );
}

export default EditPatient;
