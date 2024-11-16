import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import privateAxios from "../../service/Interceptor";
import { doLogout } from "../../utility/AuthorizationUtils";
import { NavLink as Starlink, useNavigate } from "react-router-dom";

const Navbarr = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const [empid, setEmpid] = useState("");

  const toggleNavbar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const logoutt = async () => {
    try {
      const response = await privateAxios.post(
        "/logoff",
        { username: sessionStorage.getItem("username") },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200) {
        console.log("Logout successful:", response.data);
        setIsLoggedIn(false);
        doLogout();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const jwtTest = async () => {
    try {
      const response = await privateAxios.get(`/test`);
      if (response.status === 200) {
        console.log("JWT successful:", response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
    if (sessionStorage.getItem("role")) {
      setRole(sessionStorage.getItem("role"));
    }
    if (sessionStorage.getItem("userid")) {
      setEmpid(sessionStorage.getItem("userid"));
    }
  }, []);

  const [loading2, setLoading2] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setLoading2(true);
    const timer = setTimeout(() => {
      setLoading2(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location]);
  return (
    <>
      {loading2 ? "" : ""}
      <nav
        className="navbar navbar-expand-lg navbar-light px-1 "
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="#"
            style={{
              fontFamily: "'Comic Sans MS', Courier, monospace",
              fontSize: 25,
              color: "rgb(0, 69, 172)",
              fontWeight: 900,
            }} // Custom font family
          >
            Logify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="servicesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="servicesDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item "
                      style={{ backgroundColor: "transparent" }}
                      to="/assignedTasks"
                    >
                      Assigned Tasks
                    </Link>
                  </li>
                  {role === "5" && (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          style={{ backgroundColor: "transparent" }}
                          to="/taskByAdmin"
                        >
                          Task Assigner
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      className="dropdown-item"
                      style={{ backgroundColor: "transparent" }}
                      to="/taskByUser"
                    >
                      Add Task
                    </Link>
                  </li>
                  {role === "5" && (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          style={{ backgroundColor: "transparent" }}
                          to="/report"
                        >
                          full report
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          style={{ backgroundColor: "transparent" }}
                          to="/report2"
                        >
                          Short report
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      className="dropdown-item"
                      style={{ backgroundColor: "transparent" }}
                      to="/editTaskByUser"
                    >
                      Edit Tasks
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              {isLoggedIn ? (
                <li className="nav-item">
                  <a className="nav-link" to="#" onClick={logoutt}>
                    Logout
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {/* <li className="nav-item">
                <a className="nav-link" to="#" onClick={jwtTest}>
                  jwt tester
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbarr;
