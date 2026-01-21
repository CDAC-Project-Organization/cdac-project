import React from "react";
import Poster from "../assets/Poster.jpg";
import "../Styles/landing.css";

const LandingPage = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#top">
            E-MED
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#emedNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="emedNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Signup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
              
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="btn btn-outline-primary ms-lg-2" href="/doctors">
                  Show Doctors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div id="top" style={{ paddingTop: "70px" }}></div>


      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-5 fw-semibold mb-3">
                Book Doctor Appointments Easily
              </h1>
              <p className="text-muted mb-4">
                E-MED helps you find nearby doctors by specialization, view
                clinic details, and book appointments as per their schedule and
                availability.
              </p>
              <div className="d-flex gap-2">
                <a href="/login" className="btn btn-primary btn-lg">
                  Login
                </a>
                <a href="/signup" className="btn btn-outline-primary btn-lg">
                  Signup
                </a>
              </div>
            </div>

            <div className="col-md-6 text-center">
              <img
                src={Poster}
                alt="E-MED doctor consultation"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-5">
        <div className="container">
          <h2 className="mb-3">About Us</h2>
          <p className="text-muted">
            E-MED is an online doctor appointment management system that allows
            patients to search nearby doctors by specialization, check clinic
            timings and consultation fees, and book appointments conveniently.
          </p>
          <p className="text-muted mb-0">
            Our goal is to reduce waiting time, improve doctor discovery, and
            provide a seamless digital experience for both patients and doctors.
          </p>
        </div>
      </section>

  
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-3">Contact</h2>
          <p className="text-muted">
            Have questions or feedback about E-MED? Send a message and we will
            get back to you soon.
          </p>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="email">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="form-control"
                rows="4"
                placeholder="Write your message"
                required
              ></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
