// src/components/admin/EditDoctor.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavBar';
import axios from 'axios';

const EditDoctor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        doctorName: '',
        email: '',
        speciality: '',
        location: '',
        experience: '',
        fees: '',
        startTime: '',
        endTime: ''
    });

    const [errors, setErrors] = useState({});

    const specialities = [
        'Cardiologist',
        'Orthopedic',
        'Neurologist',
        'Gynecologist',
        'Pediatrician',
        'Dermatologist',
        'General Physician',
        'ENT Specialist',
        'Dentist',
        'Psychiatrist'
    ];

    // Fetch doctor data
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                // First get all doctors
                const response = await axios.get('http://localhost:8080/doctor/findAllDoctors');
                if (response.data) {
                    const foundDoctor = response.data.find(doc => 
                        doc.doctorId === parseInt(id) || doc.doctorId.toString() === id
                    );
                    
                    if (foundDoctor) {
                        setDoctor(foundDoctor);
                        setFormData({
                            doctorName: foundDoctor.doctorName || '',
                            email: foundDoctor.email || '',
                            speciality: foundDoctor.speciality || '',
                            location: foundDoctor.location || '',
                            experience: foundDoctor.experience?.toString() || '',
                            fees: foundDoctor.fees?.toString() || '',
                            startTime: foundDoctor.startTime?.substring(0, 5) || '', // HH:mm format
                            endTime: foundDoctor.endTime?.substring(0, 5) || '' // HH:mm format
                        });
                    } else {
                        setApiError('Doctor not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching doctor:', error);
                setApiError('Failed to load doctor details');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear field-specific error
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        // Clear API errors
        if (apiError) setApiError('');
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required fields validation
        if (!formData.doctorName.trim()) newErrors.doctorName = 'Doctor name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.speciality) newErrors.speciality = 'Speciality is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        
        if (!formData.fees || formData.fees <= 0) {
            newErrors.fees = 'Valid fees is required';
        } else if (isNaN(formData.fees)) {
            newErrors.fees = 'Fees must be a number';
        }
        
        if (!formData.experience || formData.experience < 0) {
            newErrors.experience = 'Valid experience is required';
        } else if (isNaN(formData.experience)) {
            newErrors.experience = 'Experience must be a number';
        }
        
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (!formData.endTime) newErrors.endTime = 'End time is required';
        
        // Time validation
        if (formData.startTime && formData.endTime) {
            const [startHours, startMinutes] = formData.startTime.split(':').map(Number);
            const [endHours, endMinutes] = formData.endTime.split(':').map(Number);
            
            const startTotal = startHours * 60 + startMinutes;
            const endTotal = endHours * 60 + endMinutes;
            
            if (endTotal <= startTotal) {
                newErrors.endTime = 'End time must be after start time';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        setApiError('');
        setApiSuccess('');

        // Prepare request data
        const updateData = {
            doctorId: parseInt(id),
            doctorName: formData.doctorName.trim(),
            email: formData.email.trim(),
            speciality: formData.speciality,
            location: formData.location.trim(),
            experience: parseInt(formData.experience),
            fees: parseFloat(formData.fees),
            startTime: `${formData.startTime}:00`, // Add seconds
            endTime: `${formData.endTime}:00`     // Add seconds
        };

        try {
            const response = await axios.put('http://localhost:8080/doctor/edit-profile', updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });

            if (response.data.status === 'SUCCESS') {
                setApiSuccess('Doctor profile updated successfully!');
                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate('/admin/doctorList');
                }, 1000);
            } else {
                setApiError(response.data.message || 'Failed to update doctor');
            }
        } catch (error) {
            if (error.response) {
                setApiError(error.response.data.message || 'Failed to update doctor');
            } else if (error.request) {
                setApiError('Network error. Please check your connection.');
            } else {
                setApiError('An error occurred. Please try again.');
            }
            console.error('Error updating doctor:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" style={{ color: '#48b575' }} />
                <p className="mt-3 text-muted">Loading doctor details...</p>
            </div>
        );
    }

    if (!doctor && apiError) {
        return (
            <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                <AdminNavbar />
                <div style={{ paddingTop: "80px" }}></div>
                <div className="container py-5 text-center">
                    <Alert variant="danger">{apiError}</Alert>
                    <Button onClick={() => navigate('/admin/doctorList')} variant="primary">
                        Back to Doctors List
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <AdminNavbar />
            
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
                            disabled={submitting}
                        >
                            ← Back to Doctors
                        </Button>
                    </div>
                </div>

                {/* Success/Error Messages */}
                {apiSuccess && (
                    <Alert variant="success" className="mb-3">
                        {apiSuccess} 
                    </Alert>
                )}
                {apiError && !apiSuccess && (
                    <Alert variant="danger" className="mb-3">
                        {apiError}
                    </Alert>
                )}

                <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                    <Card.Body className="p-4">
                        <Form onSubmit={handleSubmit} noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Doctor Name *
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="doctorName"
                                            value={formData.doctorName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.doctorName}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.doctorName}
                                        </Form.Control.Feedback>
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
                                            isInvalid={!!errors.email}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Speciality *
                                        </Form.Label>
                                        <Form.Select
                                            name="speciality"
                                            value={formData.speciality}
                                            onChange={handleChange}
                                            isInvalid={!!errors.speciality}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            disabled={submitting}
                                        >
                                            <option value="">Select Speciality</option>
                                            {specialities.map(spec => (
                                                <option key={spec} value={spec}>{spec}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.speciality}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Location *
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            isInvalid={!!errors.location}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="City, State"
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.location}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Experience (Years) *
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            isInvalid={!!errors.experience}
                                            required
                                            min="0"
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="5"
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.experience}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Consultation Fee (₹) *
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="fees"
                                            value={formData.fees}
                                            onChange={handleChange}
                                            isInvalid={!!errors.fees}
                                            required
                                            min="0"
                                            step="10"
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            placeholder="500"
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fees}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            Start Time *
                                        </Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            isInvalid={!!errors.startTime}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.startTime}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Form.Group>
                                        <Form.Label className="fw-medium" style={{ color: '#2c3e50' }}>
                                            End Time *
                                        </Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                            isInvalid={!!errors.endTime}
                                            required
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px'
                                            }}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.endTime}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="d-flex gap-3 mt-4">
                                <Button
                                    type="submit"
                                    className="rounded-pill px-4 fw-medium d-flex align-items-center"
                                    style={{
                                        backgroundColor: '#48b575',
                                        color: 'white',
                                        border: 'none',
                                        minWidth: '120px'
                                    }}
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Doctor'
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline-secondary"
                                    className="rounded-pill px-4"
                                    onClick={() => navigate('/admin/doctorList')}
                                    disabled={submitting}
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