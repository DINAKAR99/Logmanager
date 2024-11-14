import React, { useEffect, useState } from "react";
import { publicAxios } from "../../../service/Interceptor";
import PublicLayout from "../../../Layouts/PublicLayout";
import TaskDashboard from "./TaskDashboard";

const DevDashboard = () => {
  const [tasks, setTasks] = useState([]);
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
  const [rangeTasks, setRangeTasks] = useState([]);
  const [memberId, setMemberId] = useState("");

  const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
  const [fromDate, setFromDate] = useState(today); // Set default "fromDate" to today
  const [toDate, setToDate] = useState(today); // Set default "toDate" to today
  useEffect(() => {
    // Fetch today's tasks by default on first render
    const empid = sessionStorage.getItem("empid");
    console.log(empid);

    setMemberId(empid);
    fetchTodayTasks(empid);
  }, []);

  const fetchTasksByDateRange = async () => {
    if (!fromDate || !toDate) {
      console.error("Both dates must be selected.");
      return;
    }

    // Clear the previous tasks to avoid confusion
    setRangeTasks([]);

    try {
      //also send userid
      const response = await publicAxios.post("/public/api/tasks/range", {
        fromDate,
        toDate,
        empid: memberId,
      });
      setRangeTasks(response.data); // Store the tasks for the selected date range
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchTodayTasks = async (empid) => {
    try {
      //send user id
      const response = await publicAxios.post(
        `/public/api/tasks/today?empid=${empid}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching today's tasks:", error);
    }
  };

  return (
    <PublicLayout>
      {/* Only render TaskDashboard once memberId is available */}
      {memberId && <TaskDashboard empId={memberId} />}
    </PublicLayout>
  );
};

export default DevDashboard;
