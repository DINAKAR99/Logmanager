import { Button } from "@mui/material";
import React, { useEffect } from "react";
import PublicLayout from "../../Layouts/PublicLayout";

const SucessfullSignup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <PublicLayout>
      <div className=" ">
        <div
          className={`alert my-auto   alert-success text-center p-5 m-5 drop-from-top
      }`}
          style={{ fontSize: "24px", borderRadius: "10px" }}
        >
          {/* FontAwesome Check Circle Icon */}
          <lord-icon
            src="https://cdn.lordicon.com/hmzvkifi.json"
            trigger="loop"
            delay="1000"
            stroke="bold"
            state="hover-loading"
            colors="primary:#16c72e"
            style={{ width: 50, height: 50 }}
          ></lord-icon>
          <div>
            <strong>Signup Successful!</strong>
          </div>
          <p>Your account has been created successfully.</p>
          <div>
            <Button
              type="submit"
              href="court/#/login"
              variant="contained"
              className=" mt-3  "
            >
              Login
            </Button>
             
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default SucessfullSignup;
