import React, { useEffect } from "react";
import PublicLayout from "../../Layouts/PublicLayout";
import toast from "react-hot-toast";

const Protected = () => {
  useEffect(() => {
    toast.success("Successfully Loggedin !");
  }, []);
  return (
    <PublicLayout>
      <div className="text-center ">
        <br />
        <br />
        <h4>YOU ARE ACCESSING PROTECTED CONTENT </h4>
      </div>
    </PublicLayout>
  );
};

export default Protected;
