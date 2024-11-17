import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../../Layouts/PublicLayout";
import privateAxios, { publicAxios } from "../../service/Interceptor";
import { Button } from "@mui/material";

const Dualogin = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [loggedOut, SetLoggedOut] = useState(false); //  )
  const onSubmit = async () => {
    if (!sessionStorage.getItem("dual_login_username")) {
      return false; //
    }
    try {
      const response = await publicAxios.post(
        "/public/dualsessionlogin",
        { user: sessionStorage.getItem("dual_login_username") },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200) {
        SetLoggedOut(true);
        // console.log("Login successful:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <PublicLayout>
      {loggedOut ? (
        <div className="text-center drop-from-top ">
          <br />
          <br />
          <div className="container text-center mt-5 p-4 border rounded shadow-lg">
            <div className="alert alert-success">
              <h4 className="alert-heading">
                Successfully Logged out Another Session
              </h4>
              <p className="mb-0">Please log in again</p>
              <Button
                type="submit"
                variant="contained"
                className=" w-25 mt-3"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
            <div className="my-4">
              <i
                className="bi bi-lock-fill"
                style={{ fontSize: "50px", color: "#dc3545" }}
              ></i>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        <div class="container text-center mt-5 p-4 border rounded shadow-lg bg-light bg-light-subtle   ">
          <div class="display-4 text-black mb-3 ">Dual-Login</div>
          <div class="alert alert-warning alert-dismissible fade show ">
            <strong>Warning!</strong> You are logged in somewhere else. please
            logout another session
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
          <div class="mb-4">
            <Button
              type="submit"
              variant="contained"
              className=" w-25 p-2 mt-3"
              onClick={onSubmit}
            >
              <i class="fas fa-sign-in-alt me-2"></i> Logout
            </Button>
          </div>
          <h6 class="text-muted animate__animated animate__fadeInUp">
            This action will log out the other existing session.
          </h6>
        </div>
      )}
    </PublicLayout>
  );
};

export default Dualogin;
