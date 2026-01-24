// src/components/admin/EditDoctor.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditDoctor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [doctor, setDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialization: '',
        status: 'active',
        phone: '',
        experience: '',
        consultation_fee: ''
    });

    const dummyDoctors = [
        { id: 1, name: 'Dr. John Smith', email: 'john.smith@emed.com', specialization: 'Cardiology', status: 'active', phone: '+1-555-0101', experience: '12 years', consultation_fee: '$150' },
        { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@emed.com', specialization: 'Dermatology', status: 'active', phone: '+1-555-0102', experience: '8 years', consultation_fee: '$120' },
        { id: 3, name: 'Dr. Michael Chen', email: 'michael.chen@emed.com', specialization: 'Neurology', status: 'active', phone: '+1-555-0103', experience: '15 years', consultation_fee: '$180' },
        { id: 4, name: 'Dr. Emily Davis', email: 'emily.davis@emed.com', specialization: 'Pediatrics', status: 'pending', phone: '+1-555-0104', experience: '6 years', consultation_fee: '$100' },
        { id: 5, name: 'Dr. Robert Wilson', email: 'robert.wilson@emed.com', specialization: 'Orthopedics', status: 'active', phone: '+1-555-0105', experience: '20 years', consultation_fee: '$200' },
    ];

    useEffect(() => {
        const foundDoctor = dummyDoctors.find(doc => doc.id === parseInt(id));
        if (foundDoctor) {
            setDoctor(foundDoctor);
            setFormData({
                name: foundDoctor.name,
                email: foundDoctor.email,
                specialization: foundDoctor.specialization,
                status: foundDoctor.status,
                phone: foundDoctor.phone,
                experience: foundDoctor.experience,
                consultation_fee: foundDoctor.consultation_fee
            });
        }
        setLoading(false);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Doctor ${formData.name} updated successfully!`);
        navigate('/admin/doctorList');
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" style={{ color: '#48b575' }}></div>
                <p className="mt-3 text-muted">Loading doctor details...</p>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">Doctor not found</p>
                <Button onClick={() => navigate('/admin/doctorList')} variant="primary">
                    Back to Doctors List
                </Button>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#48b575" }}>
                <div className="container">
                    <a className="navbar-brand fw-bold fs-4" href="/admin" style={{ color: "#ffffff" }}>
                        E-MED Admin
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#adminNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="adminNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin" style={{ color: "#e8f5e9" }}>
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin/doctorList" style={{ color: "#e8f5e9" }}>
                                    Doctors
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin/patientList" style={{ color: "#e8f5e9" }}>
                                    Patients
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin/addDoctor" style={{ color: "#e8f5e9" }}>
                                    Add Doctor
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin/appointments" style={{ color: "#e8f5e9" }}>
                                    All Appointment
                                </a>
                            </li>
                        </ul>
                        <button
                            className="btn btn-light rounded-pill px-4 ms-lg-2 fw-medium"
                            onClick={handleLogout}
                            style={{ color: "#48b575" }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div style={{ paddingTop: "80px" }}></div>

            <div className="container py-4">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Edit Doctor</h2>
                            <p className="text-muted mb-0">Update doctor information</p>
                        </div>
                        <Button
                            onClick={() => navigate('/admin/doctorList')}
                            variant="outline-secondary"
                            className="rounded-pill"
                        >
                            ← Back to Doctors
                        </Button>
                    </div>
                </div>

                <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                    <Card.Body className="p-4">
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Doctor Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Specialization
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Status
                                        </Form.Label>
                                        <Form.Select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            <option value="active">Active</option>
                                            <option value="pending">Pending</option>
                                            <option value="inactive">Inactive</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Phone Number
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Experience
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="e.g., 12 years"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Consultation Fee
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="consultation_fee"
                                            value={formData.consultation_fee}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="e.g., $150"
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="d-flex gap-3 mt-4">
                                <Button
                                    type="submit"
                                    className="rounded-pill px-4 fw-medium"
                                    style={{
                                        backgroundColor: '#48b575',
                                        color: 'white',
                                        border: 'none'
                                    }}
                                >
                                    Update Doctor
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline-secondary"
                                    className="rounded-pill px-4"
                                    onClick={() => navigate('/admin/doctorList')}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default EditDoctor;