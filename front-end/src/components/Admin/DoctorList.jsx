// src/components/admin/DoctorList.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Card, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const dummyDoctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@emed.com",
      specialization: "Cardiology",
      status: "active",
      phone: "+1-555-0101",
      experience: "12 years",
      consultation_fee: "$150",
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@emed.com",
      specialization: "Dermatology",
      status: "active",
      phone: "+1-555-0102",
      experience: "8 years",
      consultation_fee: "$120",
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      email: "michael.chen@emed.com",
      specialization: "Neurology",
      status: "active",
      phone: "+1-555-0103",
      experience: "15 years",
      consultation_fee: "$180",
    },
    {
      id: 4,
      name: "Dr. Emily Davis",
      email: "emily.davis@emed.com",
      specialization: "Pediatrics",
      status: "pending",
      phone: "+1-555-0104",
      experience: "6 years",
      consultation_fee: "$100",
    },
    {
      id: 5,
      name: "Dr. Robert Wilson",
      email: "robert.wilson@emed.com",
      specialization: "Orthopedics",
      status: "active",
      phone: "+1-555-0105",
      experience: "20 years",
      consultation_fee: "$200",
    },
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
      setDoctors(doctors.filter((d) => d.id !== doctorId));
      alert(`Dr. ${doctorName} has been deleted.`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Active</Badge>;
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      default:
        return <Badge bg="secondary">Inactive</Badge>;
    }
  };

  return (
    <div
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#48b575" }}
      >
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/admin">
            E-MED Admin
          </a>

          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/admin">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/doctorList">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/patientList">
                  Patients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/addDoctor">
                  Add Doctor
                </a>
              </li>
            </ul>
            <Button variant="light" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: "80px" }} />

      <div className="container py-4">
        <Card className="shadow-sm border-0">
          <Card.Body>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.specialization}</td>
                      <td>{getStatusBadge(d.status)}</td>
                      <td>
                        <Button size="sm" onClick={() => handleEdit(d.id)}>
                          Edit
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(d.id, d.name)}
                        >
                          Delete
                        </Button>
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

export default DoctorList;
