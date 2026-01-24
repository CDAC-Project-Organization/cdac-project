// src/components/admin/AddDoctor.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavbar from './AdminNavbar';

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

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        if (!formData.clinic_name.trim()) newErrors.clinic_name = 'Clinic name is required';
        if (!formData.consultation_fee) newErrors.consultation_fee = 'Fee is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fill all required fields');
            return;
        }

        setLoading(true);

        try {
            const doctorData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                phone: formData.phone.trim(),
                role: 'doctor',
                specialization: formData.specialization,
                clinic_name: formData.clinic_name.trim(),
                clinic_location: formData.clinic_location.trim() || '',
                consultation_fee: parseFloat(formData.consultation_fee),
                qualification: formData.qualification.trim() || '',
                experience_years: formData.experience_years || 0
            };

            const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/admin/doctors/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(doctorData)
            });

            if (response.ok) {
                toast.success(`Doctor ${formData.name} added successfully!`);
                
                // Reset form
                setFormData({
                    name: '', email: '', password: '', phone: '',
                    specialization: '', clinic_name: '', clinic_location: '',
                    consultation_fee: '', qualification: '', experience_years: ''
                });
                
                // Navigate to doctor list after 2 seconds
                setTimeout(() => {
                    navigate('/admin/doctorList');
                }, 2000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to add doctor');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light">
            <AdminNavbar />
            <div style={{ paddingTop: "80px" }}></div>
            
            <Container className="py-4">
            {/* Header */}
            <div className="mb-4">
                <h2 className=''>Add New Doctor</h2>
                <p className="text-muted">Fill in doctor details below</p>
            </div>

            <Card className="shadow-sm ">
                <Card.Body className="p-4 bg-body-tertiary">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            {/* Left Column */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                        placeholder="Dr. Full Name"
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
                                        placeholder="doctor@example.com"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone *</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        isInvalid={!!errors.phone}
                                        placeholder="9876543210"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Specialization *</Form.Label>
                                    <Form.Select
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        isInvalid={!!errors.specialization}
                                    >
                                        <option value="">Select Specialization</option>
                                        {specializations.map(spec => (
                                            <option key={spec} value={spec}>{spec}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.specialization}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            {/* Right Column */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Clinic Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="clinic_name"
                                        value={formData.clinic_name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.clinic_name}
                                        placeholder="ABC Hospital"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.clinic_name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Consultation Fee (₹) *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="consultation_fee"
                                        value={formData.consultation_fee}
                                        onChange={handleChange}
                                        isInvalid={!!errors.consultation_fee}
                                        placeholder="500"
                                        min="0"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.consultation_fee}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password *</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        placeholder="Enter password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Qualification</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        placeholder="MBBS, MD, etc."
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Full Width Fields */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Experience (Years)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="experience_years"
                                        value={formData.experience_years}
                                        onChange={handleChange}
                                        placeholder="5"
                                        min="0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label>Clinic Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="clinic_location"
                                        value={formData.clinic_location}
                                        onChange={handleChange}
                                        placeholder="City, Address"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Buttons */}
                        <div className="d-flex gap-3 mt-4">
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={loading}
                                className="px-4"
                            >
                                {loading ? 'Adding...' : 'Add Doctor'}
                            </Button>
                            
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => navigate('/admin/doctorList')}
                            >
                                View Doctors
                            </Button>
                            
                            <Button 
                                variant="outline-danger" 
                                onClick={() => setFormData({
                                    name: '', email: '', password: '', phone: '',
                                    specialization: '', clinic_name: '', clinic_location: '',
                                    consultation_fee: '', qualification: '', experience_years: ''
                                })}
                            >
                                Clear Form
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
};

export default AddDoctor;