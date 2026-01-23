import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
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
                        
                    </Nav>

                    <Nav>
                        <NavDropdown 
                            title="Profile" 
                            id="doctorProfileDropdown"
                            className="fw-medium"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item onClick={() => navigate("/doctor/doctorEdit")}>
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

export default DoctorNavbar;
