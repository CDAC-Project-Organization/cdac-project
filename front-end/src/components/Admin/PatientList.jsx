import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavBar';

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
        // alert(`Edit patient: ${patientName} (ID: ${patientId})`);
        navigate(`/admin/editPatient/${patientId}`);
    };

    const handleDelete = (patientId, patientName) => {
        if (window.confirm(`Delete patient: ${patientName}?`)) {
            setPatients(patients.filter(p => p.id !== patientId));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.email.toLowerCase().includes(search.toLowerCase()) ||
        patient.phone.includes(search)
    );

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
                            <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Patient Management</h2>
                            <p className="text-muted mb-0">View and manage all registered patients</p>
                        </div>
                        <div className="d-flex gap-2">
                           
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: '16px' }}>
                    <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="fw-bold mb-1" style={{ color: '#2c3e50' }}>Total Patients</h5>
                                <h3 className="mb-0" style={{ color: '#48b575' }}>{patients.length}</h3>
                            </div>
                            <div style={{ width: '300px' }}>
                                <InputGroup>
                                    <InputGroup.Text style={{ backgroundColor: '#ffffff', border: '1px solid #e9ecef' }}>
                                        🔍
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search patients..."
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

                {/* Patients Table */}
                <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-0" style={{ color: '#2c3e50' }}>Patients List</h5>
                        <small className="text-muted">
                            {filteredPatients.length} of {patients.length} patients shown
                        </small>
                    </Card.Header>
                    <Card.Body className="p-4">
                        {filteredPatients.length === 0 ? (
                            <div className="text-center py-5">
                                <p className="text-muted">No patients found matching "{search}"</p>
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
                            <div className="table-responsive">
                                <Table hover className="align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Details</th>
                                            <th className="text-center">Actions</th>
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
                                                    <div className="text-muted">{patient.email}</div>
                                                    <small>{patient.phone}</small>
                                                </td>
                                                <td>
                                                    <small>
                                                        Joined: {new Date(patient.registration_date).toLocaleDateString()}
                                                    </small>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-2 justify-content-center">
                                                    
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline-danger"
                                                            onClick={() => handleDelete(patient.id, patient.name)}
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

export default PatientList;