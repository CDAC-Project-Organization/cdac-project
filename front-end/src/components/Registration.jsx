import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        date_of_birth: '',
        address: '',
        blood_group: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Registration successful!');
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

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
                    <div className="col-lg-8">
                        <div className="mb-4 text-center">
                            <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Patient Registration</h2>
                            <p className="text-muted mb-0">Create your E-Med Patient account</p>
                        </div>

                        <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                            <Card.Body className="p-4">
                                {successMessage && (
                                    <div className="alert alert-success rounded-3 mb-4">
                                        {successMessage}
                                    </div>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Basic Information</h5>
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
                                                        placeholder="Enter your full name"
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Group>
                                                    <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                                        Email Address *
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
                                                        placeholder="Enter your email"
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <Form.Group>
                                                    <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                                        Phone Number *
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
                                                        placeholder="Enter 10-digit phone number"
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Group>
                                                    <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                                        Gender *
                                                    </Form.Label>
                                                    <Form.Select
                                                        name="gender"
                                                        value={formData.gender}
                                                        onChange={handleChange}
                                                        required
                                                        style={{
                                                            padding: '10px',
                                                            border: '1px solid #e9ecef',
                                                            borderRadius: '8px'
                                                        }}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Security</h5>
                                        <div className="row">
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
                                                        placeholder="Enter password (min. 6 characters)"
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <Form.Group>
                                                    <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                                        Confirm Password *
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        required
                                                        style={{
                                                            padding: '10px',
                                                            border: '1px solid #e9ecef',
                                                            borderRadius: '8px'
                                                        }}
                                                        placeholder="Confirm your password"
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Additional Information</h5>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <Form.Group>
                                                    <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                                        Date of Birth
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="date_of_birth"
                                                        value={formData.date_of_birth}
                                                        onChange={handleChange}
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
                                                        Blood Group
                                                    </Form.Label>
                                                    <Form.Select
                                                        name="blood_group"
                                                        value={formData.blood_group}
                                                        onChange={handleChange}
                                                        style={{
                                                            padding: '10px',
                                                            border: '1px solid #e9ecef',
                                                            borderRadius: '8px'
                                                        }}
                                                    >
                                                        <option value="">Select Blood Group</option>
                                                        {bloodGroups.map(group => (
                                                            <option key={group} value={group}>{group}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                                Address
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                style={{
                                                    padding: '10px',
                                                    border: '1px solid #e9ecef',
                                                    borderRadius: '8px'
                                                }}
                                                placeholder="Enter your full address"
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="d-grid mb-3">
                                        <Button
                                            type="submit"
                                            className="rounded-pill py-2 fw-medium"
                                            style={{
                                                backgroundColor: '#48b575',
                                                color: 'white',
                                                border: 'none',
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            Register as Patient
                                        </Button>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-muted mb-2">
                                            Already have an account?{' '}
                                            <a href="/login" className="fw-medium" style={{ color: '#48b575' }}>
                                                Sign in here
                                            </a>
                                        </p>
                                        <small className="text-muted">
                                            By registering, you agree to our Terms of Service and Privacy Policy
                                        </small>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-4 mt-5" style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}>
                <div className="container text-center">
                    <small style={{ color: "#95a5a6" }}>
                        © 2024 E-MED Healthcare. All rights reserved.
                    </small>
                </div>
            </footer>
        </div>
    );
};

export default Registration;