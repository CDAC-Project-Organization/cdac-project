import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DoctorNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
                    href="/doctor" 
                    className="fw-bold fs-4" 
                    style={{ color: "#ffffff" }}
                >
                    E-MED Doctor
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="doctorNavbar" />
                
                <Navbar.Collapse id="doctorNavbar">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link 
                            href="/doctor" 
                            className="fw-medium" 
                            style={{ color: "#e8f5e9" }}
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link 
                            href="/doctor/doctorEdit" 
                            className="fw-medium" 
                            style={{ color: "#e8f5e9" }}
                        >
                            Edit Profile
                        </Nav.Link>
                    </Nav>

                    <button
                        className="btn btn-light rounded-pill px-4 ms-lg-2 fw-medium"
                        onClick={handleLogout}
                        style={{ color: "#48b575" }}
                    >
                        Logout
                    </button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DoctorNavbar;