import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PublicLayout from "../../Layouts/PublicLayout";
import { Link } from "react-router-dom";

const Err = () => {
  const [stars, setStars] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    // Create 500 stars with random sizes, opacity, and positions
    const newStars = [];
    for (let i = 0; i < 500; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1, // Random size between 1px and 4px
        opacity: Math.random() * 0.6 + 0.3, // Random opacity between 0.3 and 1
        left: Math.random() * 100, // Random left position (percentage)
        top: Math.random() * 100, // Random top position (percentage)
        animationDelay: Math.random() * 5 + "s", // Random delay for animation
      });
    }
    setStars(newStars);

    // Create 2 planets with random animation
    const newPlanets = [
      {
        id: 1,
        size: 50, // Planet size (px)
        left: 30, // Planet position (percentage)
        top: 30,
        animationDuration: 15 + "s", // Planet rotation speed
        rotation: 0, // Initial rotation angle
      },
      {
        id: 2,
        size: 30, // Planet size (px)
        left: 70, // Planet position (percentage)
        top: 50,
        animationDuration: 20 + "s", // Planet rotation speed
        rotation: 0, // Initial rotation angle
      },
    ];
    setPlanets(newPlanets);
  }, []);

  return (
    <PublicLayout>
      <div style={styles.container}>
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              ...styles.star,
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animationDelay: star.animationDelay,
            }}
          />
        ))}

        {/* Moon */}
        <div style={styles.moon}></div>

        {/* Planets */}
        {planets.map((planet) => (
          <div
            key={planet.id}
            style={{
              ...styles.planet,
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              left: `${planet.left}%`,
              top: `${planet.top}%`,
              animationDuration: planet.animationDuration,
            }}
          >
            <div
              style={{
                ...styles.planetCore,
                transform: `rotate(${planet.rotation}deg)`,
              }}
            />
          </div>
        ))}

        {/* 404 Message */}
        <div style={styles.messageContainer} className="mt-4">
          <lord-icon
            src="https://cdn.lordicon.com/fttvwdlw.json"
            trigger="loop"
            stroke="bold"
            state="loop-roll"
            colors="primary:#FFFFFf,secondary:#FFA500"
            style={{ width: 50, height: 50 }}
          ></lord-icon>
          <h1 style={styles.header}>404 - Page Not Found</h1>
          <p style={styles.subHeader}>Looks like you're lost in space!</p>
          <p style={styles.suggestion}>
            Go back to &nbsp;
            <a
              href="/"
              style={{ backgroundColor: "transparent ", color: "orange" }}
            >
              Home
            </a>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    backgroundColor: "#0a0a0a", // Dark background for space
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
  },
  star: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "50%",
    animation: "moveStar 10s infinite linear",
  },
  moon: {
    position: "absolute",
    width: "100px",
    height: "100px",
    backgroundColor: "lightgray",
    borderRadius: "50%",
    top: "10%",
    left: "70%",
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
  },
  planet: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "#4B9CD3",
    animation: "rotatePlanet 20s infinite linear",
  },
  planetCore: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transformOrigin: "center",
    backgroundColor: "#2C6B92",
    width: "50%",
    height: "50%",
    borderRadius: "50%",
  },
  messageContainer: {
    position: "absolute",
    zIndex: 10,
    textAlign: "center",
    top: "50%",
    transform: "translateY(-50%)",
    padding: "0 20px", // Add padding for better layout on mobile
  },
  header: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  suggestion: {
    fontSize: "1.2rem",
  },
  link: {
    color: "#4B9CD3",
    textDecoration: "none",
  },

  // Responsive Styles
  "@media (max-width: 600px)": {
    header: {
      fontSize: "2rem", // Smaller font size for mobile
    },
    subHeader: {
      fontSize: "1.2rem",
    },
    suggestion: {
      fontSize: "1rem",
    },
    moon: {
      width: "70px", // Reduce size of moon for smaller screens
      height: "70px",
      top: "5%", // Adjust position
      left: "60%",
    },
    planet: {
      width: "40px", // Smaller planet size on mobile
      height: "40px",
    },
  },
};

export default Err;
