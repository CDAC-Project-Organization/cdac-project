// src/components/admin/DoctorList.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

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
        console.log('Edit doctor:', doctorId);
        alert(`Edit functionality for doctor ID: ${doctorId}\n\nIn a real app, this would navigate to an edit form.`);
        // navigate(`/admin/editDoctor/${doctorId}`);
    };

    const handleDelete = (doctorId, doctorName) => {
        if (window.confirm(`Are you sure you want to delete ${doctorName}?`)) {
           
            setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
            alert(`Dr. ${doctorName} has been deleted from the list.\n\nNote: This is dummy data - no API call was made.`);
        }
    };

    const handleView = (doctorId, doctorName) => {
        alert(`Viewing details for: ${doctorName}\n\nThis would show a detailed profile in a real application.`);
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

    
    const reloadData = () => {
        setLoading(true);
        setTimeout(() => {
            setDoctors(dummyDoctors);
            setLoading(false);
            setSearch('');
            alert('Dummy data reloaded successfully!');
        }, 500); 
    };

    return (
        <div className="min-vh-100 bg-light">
            <AdminNavbar />
            <div style={{ paddingTop: "80px" }}></div>
            
            <div className="p-4">
                <div className="mb-4">
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 className="fw-bold">Doctor Management</h2>
                        <p className="text-muted mb-0">View and manage all registered doctors </p>
                    </div>
                    <div className="d-flex gap-2">
                       
                        <Button 
                            variant="primary"
                            onClick={() => navigate('/admin/addDoctor')}
                            size="lg"
                        >
                            + Add New Doctor
                        </Button>
                    </div>
                </div>
            </div>

           

            
            <Card className="shadow-sm mb-4">
                <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="fw-bold mb-1">Total Doctors</h5>
                            <h3 className="text-primary mb-0">{doctors.length}</h3>
                        </div>
                        
                        <div style={{ width: '400px' }}>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-search"></i>
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

            
            <Card className="shadow-sm">
                <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">Doctors List</h5>
                    <small className="text-muted">
                        {filteredDoctors.length} of {doctors.length} doctors shown
                    </small>
                </Card.Header>
                
                <Card.Body className="p-4">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div>
                            
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-person-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                            <p className="mt-3 text-muted">No doctors found matching "{search}"</p>
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => setSearch('')}
                                className="mt-2"
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
                                                        variant="outline-info" 
                                                        size="sm"
                                                        onClick={() => handleView(doctor.id, doctor.name)}
                                                        title="View Details"
                                                    >
                                                        <i className="bi bi-eye"></i> View
                                                    </Button>
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm"
                                                        onClick={() => handleEdit(doctor.id)}
                                                        title="Edit Doctor"
                                                    >
                                                        <i className="bi bi-pencil"></i> Edit
                                                    </Button>
                                                    <Button 
                                                        variant="outline-danger" 
                                                        size="sm"
                                                        onClick={() => handleDelete(doctor.id, doctor.name)}
                                                        title="Delete Doctor"
                                                    >
                                                        <i className="bi bi-trash"></i> Delete
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