import React, { useState, useEffect } from "react";
import { Table, Button, Card, Form, InputGroup } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const dummyPatients = [
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit.sharma@gmail.com",
      phone: "9876543210",
      gender: "Male",
      age: 34,
      registration_date: "2024-01-20",
    },
    {
      id: 2,
      name: "Priya Patil",
      email: "priya.patil@gmail.com",
      phone: "9123456789",
      gender: "Female",
      age: 29,
      registration_date: "2024-02-15",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul.verma@gmail.com",
      phone: "9988776655",
      gender: "Male",
      age: 41,
      registration_date: "2024-03-10",
    },
    {
      id: 4,
      name: "Sneha Kulkarni",
      email: "sneha.kulkarni@gmail.com",
      phone: "9090909090",
      gender: "Female",
      age: 36,
      registration_date: "2024-01-25",
    },
    {
      id: 5,
      name: "Vikram Deshmukh",
      email: "vikram.deshmukh@gmail.com",
      phone: "9345678123",
      gender: "Male",
      age: 52,
      registration_date: "2024-02-28",
    },
  ];

  useEffect(() => {
    setPatients(dummyPatients);
  }, []);

  const handleEdit = (id, name) => {
    alert(`Edit patient: ${name} (ID: ${id})`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete patient: ${name}?`)) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  const handleView = (id, name) => {
    alert(`View patient: ${name} (ID: ${id})`);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search),
  );

  return (
    <div className="min-vh-100 bg-light">
      <AdminNavbar />
      <div style={{ paddingTop: "80px" }} />

      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3>Patient List</h3>
            <p className="text-muted">Manage registered patients</p>
          </div>
          <Button
            variant="primary"
            onClick={() => alert("Add patient form would open here")}
          >
            + Add Patient
          </Button>
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
