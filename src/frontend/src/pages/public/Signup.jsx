import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, LinearProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../../Layouts/PublicLayout";
import { publicAxios } from "../../service/Interceptor";
import React from "react";

const Signup = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // Use useEffect to trigger the animation after the component mounts

  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Get the navigate function
  // Define the validation schema
  // Define the validation schema using Yup
  const phoneRegExp = /^[6789]\d{9}$/;

  const schema = yup.object().shape({
    user: yup
      .string()
      .required("Username Required")
      .test(
        "not-justin",
        "Name cannot be 'Justin'",
        (value) => value?.toLowerCase() !== "justin"
      )
      .matches(
        /^[A-Za-z]+$/,
        "Name must contain only letters (A-Z or a-z) and no spaces"
      ) // Only letters allowed
      .test("check-username", "Username already taken", async (value) => {
        if (!value) return true; // Skip validation if no value is entered
        try {
          const response = await publicAxios.get(`/auth/checkuser/${value}`);
          if (response.status == 200) {
            return false;
          }
          // User exists
        } catch (error) {
          console.log(error.response.data);
          return true;
        }
      }),
    empid: yup
      .string()
      .required("Employee id Required")
      .min(4, "Employee id should be at least 4 characters long")
      .max(4, "Employee id can be maximum 4 characters long"),
    password: yup
      .string()
      .required("Password Required")
      .matches(/^[^\s]*$/, "Password cannot contain spaces") // Regex to check for spaces
      .min(6, "Password length must be greater than or equal 6 characters")
      .max(8, "Password length can't be more than 8 characters"),
    passwordcheck: yup
      .string()
      .required("Required")
      .matches(/^[^\s]*$/, "Password cannot contain spaces") // Regex to check for spaces
      .oneOf([yup.ref("password")], "Passwords must match")
      .min(6, "Password length must be greater than or equal 6 characters")
      .max(8, "Password length can't be more than 8 characters"),
    email: yup
      .string()
      .required("Email Required")
      .email("Invalid email format"),
    phonenumber: yup
      .string()
      .required("Phone Number Required")
      .matches(
        phoneRegExp,
        "Phone number is not valid (must be 10 digits and start with 9, 8, 7, or 6)"
      ),

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

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    drawCaptcha();
  }, [captcha]);
  const onSubmit = async (data) => {
    // Remove the passwordcheck field from the data object
    const { passwordcheck, ...dataToSubmit } = data;

    console.log(dataToSubmit); // Log the data before submission

    setSubmitted(true); // Set form submission state
    try {
      const response = await publicAxios.post("/auth/signup", dataToSubmit, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSubmitted(false);
        toast.success("Signup successful");
        setTimeout(() => {
          navigate("/sucessfullSignup");
        }, 1000);
      }
    } catch (error) {
      setSubmitted(false);

      if (error.response) {
        toast.error("Unexpected error occurred");
        setMessage("Unexpected error occurred.");
      } else {
        toast.error("Network or server error");

        console.error("Network or server error:", error.message);
      }
    }
  };
  const handleReloadCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Find all elements with the class 'isvalid' and remove the class
    const elements = document.querySelectorAll(".is-valid");
    elements.forEach((element) => {
      element.classList.remove("is-valid");
    });
  }, []); // Empty dependency array ensures this runs only once after the initial render
  return (
    <PublicLayout>
      <>
        <div
          className="mb-5"
          style={{
            backgroundColor: "#f8f9fa",
            marginTop: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "450px",
              margin: "auto",
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            {submitted ? (
              <LinearProgress
                className="mb-3"
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
            <h2 className="text-center">Sign Up</h2>
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
                <label htmlFor="empid" className="form-label">
                  Employee id
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.empid ? "is-invalid" : "is-valid"
                  }`}
                  id="empid"
                  {...register("empid")}
                />
                {errors.empid && (
                  <p className="text-danger">{errors.empid.message}</p>
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

              <div className="mb-3">
                <label htmlFor="passwordcheck" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.passwordcheck ? "is-invalid" : "is-valid"
                  }`}
                  id="passwordcheck"
                  {...register("passwordcheck")}
                />
                {errors.passwordcheck && (
                  <p className="text-danger">{errors.passwordcheck.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${
                    errors.email ? "is-invalid" : "is-valid"
                  }`}
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phonenumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  className={`form-control ${
                    errors.phonenumber ? "is-invalid" : "is-valid"
                  }`}
                  id="phonenumber"
                  {...register("phonenumber")}
                />
                {errors.phonenumber && (
                  <p className="text-danger">{errors.phonenumber.message}</p>
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
                  className="border ms-2 btn "
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
                SignUp
              </Button>
            </form>
            <div className="text-center mt-3">
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </div>
        </div>
      </>
    </PublicLayout>
  );
};

export default Signup;
