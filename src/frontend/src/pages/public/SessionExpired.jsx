import React from "react";
import PublicLayout from "../../Layouts/PublicLayout";
import { Button } from "@mui/material";

const SessionExpired = () => {
  return (
    <div>
      <PublicLayout>
        <div className="text-center ">
          <br />
          <br />
          <div className="container text-center mt-5 p-4 border rounded shadow-lg">
            <div className="alert alert-danger">
              <h4 className="alert-heading">Your Session Expired</h4>
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
      </PublicLayout>
    </div>
  );
};

export default SessionExpired;
