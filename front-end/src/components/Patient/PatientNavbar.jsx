import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PatientNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
        <Navbar 
            expand="lg" 
            fixed="top" 
            style={{ backgroundColor: "#48b575" }}
            className="navbar-dark"
        >
            <Container>
                <Navbar.Brand 
                    href="/patient" 
                    className="fw-bold fs-4" 
                    style={{ color: "#ffffff" }}
                >
                    E-MED Patient
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="patientNavbar" />
                
                <Navbar.Collapse id="patientNavbar">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link 
                            href="/patient" 
                            className="fw-medium" 
                            style={{ color: "#e8f5e9" }}
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link 
                            href="/patient/FeedbackPage" 
                            className="fw-medium" 
                            style={{ color: "#e8f5e9" }}
                        >
                            Feedback
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        <NavDropdown 
                            title="Profile" 
                            id="patientProfileDropdown"
                            className="fw-medium"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item onClick={() => navigate("/patient/EditPatient")}>
                                Edit Profile
                            </NavDropdown.Item>
                            
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default PatientNavbar;
