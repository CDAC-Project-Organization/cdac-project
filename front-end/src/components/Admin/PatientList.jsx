
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    
    const dummyPatients = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '9876543210', gender: 'Female', age: 32, registration_date: '2024-01-20' },
        { id: 2, name: 'Bob Williams', email: 'bob@example.com', phone: '9876543211', gender: 'Male', age: 45, registration_date: '2024-02-15' },
        { id: 3, name: 'Carol Brown', email: 'carol@example.com', phone: '9876543212', gender: 'Female', age: 28, registration_date: '2024-03-10' },
        { id: 4, name: 'David Miller', email: 'david@example.com', phone: '9876543213', gender: 'Male', age: 38, registration_date: '2024-01-25' },
        { id: 5, name: 'Eva Garcia', email: 'eva@example.com', phone: '9876543214', gender: 'Female', age: 52, registration_date: '2024-02-28' },
    ];

    useEffect(() => {
       
        setPatients(dummyPatients);
    }, []);

    const handleEdit = (patientId, patientName) => {
        alert(`Edit patient: ${patientName} (ID: ${patientId})`);
        
    };

    const handleDelete = (patientId, patientName) => {
        if (window.confirm(`Delete patient: ${patientName}?`)) {
            setPatients(patients.filter(p => p.id !== patientId));
        }
    };

    const handleView = (patientId, patientName) => {
        alert(`View patient: ${patientName} (ID: ${patientId})`);
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.email.toLowerCase().includes(search.toLowerCase()) ||
        patient.phone.includes(search)
    );

    return (
        <div className="p-4">
            {/* Header */}
            <div className="mb-4">
                <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/admin')}
                    className="mb-3"
                >
                    ← Back to Dashboard
                </Button>
                
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3>Patient List</h3>
                        <p className="text-muted">Manage registered patients</p>
                    </div>
                    <Button 
                        variant="primary"
                        onClick={() => alert('Add patient form would open here')}
                    >
                        + Add Patient
                    </Button>
                </div>
            </div>

           
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>Total Patients</h5>
                            <h2 className="text-primary">{patients.length}</h2>
                        </div>
                        <div style={{ width: '300px' }}>
                            <InputGroup>
                                <InputGroup.Text>🔍</InputGroup.Text>
                                <Form.Control
                                    placeholder="Search patients..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            
            <Card className="shadow-sm">
                <Card.Body className="p-0">
                    {filteredPatients.length === 0 ? (
                        <div className="text-center py-5">
                            <p>No patients found</p>
                            {search && (
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => setSearch('')}
                                >
                                    Clear Search
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Table hover className="mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map(patient => (
                                    <tr key={patient.id}>
                                        <td>#{patient.id}</td>
                                        <td>
                                            <div className="fw-semibold">{patient.name}</div>
                                            <small className="text-muted">{patient.gender}, {patient.age}y</small>
                                        </td>
                                        <td>
                                            <div>{patient.email}</div>
                                            <small>{patient.phone}</small>
                                        </td>
                                        <td>
                                            <small>
                                                Joined: {new Date(patient.registration_date).toLocaleDateString()}
                                            </small>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline-primary"
                                                    onClick={() => handleView(patient.id, patient.name)}
                                                >
                                                    View
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline-warning"
                                                    onClick={() => handleEdit(patient.id, patient.name)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline-danger"
                                                    onClick={() => handleDelete(patient.id, patient.name)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default PatientList;