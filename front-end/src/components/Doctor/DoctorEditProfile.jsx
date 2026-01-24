// src/components/DoctorEditProfile.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import DoctorNavbar from "./DoctorNavbar";
=======
import DoctorNavbar from './DoctorNavbar';
>>>>>>> ketan

const DoctorEditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    clinic_name: "",
    clinic_location: "",
    consultation_fee: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Load dummy data on component mount
  useEffect(() => {
    const dummyData = {
      name: "Dr. John Smith",
      email: "john.smith@emed.com",
      phone: "9876543210",
      specialization: "Cardiology",
      clinic_name: "City Medical Center",
      clinic_location: "123 Main St, City, State",
      consultation_fee: "150",
    };
    setFormData(dummyData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.specialization.trim())
      newErrors.specialization = "Specialization is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess("Profile updated successfully!");
      setLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    }, 1000);
  };

  const handleReset = () => {
    const originalData = {
      name: "Dr. ABC",
      email: "Abc@emed.com",
      phone: "9876543210",
      specialization: "Cardiology",
      clinic_name: "City Medical Center",
      clinic_location: "123 Main St, City, State",
      consultation_fee: "150",
    };
    setFormData(originalData);
    setErrors({});
    setSuccess("Form reset to original data");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="min-vh-100 bg-light">
      <DoctorNavbar />
<<<<<<< HEAD
      
      <Container className="py-4">
      <div className="mb-4">
        <Button
          variant="outline-secondary"
          onClick={() => navigate(-1)}
          className="mb-3"
        >
          ← Back
        </Button>

        <h2>Edit Doctor Profile</h2>
        <p className="text-muted">Update your professional information</p>
      </div>
=======
      <div style={{ paddingTop: "80px" }}></div>
      
      <Container className="py-4">
        <div className="mb-4">
          <h2>Edit Doctor Profile</h2>
          <p className="text-muted">Update your professional information</p>
        </div>
>>>>>>> ketan

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <h5 className="mb-3 border-bottom pb-2">
                  Personal Information
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Specialization *</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    isInvalid={!!errors.specialization}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.specialization}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                <h5 className="mb-3 border-bottom pb-2">Clinic Information</h5>

                <Form.Group className="mb-3">
                  <Form.Label>Clinic Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="clinic_name"
                    value={formData.clinic_name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Consultation Fee (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="consultation_fee"
                    value={formData.consultation_fee}
                    onChange={handleChange}
                    min="0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Clinic Location</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="clinic_location"
                    value={formData.clinic_location}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4 pt-3 border-top">
              <Button variant="outline-danger" onClick={handleReset}>
                Reset
              </Button>

              <div className="d-flex gap-3">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
      </Container>
<<<<<<< HEAD
    </div>
  );
};
=======
      </div>
    );
  };
>>>>>>> ketan

export default DoctorEditProfile;
