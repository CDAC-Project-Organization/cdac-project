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
        // alert(`Edit patient: ${patientName} (ID: ${patientId})`);
        navigate(`/admin/editPatient/${patientId}`);
    };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete patient: ${name}?`)) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search),
  );

    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#48b575" }}>
                <div className="container">
                    <a className="navbar-brand fw-bold fs-4" href="/admin" style={{ color: "#ffffff" }}>
                        E-MED Admin
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#adminNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="adminNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin" style={{ color: "#e8f5e9" }}>
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin/doctorList" style={{ color: "#e8f5e9" }}>
                                    Doctors
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin/patientList" style={{ color: "#e8f5e9" }}>
                                    Patients
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin/addDoctor" style={{ color: "#e8f5e9" }}>
                                    Add Doctor
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/admin/appointments" style={{ color: "#e8f5e9" }}>
                                    All Appointment
                                </a>
                            </li>
                        </ul>
                        <button
                            className="btn btn-light rounded-pill px-4 ms-lg-2 fw-medium"
                            onClick={handleLogout}
                            style={{ color: "#48b575" }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

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

        <Card className="shadow-sm mb-4">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h5>Total Patients</h5>
              <h2 className="text-primary">{patients.length}</h2>
            </div>
            <div style={{ width: "300px" }}>
              <InputGroup>
                <InputGroup.Text>🔍</InputGroup.Text>
                <Form.Control
                  placeholder="Search patients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
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
                    onClick={() => setSearch("")}
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
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>#{patient.id}</td>
                      <td>
                        <div className="fw-semibold">{patient.name}</div>
                        <small className="text-muted">
                          {patient.gender}, {patient.age}y
                        </small>
                      </td>
                      <td>
                        <div>{patient.email}</div>
                        <small>{patient.phone}</small>
                      </td>
                      <td>
                        <small>
                          Joined:{" "}
                          {new Date(
                            patient.registration_date,
                          ).toLocaleDateString("en-IN")}
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
                            onClick={() =>
                              handleDelete(patient.id, patient.name)
                            }
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
    </div>
  );
};

export default PatientList;
