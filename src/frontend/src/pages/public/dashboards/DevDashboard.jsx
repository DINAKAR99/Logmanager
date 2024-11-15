import React, { useEffect, useState } from "react";
import PublicLayout from "../../../Layouts/PublicLayout";
import TaskDashboard from "./TaskDashboard";

const DevDashboard = () => {
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    const empid = sessionStorage.getItem("empid");
    setMemberId(empid);
  }, []);

  return (
    <PublicLayout>
      {/* Only render TaskDashboard once memberId is available */}
      {memberId && <TaskDashboard empId={memberId} />}
    </PublicLayout>
  );
};

export default DevDashboard;
