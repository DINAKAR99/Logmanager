import React, { useState, useEffect } from "react";
import privateAxios, { publicAxios } from "../../../service/Interceptor";
import toast from "react-hot-toast";
import TaskDashboard from "./TaskDashboard"; // Assuming this is your original TaskDashboard layout
import PublicLayout from "../../../Layouts/PublicLayout";
import { Button } from "@mui/material";

const TaskDashboardWithFilter = ({ empId }) => {
  const [tasks, setTasks] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [updatedTasks, setUpdatedTasks] = useState([]);
  const subtaskOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const today = new Date().toISOString().split("T")[0];
  const categories = ["CR", "MR", "TM", "PI"];
  useEffect(() => {
    setFromDate(today);
    setToDate(today);
  }, []);

  // Fetch tasks based on date range
  const fetchTasksByDateRange = async () => {
    if (!fromDate || !toDate) {
      toast.error("Both 'From' and 'To' dates must be selected.");
      return;
    }

    try {
      const response = await privateAxios.post("/api/tasks/range", {
        fromDate,
        toDate,
        empid: empId,
      });
      console.log(response.data);

      setTasks(response.data);
      setUpdatedTasks(response.data); // Initialize updated tasks with fetched data
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks.");
    }
  };

  const handleTaskChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTasksCopy = [...updatedTasks];
    updatedTasksCopy[index][name] = value;
    setUpdatedTasks(updatedTasksCopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to submit the tasks?"
    );
    if (isConfirmed) {
      console.log(updatedTasks);
      toast.loading("Updating ...");
      setTimeout(() => {
        try {
          const response = privateAxios.post("/api/tasks", {
            tasks: updatedTasks,
          });
          toast.dismiss();
          toast.success("Tasks updated successfully!");
        } catch (error) {
          console.error("Error updating tasks:", error);
          toast.error("Error updating tasks.");
        }
      }, 1000);
    }
  };

  return (
    <div>
      <h3 className="ms-2">Edit Tasks</h3>
      {/* Date Range Inputs */}
      <div style={{ marginBottom: "20px" }} className="text-center ">
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
      </div>

      {tasks.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div
            className="task-dashboard-container m-2"
            style={{ overflowX: "scroll" }}
          >
            {/* Render Tasks in the same layout as Employee Dashboard */}
            <table style={{ width: "130%" }} className="table-bordered  ">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Project Code</th>
                  <th>Module Code</th>
                  <th>Assigned To</th>
                  <th>Task ID</th>
                  <th>Description</th>
                  <th>Subtask ID</th>
                  <th>Subtask Description</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Actual From Date</th>
                  <th>Actual To Date</th>
                  <th>Planned Hours</th>
                  <th>Actual Hours</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Complexity</th>
                </tr>
              </thead>
              <tbody>
                {updatedTasks.map((task, index) => (
                  <tr key={task.taskId}>
                    <td>
                      <input
                        type="text"
                        readOnly
                        name="sno"
                        style={{ minWidth: 90 }}
                        value={task.id}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        readOnly
                        name="projectCode"
                        style={{ minWidth: 90 }}
                        value={task.projectCode}
                        required
                      />
                    </td>
                    <td>
                      <input
                        readOnly
                        type="text"
                        name="moduleCode"
                        style={{ minWidth: 90 }}
                        value={task.moduleId ? task.moduleId : "NA"}
                      />
                    </td>
                    <td>
                      <input
                        readOnly
                        type="text"
                        name="assignedTo"
                        value={task.memberId}
                        style={{ minWidth: 90 }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="taskId"
                        value={task.taskId}
                        readOnly
                        style={{
                          border: "none",
                          backgroundColor: "#f0f0f0",
                          minWidth: 90,
                        }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control"
                        rows="2"
                        cols="100"
                        style={{
                          resize: "both",
                          overflow: "auto",
                          minWidth: 300,
                        }}
                        name="description"
                        value={task.description}
                        onChange={(e) => handleTaskChange(index, e)}
                        required
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        type="number"
                        required
                        name="subtaskId"
                        style={{ minWidth: 90 }}
                        value={task.subtaskId ? task.subtaskId : "0"}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="0">--</option>
                        {subtaskOptions.map((count) => (
                          <option key={count} value={count}>
                            {count}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {task.subtaskId && task.subtaskId !== "0" ? (
                        <textarea
                          type="text"
                          className="form-control"
                          required
                          rows="2"
                          cols="100"
                          style={{
                            resize: "both",
                            overflow: "auto",
                            minWidth: 300,
                          }}
                          name="subtaskDesc"
                          value={task.subtaskDesc}
                          onChange={(e) => handleTaskChange(index, e)}
                          placeholder="Enter subtask description"
                        />
                      ) : (
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          name="subtaskDesc"
                          value="NA"
                          onChange={(e) => handleTaskChange(index, e)}
                        />
                      )}
                    </td>
                    <td>
                      <input
                        required
                        type="date"
                        name="fromDate"
                        value={task.fromDate}
                        min="2024-10-01" // Minimum date allowed
                        max="2025-12-31" // Maximum date allowed
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        required
                        type="date"
                        name="toDate"
                        value={task.toDate}
                        min="2024-10-01" // Minimum date allowed
                        max="2025-12-31" // Maximum date allowed
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="actualStartDate"
                        min="2024-10-01" // Minimum date allowed
                        max="2025-12-31" // Maximum date allowed
                        value={task.actualStartDate}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="actualEndDate"
                        min="2024-10-01" // Minimum date allowed
                        max="2025-12-31" // Maximum date allowed
                        value={task.actualEndDate}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        required
                        style={{ minWidth: 90 }}
                        className="form-control"
                        name="plannedHours"
                        max={7}
                        value={task.plannedHours}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        name="actualHours"
                        max={7}
                        style={{ minWidth: 90 }}
                        value={task.actualHours}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <select
                        required
                        name="status"
                        value={task.status}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="Hold">Hold</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Closed">Closed</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </td>
                    <td>
                      <select
                        style={{ minWidth: 90 }}
                        className="form-select"
                        name="category"
                        required
                        value={task.category}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="">--</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        name="priority"
                        required
                        value={task.priority}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="complexity"
                        required
                        value={task.complexity}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((complexity) => (
                          <option key={complexity} value={complexity}>
                            {complexity}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-3 ">
            <Button
              variant="contained"
              className="ms-2"
              style={{ marginLeft: "20px" }}
              type="submit"
              // disabled={!teamId || !projectCode || !moduleId || !memberId}
            >
              Submit All Tasks
            </Button>
          </div>
        </form>
      ) : (
        <>
          {" "}
          <hr />
          <p className="text-center ">
            No tasks found for the selected date range.
          </p>
          <hr />
        </>
      )}
    </div>
  );
};

const TaskEditor = () => {
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    const empid = sessionStorage.getItem("empid");
    setMemberId(empid);
  }, []);

  return (
    <PublicLayout>
      {/* Render TaskDashboardWithFilter when memberId is set */}
      {memberId && <TaskDashboardWithFilter empId={memberId} />}
    </PublicLayout>
  );
};

export default TaskEditor;
