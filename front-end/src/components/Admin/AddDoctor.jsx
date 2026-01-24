// src/components/admin/AddDoctor.jsx
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavBar';

const AddDoctor = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        specialization: '',
        clinic_name: '',
        clinic_location: '',
        consultation_fee: '',
        qualification: '',
        experience_years: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const specializations = [
        'Cardiology', 'Dermatology', 'General Medicine', 'Neurology',
        'Pediatrics', 'Orthopedics', 'Gynecology', 'ENT'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Doctor ${formData.name} added successfully!`);
        navigate('/admin/doctorList');
    };

    // const handleLogout = () => {
    //     localStorage.removeItem("currentUser");
    //     localStorage.removeItem("isAuthenticated");
    //     navigate("/login");
    // };

    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Navbar */}
            
            <AdminNavbar/>

            <div style={{ paddingTop: "80px" }}></div>

            <div className="container py-4">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Add New Doctor</h2>
                            <p className="text-muted mb-0">Fill in doctor details below</p>
                        </div>
                       
                    </div>
                </div>

                <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                    <Card.Body className="p-4">
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Full Name *
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
                                            placeholder="Dr. Full Name"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Email *
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
                                            placeholder="doctor@example.com"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Phone *
                                        </Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="9876543210"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Specialization *
                                        </Form.Label>
                                        <Form.Select
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            <option value="">Select Specialization</option>
                                            {specializations.map(spec => (
                                                <option key={spec} value={spec}>{spec}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Clinic Name *
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="clinic_name"
                                            value={formData.clinic_name}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="ABC Hospital"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Consultation Fee *
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="consultation_fee"
                                            value={formData.consultation_fee}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="500"
                                            min="0"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Password *
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="Enter password"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Qualification
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="qualification"
                                            value={formData.qualification}
                                            onChange={handleChange}
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="MBBS, MD, etc."
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Experience (Years)
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="experience_years"
                                            value={formData.experience_years}
                                            onChange={handleChange}
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="5"
                                            min="0"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Clinic Location
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="clinic_location"
                                            value={formData.clinic_location}
                                            onChange={handleChange}
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="City, Address"
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
                                    Add Doctor
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

export default AddDoctor;