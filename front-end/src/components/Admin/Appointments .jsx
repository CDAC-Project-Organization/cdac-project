// src/components/admin/Appointments.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavBar';

const Appointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const dummyAppointments = [
        { id: 1, patientName: 'Alice Johnson', doctorName: 'Dr. John Smith', date: '2024-01-15', time: '10:00 AM', status: 'Scheduled', reason: 'Regular Checkup' },
        { id: 2, patientName: 'Bob Williams', doctorName: 'Dr. Sarah Johnson', date: '2024-01-15', time: '11:30 AM', status: 'Completed', reason: 'Follow-up' },
        { id: 3, patientName: 'Carol Brown', doctorName: 'Dr. Michael Chen', date: '2024-01-16', time: '02:00 PM', status: 'Scheduled', reason: 'Consultation' },
        { id: 4, patientName: 'David Miller', doctorName: 'Dr. Emily Davis', date: '2024-01-16', time: '09:00 AM', status: 'Cancelled', reason: 'Emergency' },
        { id: 5, patientName: 'Eva Garcia', doctorName: 'Dr. Robert Wilson', date: '2024-01-17', time: '03:30 PM', status: 'Scheduled', reason: 'Treatment' },
        { id: 6, patientName: 'Frank Thomas', doctorName: 'Dr. John Smith', date: '2024-01-17', time: '04:00 PM', status: 'Completed', reason: 'Routine Check' },
        { id: 7, patientName: 'Grace Lee', doctorName: 'Dr. Sarah Johnson', date: '2024-01-18', time: '10:30 AM', status: 'Scheduled', reason: 'Consultation' },
        { id: 8, patientName: 'Henry Clark', doctorName: 'Dr. Michael Chen', date: '2024-01-18', time: '01:00 PM', status: 'Completed', reason: 'Review' },
    ];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setAppointments(dummyAppointments);
            setLoading(false);
        }, 500);
    }, []);

    const handleDelete = (appointmentId, patientName) => {
        if (window.confirm(`Are you sure you want to delete appointment for ${patientName}?`)) {
            setAppointments(appointments.filter(app => app.id !== appointmentId));
            alert(`Appointment for ${patientName} has been deleted.`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Scheduled': return <Badge bg="primary">Scheduled</Badge>;
            case 'Completed': return <Badge bg="success">Completed</Badge>;
            case 'Cancelled': return <Badge bg="danger">Cancelled</Badge>;
            default: return <Badge bg="secondary">Pending</Badge>;
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
                            <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Appointments Management</h2>
                            <p className="text-muted mb-0">View and manage all patient appointments</p>
                        </div>
                       
                    </div>
                </div>

                {/* Stats Card */}
                <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: '16px' }}>
                    <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="fw-bold mb-1" style={{ color: '#2c3e50' }}>Total Appointments</h5>
                                <h3 className="mb-0" style={{ color: '#48b575' }}>{appointments.length}</h3>
                            </div>
                            <div className="d-flex gap-3">
                                <div className="text-center">
                                    <div className="fw-bold" style={{ color: '#48b575' }}>
                                        {appointments.filter(a => a.status === 'Scheduled').length}
                                    </div>
                                    <small className="text-muted">Scheduled</small>
                                </div>
                                <div className="text-center">
                                    <div className="fw-bold" style={{ color: '#28a745' }}>
                                        {appointments.filter(a => a.status === 'Completed').length}
                                    </div>
                                    <small className="text-muted">Completed</small>
                                </div>
                                <div className="text-center">
                                    <div className="fw-bold" style={{ color: '#dc3545' }}>
                                        {appointments.filter(a => a.status === 'Cancelled').length}
                                    </div>
                                    <small className="text-muted">Cancelled</small>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Appointments Table */}
                <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-0" style={{ color: '#2c3e50' }}>All Appointments</h5>
                        <small className="text-muted">
                            Showing {appointments.length} appointments
                        </small>
                    </Card.Header>
                    <Card.Body className="p-4">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" style={{ color: '#48b575' }}></div>
                                <p className="mt-3 text-muted">Loading appointments...</p>
                            </div>
                        ) : appointments.length === 0 ? (
                            <div className="text-center py-5">
                                <p className="text-muted">No appointments found</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <Table hover className="align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Patient Name</th>
                                            <th>Doctor</th>
                                            <th>Date & Time</th>
                                            <th>Status</th>
                                            <th>Reason</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map(appointment => (
                                            <tr key={appointment.id}>
                                                <td>#{appointment.id}</td>
                                                <td>
                                                    <div className="fw-semibold">{appointment.patientName}</div>
                                                </td>
                                                <td>
                                                    <div className="text-muted">{appointment.doctorName}</div>
                                                </td>
                                                <td>
                                                    <div className="fw-semibold">{appointment.date}</div>
                                                    <small className="text-muted">{appointment.time}</small>
                                                </td>
                                                <td>
                                                    {getStatusBadge(appointment.status)}
                                                </td>
                                                <td>
                                                    <small>{appointment.reason}</small>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline-danger"
                                                            onClick={() => handleDelete(appointment.id, appointment.patientName)}
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

export default Appointments;