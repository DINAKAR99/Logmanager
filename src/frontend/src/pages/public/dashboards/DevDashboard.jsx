import React, { useEffect, useState } from "react";
import PublicLayout from "../../../Layouts/PublicLayout";
import TaskDashboard from "./TaskDashboard";
import { decrypt } from "../../../utility/EncrDecr";

const DevDashboard = () => {
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    const empid = JSON.parse(decrypt(sessionStorage.getItem("empid")));
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
