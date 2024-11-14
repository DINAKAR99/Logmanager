import React, { useState, useEffect } from "react";
import PublicLayout from "../../../Layouts/PublicLayout";
import { publicAxios } from "../../../service/Interceptor";
import toast from "react-hot-toast";

const EmployeeTaskBoard = () => {
  const [teamId, setTeamId] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [moduleId, setModuleId] = useState(""); // New state for selected module
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [taskCount, setTaskCount] = useState(0); // To store the current task count
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    const empid = sessionStorage.getItem("empid");
    setMemberId(empid);
  }, []);

  // Data arrays updated to group projects and modules by team
  const teams = [
    { id: "EODB", name: "Team EODB" },
    { id: "RTC", name: "Team RTC" },
    { id: "MIV", name: "Team MIV" },
  ];

  const projects = {
    EODB: [
      { code: "BLR", name: "BOILERS" },
      { code: "FCT", name: "FACTORIES" },
      { code: "LBR", name: "LABOUR" },
      { code: "ROW", name: "TFIBER" },
      { code: "RC", name: "ROAD-CUTTING" },
    ],
    RTC: [
      { code: "P003", name: "Project Gamma" },
      { code: "P004", name: "Project Delta" },
    ],
  };

  const modules = {
    BLR: [{ id: "BLR", name: "BLR" }],
    LBR: [{ id: "LBR", name: "LBR" }],
    FCT: [{ id: "FCT", name: "FCT" }],
    ROW: [{ id: "ROW", name: "ROW" }],
    RC: [
      { id: "M1", name: "Module D1" },
      { id: "M2", name: "Module D2" },
    ],
  };

  const categories = ["CR", "MR", "TM", "PI"];
  const priorities = ["Low", "Medium", "High"];
  const complexities = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const statuses = ["Hold", "InProgress", "Closed"];

  useEffect(() => {
    if (projectCode) {
      publicAxios
        .get(`/public/api/tasks/count?projectCode=${projectCode}`)
        .then((response) => {
          console.log("API Response:", response); // Log the entire response

          const count = response.data;
          const parsedCount = Number(count);

          if (!isNaN(parsedCount)) {
            setTaskCount(parsedCount + 1); // Set the task count

            // Now update the taskId of the first row
            setTasks((prevTasks) => {
              if (prevTasks.length > 0) {
                const updatedTasks = [...prevTasks];
                updatedTasks[0].taskId = `${parsedCount + 1}`; // Set taskId for the first row
                return updatedTasks;
              }
              return prevTasks; // In case no tasks exist yet
            });
          } else {
            console.error("Invalid task count received:", count);
          }
        })
        .catch((error) => {
          console.error("Error fetching task count:", error);
        });
    }
  }, [projectCode]);

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          taskId: `${taskCount + 1}`, // Initialize with the correct task ID
          fromDate: "",
          toDate: "",
          subtaskId: "",
          subtaskDesc: "",
          description: "",
          plannedHours: "",
          actualStartDate: "",
          actualEndDate: "",
          actualHours: "",
          category: "",
          priority: "",
          complexity: "",
          status: "",
        },
      ]);
    }
  }, [taskCount]);

  const handleTaskChange = (index, e) => {
    const { name, value } = e.target;
    const newTasks = [...tasks];
    newTasks[index][name] = value;
    setTasks(newTasks);
  };
  const subtaskOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const addTaskRow = () => {
    if (!teamId || !projectCode || !moduleId || !memberId) {
      toast.error(
        "Please select team, project, module, and member before adding a task."
      );
      return;
    }
    console.log(tasks);

    setTaskCount((prevCount) => {
      const newCount = prevCount + 1; // Calculate new task count

      // Add a new task row with the updated taskCount
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          taskId: `${newCount}`, // Generate taskId with the new count
          fromDate: "",
          toDate: "",
          subtaskId: "",
          subtaskDesc: "",
          description: "",
          plannedHours: "",
          actualStartDate: "",
          actualEndDate: "",
          actualHours: "",
          category: "",
          priority: "",
          complexity: "",
          status: "",
        },
      ]);

      return newCount; // Return the new task count for future updates
    });
  };

  const removeTaskRow = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamId || !projectCode || !moduleId || !memberId) {
      toast.error(
        "Please select team, project, module, and member before submitting tasks."
      );
      return;
    }
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to submit the tasks?"
    );

    // If the user clicks "OK", proceed with form submission
    if (isConfirmed) {
      toast.loading("Submitting ...");
      const finalTasks = tasks.map((task) => ({
        projectCode,
        moduleId,
        memberId,
        ...task,
      }));
      setTimeout(() => {
        publicAxios
          .post(
            "public/api/tasks",
            {
              tasks: finalTasks,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("Success:", response.data);
            toast.remove();
            toast.success("Successfully submitted tasks!"); // Show success message
            // Reset form state after submission
            setProjectCode("");
            setModuleId(""); // Reset module selection after submission
            setTasks([]); // Clear tasks
            setTaskCount(0); // Reset task count after submission
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, 1000);
    } else {
      // If the user clicks "Cancel", log the cancellation (optional)
      console.log("Task submission cancelled.");
    }
  };

  const handleTeamChange = (e) => {
    const selectedTeamId = e.target.value;
    setTeamId(selectedTeamId);
    setProjectCode(""); // Reset project and member on team change
    setModuleId(""); // Reset module on team change
  };

  const handleProjectChange = (e) => {
    const selectedProjectCode = e.target.value;
    setProjectCode(selectedProjectCode);
    setModuleId(""); // Reset module on project change
    setTasks(() => [
      {
        taskId: `${taskCount + 1}`, // Initialize with the correct task ID
        fromDate: "",
        toDate: "",
        subtaskId: "",
        subtaskDesc: "",
        description: "",
        plannedHours: "",
        actualStartDate: "",
        actualEndDate: "",
        actualHours: "",
        category: "",
        priority: "",
        complexity: "",
        status: "",
      },
    ]);
  };

  return (
    <div>
      <PublicLayout>
        <div className="text-center">
          <label>Team:</label>
          <select
            value={teamId}
            onChange={handleTeamChange}
            className="me-3"
            required
          >
            <option value="">--Select Team--</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <label>Project:</label>
          <select
            value={projectCode}
            onChange={handleProjectChange}
            className="me-3"
            required
            disabled={!teamId}
          >
            <option value="">--Select Project--</option>
            {teamId &&
              projects[teamId]?.map((project) => (
                <option key={project.code} value={project.code}>
                  {project.name}
                </option>
              ))}
          </select>

          <label>Module:</label>
          <select
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            className="me-3"
            required
            disabled={!projectCode}
          >
            <option value="">--Select Module--</option>
            {projectCode &&
              modules[projectCode]?.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ overflowX: "scroll" }}>
            <table style={{ width: "130%" }} className="table-bordered  ">
              <thead>
                <tr>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={projectCode}
                        readOnly
                        style={{
                          width: "100%",
                          border: "none",
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={moduleId}
                        readOnly
                        style={{
                          width: "100%",
                          border: "none",
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={memberId}
                        readOnly
                        style={{
                          width: "100%",
                          border: "none",
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="taskId"
                        value={task.taskId}
                        readOnly
                        style={{
                          width: "100%",
                          border: "none",
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control"
                        name="description"
                        value={task.description}
                        onChange={(e) => handleTaskChange(index, e)}
                        required
                        placeholder="Task Description"
                        rows="2"
                        cols="50"
                        style={{ resize: "both", overflow: "auto" }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        name="subtaskId"
                        required
                        value={task.subtaskId}
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
                          cols="50"
                          style={{ resize: "both", overflow: "auto" }}
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
                          placeholder=" "
                        />
                      )}
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="date"
                        name="fromDate"
                        required
                        value={task.fromDate}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="date"
                        name="toDate"
                        required
                        value={task.toDate}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="date"
                        name="actualStartDate"
                        required
                        value={task.actualStartDate}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="date"
                        name="actualEndDate"
                        required
                        value={task.actualEndDate}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        name="plannedHours"
                        required
                        style={{ minWidth: 90 }}
                        value={task.plannedHours}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        style={{ minWidth: 90 }}
                        name="actualHours"
                        required
                        max={7}
                        value={task.actualHours}
                        onChange={(e) => handleTaskChange(index, e)}
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        name="status"
                        required
                        value={task.status}
                        style={{ minWidth: 90 }}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="">--</option>
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
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
                        className="form-select"
                        name="priority"
                        required
                        value={task.priority}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="">--</option>
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        name="complexity"
                        required
                        value={task.complexity}
                        onChange={(e) => handleTaskChange(index, e)}
                      >
                        <option value="">--</option>
                        {complexities.map((complexity) => (
                          <option key={complexity} value={complexity}>
                            {complexity}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ minWidth: 100 }}>
                      <button
                        type="button"
                        onClick={() => removeTaskRow(index)}
                      >
                        -
                      </button>
                      <button type="button" onClick={addTaskRow}>
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-3">
            <button type="submit">Submit All Tasks</button>
          </div>
        </form>
      </PublicLayout>
    </div>
  );
};

export default EmployeeTaskBoard;
