import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, LinearProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import PublicLayout from "../../Layouts/PublicLayout";
import { publicAxios } from "../../service/Interceptor";
import { doLogin } from "../../utility/AuthorizationUtils";
import Log from "./Log";

const checkUserExists = async (name) => {
  try {
    const response = await publicAxios.get(`api/${name}`);
    if (!response.ok) {
      return false; // User not found
    }
    return true; // User exists
  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error("Error checking user:", error.message);
    return false; // Consider this as a failed validation
  }
};

const Login = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Get the navigate function
  // Define the validation schema

  const schema = yup.object().shape({
    user: yup
      .string()
      .required("Username Required")
      .test(
        "not-justin",
        "Name cannot be 'Justin'",
        (value) => value?.toLowerCase() !== "justin"
      )
      .test("check-username", "User not found", async (value) => {
        if (!value) return true; // Skip validation if no value is entered
        try {
          const response = await publicAxios.get(
            `/public/auth/checkuser/${value}`
          );
          if (!response.status == 200) {
            console.log("false" + response.status);
            return false;
          }
          return true; // User exists
        } catch (error) {
          console.log(error.response.data);
          return false; // Consider this as a failed validation
        }
      }),
    password: yup.string().required("Password Required"),
    // .min(6, "Password length must be greater than or equal 6 characters")
    // .max(8, "Password length can't be more than 8 characters"),
    captcha: yup
      .string()
      .required("Captcha Required")
      .test(
        "match-captcha",
        "Incorrect captcha",
        (captchaa) => captchaa === captcha
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function generateCaptcha() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }
  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear the previous canvas content
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the base solid background color
    context.fillStyle = "darkgray"; // Background color
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add wavy lines to create the scratch card effect
    for (let i = 0; i < 12; i++) {
      context.beginPath();
      context.strokeStyle = "rgba(255, 255, 255, 0.4)"; // Light-colored wavy line
      context.lineWidth = getRandomInt(1, 3); // Random line width for variety

      let startY = getRandomInt(0, canvas.height); // Random y starting point
      context.moveTo(0, startY);

      // Draw a sinusoidal wave pattern across the width of the canvas
      for (let x = 0; x < canvas.width; x += 5) {
        const amplitude = getRandomInt(5, 15); // Wave amplitude
        const frequency = getRandomInt(20, 50); // Wave frequency
        const y = startY + Math.sin((x / frequency) * Math.PI * 2) * amplitude;
        context.lineTo(x, y);
      }
      context.stroke();
    }

    // Draw CAPTCHA text with shadow
    context.font = "30px Arial";
    context.fillStyle = "black"; // Text color

    // Set shadow properties
    context.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color
    context.shadowOffsetX = 2; // Horizontal shadow offset
    context.shadowOffsetY = 6; // Vertical shadow offset
    context.shadowBlur = 0; // Shadow blur radius

    // Draw each character individually with a random angle
    const captchaLength = captcha.length;
    const startX = 90; // Starting X position for the text
    const startY = 35; // Starting Y position for the text
    const letterSpacing = 25; // Increase space between letters for better visibility

    for (let i = 0; i < captchaLength; i++) {
      // Save the current context state
      context.save();

      // Calculate the angle for this letter
      const angle = getRandomInt(-20, 20) * (Math.PI / 180); // Random angle between -20 and 20 degrees

      // Translate to the position where the letter will be drawn
      context.translate(startX + i * letterSpacing, startY);
      // Rotate the context for slanting
      context.rotate(angle);

      // Draw the character at (0, 0) since we've already translated
      context.fillText(captcha[i], 0, 0);

      // Restore the context to its original state
      context.restore();
    }
  };

  // Utility functions for random values
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    drawCaptcha();
  }, [captcha]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Find all elements with the class 'isvalid' and remove the class
    const elements = document.querySelectorAll(".is-valid");
    elements.forEach((element) => {
      element.classList.remove("is-valid");
    });
  }, []); // Empty dependency array ensures this runs only once after the initial render
  const handleReloadCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const onSubmit = async (data) => {
    console.log(data);

    setSubmitted(true); // Set form submission state
    try {
      const response = await publicAxios.post("/public/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSubmitted(false);
        console.log("Login successful:", response.data.jwttoken);
        doLogin(response);
        console.log(response.data.role);

        if (response.data.role === 1) {
          navigate("/assignedTasks");
        }
        // navigate("/protected"); // Handle successful login, e.g., redirect or store token
      }
    } catch (error) {
      setSubmitted(false);

      if (error.response) {
        if (error.response.status === 401) {
          console.error("Incorrect login attempt:", error.response.data);
          setMessage(error.response.data.message);
          // Handle incorrect login, show a message to the user
        }
        if (error.response.status === 400) {
          console.error("DUAL login attempt:", error.response.data.name);
          setMessage("Dual login attempt failed");
          sessionStorage.setItem(
            "dual_login_username",
            error.response.data.name
          );
          navigate("/dualogin");
          // Handle incorrect login, show a message to the user
        } else if (error.response.status === 423) {
          console.error("Account locked:", error.response.data.message);
          setMessage(error.response.data.message);
        } else if (error.response.status === 409) {
          console.error("DUAL locked:", error.response.data.message);
          navigate("/dualogin");
        } else {
          toast.error("Unexpected error occurred");
          setMessage("Unexpected error occurred.");
        }
      } else {
        console.error("Network or server error:", error.message);
      }
    }
  };

  return (
    <PublicLayout>
      <div
        className="mb-5"
        style={{
          maxWidth: "450px",
          margin: "auto",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          marginTop: "15px",
        }}
      >
        {submitted ? (
          <LinearProgress
            sx={{
              "& .MuiLinearProgress-bar": {
                // Progress bar color
                animationDuration: "3s", // Control speed by adjusting duration
              },
            }}
          />
        ) : (
          ""
        )}
        <div className="text-center  ">
          <lord-icon
            src="https://cdn.lordicon.com/kdduutaw.json"
            trigger="loop"
            delay="2000"
            stroke="midium"
            state="hover-looking-around"
            colors="primary:#242424,secondary:#545454"
            style={{ height: 50, width: 50 }}
          ></lord-icon>
        </div>
        <h2 className="text-center mt-2 ">Login</h2>
        {message && (
          <div className="message-box text-center text-danger     ">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">
              Username
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.user ? "is-invalid" : "is-valid"
              }`}
              id="user"
              {...register("user")}
            />
            {errors.user && (
              <p className="text-danger">{errors.user.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.password ? "is-invalid" : "is-valid"
              }`}
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-3 d-flex">
            <canvas
              ref={canvasRef}
              height={50}
              className="w-75"
              style={{
                border: "1px solid #ccc",
                backgroundColor: "darkgray",
                borderRadius: 5,
              }}
            />
            <button
              type="button"
              className="border    btn "
              style={{
                backgroundColor: "transparent",
                border: "1px solid #ccc !important",
              }}
              onClick={handleReloadCaptcha}
            >
              <i className="fas fa-sync text-dark fa-xl"></i>
            </button>
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-center mt-3">
              <input
                type="text"
                className={`form-control ${
                  errors.captcha ? "is-invalid" : "is-valid"
                }`}
                id="captcha"
                {...register("captcha")}
              />
            </div>
            {errors.captcha && (
              <p className="text-danger">{errors.captcha.message}</p>
            )}
          </div>
          <Button type="submit" variant="contained" className=" w-100 mt-3">
            Login
          </Button>
        </form>
        <div className="text-center mt-3">
          <a href="#">Forgot your password?</a>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
