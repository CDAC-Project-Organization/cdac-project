
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration = () => {
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
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const userData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                phone: formData.phone.trim(),
                role: 'patient', // Hardcoded as patient only
                gender: formData.gender,
                date_of_birth: formData.date_of_birth || null,
                address: formData.address.trim() || '',
                blood_group: formData.blood_group || ''
            };

            console.log('Sending registration data:', userData);

            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                setSuccessMessage('Registration successful! You can now login.');
                setErrorMessage('');
                // Reset form
                setFormData({
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
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    };

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center p-3"
            style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '100vh'
            }}
        >
            <div className="w-100" style={{ maxWidth: '800px' }}>
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    
                    <div className="bg-primary" style={{ height: '4px' }}></div>
                    
                    <Card.Body className="p-4 p-lg-5">
                       
                        <div className="text-center mb-4">
                            <div className="mb-3">
                                <i className="bi bi-heart-pulse-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
                            </div>
                            <h2 className="fw-bold mb-2">Patient Registration</h2>
                            <p className="text-muted">Create your E-Med Patient account</p>
                        </div>

              
                        {successMessage && (
                            <Alert variant="success" className="border-0 rounded-3 mb-4" dismissible
                                onClose={() => setSuccessMessage('')}>
                                <i className="bi bi-check-circle me-2"></i>
                                {successMessage}
                            </Alert>
                        )}
                        
                        {errorMessage && (
                            <Alert variant="danger" className="border-0 rounded-3 mb-4" dismissible
                                onClose={() => setErrorMessage('')}>
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {errorMessage}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h5 className="fw-semibold mb-3 text-muted border-bottom pb-2">
                                    <i className="bi bi-person-circle me-2"></i>
                                    Basic Information
                                </h5>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">
                                                <i className="bi bi-person me-2"></i>
                                                Full Name *
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.name}
                                                placeholder="Enter your full name"
                                                className="rounded-3 py-2"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">
                                                <i className="bi bi-envelope me-2"></i>
                                                Email Address *
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                isInvalid={!!errors.email}
                                                placeholder="Enter your email"
                                                className="rounded-3 py-2"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">
                                                <i className="bi bi-phone me-2"></i>
                                                Phone Number *
                                            </Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                isInvalid={!!errors.phone}
                                                placeholder="Enter 10-digit phone number"
                                                className="rounded-3 py-2"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">
                                                <i className="bi bi-gender-ambiguous me-2"></i>
                                                Gender *
                                            </Form.Label>
                                            <Form.Select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                isInvalid={!!errors.gender}
                                                className="rounded-3 py-2"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.gender}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mb-4">
                                <h5 className="fw-semibold mb-3 text-muted border-bottom pb-2">
                                    <i className="bi bi-shield-lock me-2"></i>
                                    Security
                                </h5>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">
                                                <i className="bi bi-lock me-2"></i>
                                                Password *
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                                placeholder="Enter password (min. 6 characters)"
                                                className="rounded-3 py-2"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">
                                                <i className="bi bi-lock-fill me-2"></i>
                                                Confirm Password *
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                isInvalid={!!errors.confirmPassword}
                                                placeholder="Confirm your password"
                                                className="rounded-3 py-2"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mb-4">
                                <h5 className="fw-semibold mb-3 text-muted border-bottom pb-2">
                                    <i className="bi bi-clipboard-data me-2"></i>
                                    Additional Information
                                </h5>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">
                                                <i className="bi bi-calendar me-2"></i>
                                                Date of Birth
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date_of_birth"
                                                value={formData.date_of_birth}
                                                onChange={handleChange}
                                                className="rounded-3 py-2"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">
                                                <i className="bi bi-droplet me-2"></i>
                                                Blood Group
                                            </Form.Label>
                                            <Form.Select
                                                name="blood_group"
                                                value={formData.blood_group}
                                                onChange={handleChange}
                                                className="rounded-3 py-2"
                                            >
                                                <option value="">Select Blood Group</option>
                                                {bloodGroups.map(group => (
                                                    <option key={group} value={group}>{group}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">
                                        <i className="bi bi-house-door me-2"></i>
                                        Address
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter your full address"
                                        className="rounded-3"
                                    />
                                </Form.Group>
                            </div>

                            <div className="d-grid mb-3">
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="py-3 fw-bold rounded-3"
                                    size="lg"
                                >
                                    <i className="bi bi-person-plus me-2"></i>
                                    Register as Patient
                                </Button>
                            </div>

                            <div className="text-center">
                                <p className="text-muted mb-0">
                                    Already have an account?{' '}
                                    <a href="/login" className="text-primary fw-medium text-decoration-none">
                                        <i className="bi bi-box-arrow-in-right me-1"></i>
                                        Sign in here
                                    </a>
                                </p>
                                <small className="text-muted mt-2 d-block">
                                    By registering, you agree to our Terms of Service and Privacy Policy
                                </small>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default Registration;