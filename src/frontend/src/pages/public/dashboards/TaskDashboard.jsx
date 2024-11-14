import React, { useEffect, useState } from "react";
import { publicAxios } from "../../../service/Interceptor"; // Assuming you're using axios for the API call
import PublicLayout from "../../../Layouts/PublicLayout";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";

const TaskDashboard = ({ empId = null }) => {
  const [tasks, setTasks] = useState([]);
  const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
  const [fromDate, setFromDate] = useState(today); // Set default "fromDate" to today
  const [toDate, setToDate] = useState(today); // Set default "toDate" to today

  // Function to fetch tasks based on selected date range and optional empId
  const fetchTasksByDateRange = async () => {
    try {
      let url = ""; // Define the URL based on whether empId is provided or not

      // Use different URLs depending on whether empId is provided or not
      if (empId) {
        url = `/public/api/tasks/range/`; // Use empId-specific URL
      } else {
        url = `/public/api/tasks/range/all`; // Use default URL
      }

      // Prepare the request payload
      const requestData = {
        fromDate: fromDate,
        toDate: toDate,
      };

      // If empId is provided, include it in the request body
      if (empId) {
        requestData.empid = empId;
      }

      // Make the API call with the constructed URL and requestData
      const response = await publicAxios.post(url, requestData);

      setTasks(response.data); // Store tasks in state
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Export table data to Excel
  const exportToExcel = () => {
    const table = document.getElementById("myTable");

    const worksheet = XLSX.utils.table_to_sheet(table);

    const headerRow = worksheet["!rows"] || [];

    for (let col = 0; col < 17; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!worksheet[cellRef]) {
        worksheet[cellRef] = {};
      }
      worksheet[cellRef].s = { font: { bold: true } };
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Worklog_report.xlsx");
  };

  useEffect(() => {
    // Fetch tasks whenever the date range or empId changes
    fetchTasksByDateRange();
  }, [fromDate, toDate, empId]);

  return (
    <>
      <div style={{ marginBottom: "20px" }} className="m-5">
        {/* Date range selectors */}
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          To Date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>

        {/* Button to fetch tasks by date range */}
        <Button
          variant="contained"
          className="ms-2"
          onClick={fetchTasksByDateRange}
          style={{ marginLeft: "20px" }}
        >
          Fetch Tasks
        </Button>

        {/* Export to Excel button */}
        <Button
          variant="contained"
          className="ms-2"
          onClick={exportToExcel}
          style={{ marginLeft: "20px" }}
        >
          Export to Excel{" "}
          <i className="fa-regular fa-file-excel ms-1 bg-success"></i>
        </Button>
      </div>

      <div className="m-5">
        {empId ? <h2> Tasks For Today </h2> : <h2>All Tasks</h2>}

        <table
          style={{ borderCollapse: "collapse", width: "100%" }}
          id="myTable"
        >
          <thead>
            <tr>
              {/* Table headers */}
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Project Code
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Module ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Member ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Task ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Description
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Subtask ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Subtask Description
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Task Assigned Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Planned Start Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Planned End Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actual Start Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actual End Date
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Planned Hours
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actual Hours
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Category
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Priority
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Complexity
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={`${task.taskId}-${index}`}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.projectCode}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.moduleId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.memberId}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {`${task.projectCode}-T${task.taskId}`}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.description}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {`${task.projectCode}-T${task.taskId}-S${task.subtaskId}`}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.subtaskDesc}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.taskAssigned}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.fromDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.toDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.actualStartDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.actualEndDate}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.plannedHours}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.actualHours}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.status}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.category}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.priority}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {task.complexity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="17"
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  No tasks for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskDashboard;
