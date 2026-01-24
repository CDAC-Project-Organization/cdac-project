// src/components/admin/DoctorList.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavBar';

const DoctorList = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    
    const dummyDoctors = [
        { id: 1, name: 'Dr. John Smith', email: 'john.smith@emed.com', specialization: 'Cardiology', status: 'active', phone: '+1-555-0101', experience: '12 years', consultation_fee: '$150' },
        { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@emed.com', specialization: 'Dermatology', status: 'active', phone: '+1-555-0102', experience: '8 years', consultation_fee: '$120' },
        { id: 3, name: 'Dr. Michael Chen', email: 'michael.chen@emed.com', specialization: 'Neurology', status: 'active', phone: '+1-555-0103', experience: '15 years', consultation_fee: '$180' },
        { id: 4, name: 'Dr. Emily Davis', email: 'emily.davis@emed.com', specialization: 'Pediatrics', status: 'pending', phone: '+1-555-0104', experience: '6 years', consultation_fee: '$100' },
        { id: 5, name: 'Dr. Robert Wilson', email: 'robert.wilson@emed.com', specialization: 'Orthopedics', status: 'active', phone: '+1-555-0105', experience: '20 years', consultation_fee: '$200' },
    ];

    useEffect(() => {
        setDoctors(dummyDoctors);
        setLoading(false);
    }, []);

    const handleEdit = (doctorId) => {
        navigate(`/admin/editDoctor/${doctorId}`);
    };

    const handleDelete = (doctorId, doctorName) => {
        if (window.confirm(`Are you sure you want to delete ${doctorName}?`)) {
            setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
            alert(`Dr. ${doctorName} has been deleted from the list.`);
        }
    };

   

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.email.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusBadge = (status) => {
        switch(status) {
            case 'active': return <Badge bg="success">Active</Badge>;
            case 'pending': return <Badge bg="warning">Pending</Badge>;
            default: return <Badge bg="secondary">Inactive</Badge>;
        }
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Navbar */}
            <AdminNavbar/>

            <div style={{ paddingTop: "80px" }}></div>

            <div className="container py-4">
                {/* Page Header */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Doctor Management</h2>
                            <p className="text-muted mb-0">View and manage all registered doctors</p>
                        </div>
                        <div className="d-flex gap-2">
                            <Button
                                onClick={() => navigate('/admin/addDoctor')}
                                className="rounded-pill px-4 fw-medium"
                                style={{ 
                                    backgroundColor: '#48b575', 
                                    color: 'white', 
                                    border: 'none' 
                                }}
                            >
                                + Add New Doctor
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: '16px' }}>
                    <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="fw-bold mb-1" style={{ color: '#2c3e50' }}>Total Doctors</h5>
                                <h3 className="mb-0" style={{ color: '#48b575' }}>{doctors.length}</h3>
                            </div>
                            
                            <div style={{ width: '400px' }}>
                                <InputGroup>
                                    <InputGroup.Text style={{ backgroundColor: '#ffffff', border: '1px solid #e9ecef' }}>
                                        🔍
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search by name, email, or specialization..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <Button 
                                            variant="outline-secondary"
                                            onClick={() => setSearch('')}
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </InputGroup>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Doctors Table */}
                <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-0" style={{ color: '#2c3e50' }}>Doctors List</h5>
                        <small className="text-muted">
                            {filteredDoctors.length} of {doctors.length} doctors shown
                        </small>
                    </Card.Header>
                    
                    <Card.Body className="p-4">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" style={{ color: '#48b575' }}></div>
                                <p className="mt-3 text-muted">Loading doctors...</p>
                            </div>
                        ) : filteredDoctors.length === 0 ? (
                            <div className="text-center py-5">
                                <p className="mt-3 text-muted">No doctors found matching "{search}"</p>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => setSearch('')}
                                >
                                    Clear Search
                                </Button>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <Table hover className="align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Doctor Name</th>
                                            <th>Email</th>
                                            <th>Specialization</th>
                                            <th>Status</th>
                                            <th>Experience</th>
                                            <th>Fee</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDoctors.map(doctor => (
                                            <tr key={doctor.id}>
                                                <td>
                                                    <div className="fw-semibold">#{doctor.id}</div>
                                                </td>
                                                <td>
                                                    <div className="fw-semibold">{doctor.name}</div>
                                                    <small className="text-muted">{doctor.phone}</small>
                                                </td>
                                                <td>
                                                    <div className="text-muted">{doctor.email}</div>
                                                </td>
                                                <td>
                                                    <Badge bg="info" className="fw-normal">
                                                        {doctor.specialization}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    {getStatusBadge(doctor.status)}
                                                </td>
                                                <td>
                                                    <small>{doctor.experience}</small>
                                                </td>
                                                <td>
                                                    <small className="fw-bold">{doctor.consultation_fee}</small>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <Button 
                                                            variant="outline-primary" 
                                                            size="sm"
                                                            onClick={() => handleEdit(doctor.id)}
                                                            className="rounded-pill"
                                                            style={{ borderColor: '#48b575', color: '#48b575' }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => handleDelete(doctor.id, doctor.name)}
                                                            className="rounded-pill"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default DoctorList;