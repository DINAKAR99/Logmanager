import React, { useEffect } from "react";
import PublicLayout from "../../Layouts/PublicLayout";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <PublicLayout>
      <div className="container mt-5">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={"/"}>
            Home
          </Link>
          <Typography sx={{ color: "text.primary" }}>About</Typography>
        </Breadcrumbs>

        <h1 className="text-center mb-4">About Us</h1>
        <div
          className="p-4 mb-5 rounded shadow"
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            position: "relative",
          }}
        >
          <h2 className="text-center mb-3">Who We Are</h2>
          <p className="text-justify" style={{ fontSize: "1.1rem" }}>
            At MyApp, we are a passionate team of innovators committed to
            transforming the business landscape through technology. Founded in
            2024, our journey began with a vision to provide scalable and
            efficient solutions tailored to our clients’ unique needs. With
            years of experience and a deep understanding of various industries,
            we strive to deliver not just products, but comprehensive solutions
            that foster growth and success. Our mission is to empower businesses
            with the tools they need to thrive in a competitive environment. As
            we continue to evolve, we remain dedicated to our core values of
            integrity, excellence, and customer satisfaction.
          </p>
        </div>

        <div className="text-center mb-5">
          <h2>Our Mission</h2>
          <p>
            To revolutionize the way businesses operate by providing innovative
            solutions that drive efficiency and success.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default About;
