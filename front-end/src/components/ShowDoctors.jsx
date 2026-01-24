import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShowDoctors = () => {
    const navigate = useNavigate();

    const [doctors] = useState([
        {
            id: 1,
            name: "Dr. Aditi Sharma",
            specialization: "Cardiologist",
            clinic_name: "HeartCare Clinic",
            clinic_location: "Andheri East, Mumbai",
            consultation_fee: 800.0,
            available_days: "Mon, Wed, Fri",
            available_time: "10:00 AM - 1:00 PM",
            experience: "12 years",
            rating: 4.8,
            patients_count: 1250
        },
        {
            id: 2,
            name: "Dr. Rahul Mehta",
            specialization: "Dermatologist",
            clinic_name: "SkinGlow Center",
            clinic_location: "Kothrud, Pune",
            consultation_fee: 600.0,
            available_days: "Tue, Thu, Sat",
            available_time: "4:00 PM - 8:00 PM",
            experience: "8 years",
            rating: 4.6,
            patients_count: 890
        },
        {
            id: 3,
            name: "Dr. Priya Nair",
            specialization: "Pediatrician",
            clinic_name: "Happy Kids Clinic",
            clinic_location: "HSR Layout, Bengaluru",
            consultation_fee: 700.0,
            available_days: "Mon - Sat",
            available_time: "9:30 AM - 12:30 PM",
            experience: "10 years",
            rating: 4.9,
            patients_count: 2100
        },
        {
            id: 4,
            name: "Dr. Ankit Verma",
            specialization: "Orthopedics",
            clinic_name: "Bone & Joint Care",
            clinic_location: "Gurugram, Delhi NCR",
            consultation_fee: 900.0,
            available_days: "Mon, Tue, Thu, Fri",
            available_time: "11:00 AM - 4:00 PM",
            experience: "15 years",
            rating: 4.7,
            patients_count: 1850
        },
        {
            id: 5,
            name: "Dr. Sneha Patel",
            specialization: "Gynecologist",
            clinic_name: "Women's Wellness Center",
            clinic_location: "Thane, Mumbai",
            consultation_fee: 750.0,
            available_days: "Mon, Wed, Fri, Sat",
            available_time: "9:00 AM - 2:00 PM",
            experience: "9 years",
            rating: 4.8,
            patients_count: 1420
        },
        {
            id: 6,
            name: "Dr. Arjun Reddy",
            specialization: "Neurologist",
            clinic_name: "Neuro Care Hospital",
            clinic_location: "Jayanagar, Bengaluru",
            consultation_fee: 1200.0,
            available_days: "Tue, Thu, Sat",
            available_time: "3:00 PM - 7:00 PM",
            experience: "18 years",
            rating: 4.9,
            patients_count: 950
        }
    ]);

    // Extract unique specializations and locations for filters
    const allSpecializations = [...new Set(doctors.map(doc => doc.specialization))];
    const allLocations = [...new Set(doctors.map(doc => doc.clinic_location))];

    const [selectedSpecialization, setSelectedSpecialization] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter doctors based on selections
    const filteredDoctors = doctors.filter(doctor => {
        const matchesSpecialization = selectedSpecialization === 'All' || 
                                     doctor.specialization === selectedSpecialization;
        const matchesLocation = selectedLocation === 'All' || 
                               doctor.clinic_location === selectedLocation;
        const matchesSearch = searchTerm === '' || 
                             doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             doctor.clinic_name.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSpecialization && matchesLocation && matchesSearch;
    });

    const handleBookAppointment = (doctorId) => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("token") || localStorage.getItem("isAuthenticated");
        if (isLoggedIn) {
            navigate(`/book-appointment/${doctorId}`);
        } else {
            navigate("/login", { state: { from: `/book-appointment/${doctorId}` } });
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#48b575" }}>
                <div className="container">
                    <a className="navbar-brand fw-bold fs-4" href="/" style={{ color: "#ffffff" }}>
                        E-MED
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link fw-medium" href="/" style={{ color: "#e8f5e9" }}>
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium active" href="/doctors" style={{ color: "#ffffff", fontWeight: "600" }}>
                                    Doctors
                                </a>
                            </li>
                            
                        </ul>
                        <div className="d-flex">
                            <a href="/login" className="btn btn-outline-light rounded-pill px-4 me-2">
                                Login
                            </a>
                            <a href="/signup" className="btn btn-light rounded-pill px-4" style={{ color: "#48b575" }}>
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ paddingTop: "80px" }} className="min-vh-100 bg-light">
                <div className="container py-5">
                    {/* Header */}
                    <div className="text-center mb-5">
                        <h1 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>
                            Find Your Specialist
                        </h1>
                        <p className="text-muted mb-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
                            Browse through our network of certified medical professionals. Book appointments with top doctors in your area.
                        </p>
                    </div>

                    {/* Filters Section */}
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <label className="form-label fw-semibold mb-2">Search Doctors</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-search text-muted"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control border-start-0"
                                            placeholder="Search by name or clinic..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <label className="form-label fw-semibold mb-2">Specialization</label>
                                    <select
                                        className="form-select"
                                        value={selectedSpecialization}
                                        onChange={(e) => setSelectedSpecialization(e.target.value)}
                                    >
                                        <option value="All">All Specializations</option>
                                        {allSpecializations.map((spec, index) => (
                                            <option key={index} value={spec}>{spec}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <label className="form-label fw-semibold mb-2">Location</label>
                                    <select
                                        className="form-select"
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                    >
                                        <option value="All">All Locations</option>
                                        {allLocations.map((loc, index) => (
                                            <option key={index} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0" style={{ color: "#2c3e50" }}>
                            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Available
                        </h5>
                        <div className="text-muted">
                            <small>
                                Showing {filteredDoctors.length} of {doctors.length} doctors
                            </small>
                        </div>
                    </div>

                    {/* Doctors Grid */}
                    <div className="row g-4">
                        {filteredDoctors.length === 0 ? (
                            <div className="col-12 text-center py-5">
                                <div className="display-1 text-muted mb-3">
                                    <i className="bi bi-emoji-frown"></i>
                                </div>
                                <h4 className="mb-3">No doctors found</h4>
                                <p className="text-muted mb-4">
                                    Try adjusting your filters or search term
                                </p>
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => {
                                        setSelectedSpecialization('All');
                                        setSelectedLocation('All');
                                        setSearchTerm('');
                                    }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            filteredDoctors.map((doctor) => (
                                <div key={doctor.id} className="col-md-6 col-lg-4">
                                    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                                        <div className="card-body p-4">
                                            {/* Doctor Header */}
                                            <div className="d-flex align-items-start mb-3">
                                                <div className="flex-grow-1">
                                                    <h5 className="card-title fw-bold mb-1" style={{ color: '#2c3e50' }}>
                                                        {doctor.name}
                                                    </h5>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="badge rounded-pill" style={{ backgroundColor: '#48b575', color: 'white' }}>
                                                            {doctor.specialization}
                                                        </span>
                                                        <div className="d-flex align-items-center">
                                                            <i className="bi bi-star-fill text-warning me-1"></i>
                                                            <span className="fw-semibold">{doctor.rating}</span>
                                                            <small className="text-muted ms-1">({doctor.patients_count})</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Doctor Info */}
                                            <div className="mb-4">
                                                <div className="mb-3">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <i className="bi bi-building me-2" style={{ color: '#48b575' }}></i>
                                                        <span className="fw-medium">{doctor.clinic_name}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <i className="bi bi-geo-alt me-2" style={{ color: '#48b575' }}></i>
                                                        <span>{doctor.clinic_location}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <i className="bi bi-clock me-2" style={{ color: '#48b575' }}></i>
                                                        <span>{doctor.available_days} | {doctor.available_time}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <i className="bi bi-briefcase me-2" style={{ color: '#48b575' }}></i>
                                                        <span>{doctor.experience} experience</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Fee & Action */}
                                            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                                <div>
                                                    <div className="text-muted small">Consultation Fee</div>
                                                    <div className="h4 fw-bold mb-0" style={{ color: '#48b575' }}>
                                                        ₹{doctor.consultation_fee.toFixed(2)}
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn rounded-pill px-4 fw-medium"
                                                    style={{ 
                                                        backgroundColor: '#48b575', 
                                                        color: 'white',
                                                        border: 'none'
                                                    }}
                                                    onClick={() => handleBookAppointment(doctor.id)}
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* No Results Message */}
                    {filteredDoctors.length > 0 && filteredDoctors.length < doctors.length && (
                        <div className="text-center mt-5">
                            <button 
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    setSelectedSpecialization('All');
                                    setSelectedLocation('All');
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="fw-bold mb-3">E-MED</h5>
                            <p className="text-light mb-0">
                                Connecting patients with trusted healthcare professionals.
                            </p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p className="mb-0">
                                &copy; {new Date().getFullYear()} E-MED. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default ShowDoctors;