import React from "react";
import TaskDashboard from "./TaskDashboard";
import PublicLayout from "../../../Layouts/PublicLayout";

const CompleteReport = () => {
  return (
    <div>
      <PublicLayout>
        <TaskDashboard />
      </PublicLayout>
    </div>
  );
};

export default CompleteReport;
