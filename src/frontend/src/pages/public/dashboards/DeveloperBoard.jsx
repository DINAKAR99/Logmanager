import React, { useState, useEffect } from "react";
import PublicLayout from "../../../Layouts/PublicLayout";
import privateAxios, { publicAxios } from "../../../service/Interceptor";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const DeveloperBoard = () => {
  const [teamId, setTeamId] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [moduleId, setModuleId] = useState(""); // New state for selected module
  const [memberId, setMemberId] = useState("");
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [taskCount, setTaskCount] = useState(0); // To store the current task count

  // Data arrays updated to group projects, members, and modules by team
  const teams = [
    { id: "EODB", name: "Team EODB" },
    { id: "RTC", name: "Team RTC" },
    { id: "MIV", name: "Team MIV" },
  ];

  const projects = {
    EODB: [
      { code: "BLR", name: "TGBOILERS" },
      { code: "FCT", name: "TGFACTORIES" },
      { code: "LBR", name: "TGLABOUR" },
      { code: "ROW", name: "TFIBER" },
      { code: "RC", name: "TGROAD-CUTTING" },
    ],
    RTC: [{ code: "RTC", name: "TGRTC" }],
    MIV: [{ code: "MIV", name: "TGMIV" }],
  };

  const members = {
    EODB: [
      { id: "2397", name: "Dinakar" },
      { id: "2175", name: "Rajitha" },
      { id: "1685", name: "Santhosh" },
    ],
    RTC: [
      { id: "2233", name: "Anusha" },
      { id: "2398", name: "Prasanthi" },
      { id: "2290", name: "Srujana" },
      { id: "2019", name: "Saradhi" },
      { id: "2247", name: "Sripoojitha" },
      { id: "2425", name: "Rijwan" },
      { id: "2231", name: "Sneha" },
      { id: "2375", name: "Fariha Fatima" },
      { id: "2371", name: "Gangalatha" },
      { id: "2237", name: "Shravya" },
    ],
    MIV: [
      { id: "2233", name: "Anusha" },
      { id: "2398", name: "Prasanthi" },
      { id: "2290", name: "Srujana" },
      { id: "2019", name: "Saradhi" },
      { id: "2247", name: "Sripoojitha" },
      { id: "2425", name: "Rijwan" },
      { id: "2231", name: "Sneha" },
      { id: "2375", name: "Fariha Fatima" },
      { id: "2371", name: "Gangalatha" },
      { id: "2237", name: "Shravya" },
    ],
  };

  const modules = {
    BLR: [{ id: "NA", name: "NA" }],
    LBR: [{ id: "NA", name: "NA" }],
    FCT: [{ id: "NA", name: "NA" }],
    ROW: [{ id: "NA", name: "NA" }],
    RC: [{ id: "NA", name: "NA" }],
    RTC: [{ id: "NA", name: "NA" }],
    MIV: [{ id: "NA", name: "NA" }],
  };

  const subtaskOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const categories = ["CR", "MR", "TM", "PI"];
  const priorities = ["Low", "Medium", "High"];
  const complexities = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const statuses = ["Hold", "InProgress", "Closed", "Scheduled"];

  useEffect(() => {
    if (projectCode) {
      privateAxios
        .get(`/api/tasks/count?projectCode=${projectCode}`)
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
          category: "",
          priority: "",
          complexity: "",
          status: "Scheduled",
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
    if (isConfirmed) {
      toast.loading("Submitting ...");

      const finalTasks = tasks.map((task) => ({
        projectCode,
        moduleId,
        memberId,
        ...task,
      }));
      setTimeout(() => {
        privateAxios
          .post(
            "/api/tasks",
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
            // Reset form state after submission
            toast.remove();
            toast.success("Successfully submitted tasks!"); // Show success message

            setProjectCode("");
            setModuleId(""); // Reset module selection after submission
            setMemberId("");
            setTasks([]);
            setTaskCount(0); // Reset task count after submission
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, 1000);
    }
  };

  const handleTeamChange = (e) => {
    const selectedTeamId = e.target.value;
    setTeamId(selectedTeamId);
    setProjectCode(""); // Reset project and member on team change
    setModuleId(""); // Reset module on team change
    setMemberId(""); // Reset member on team change
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
        <div className="text-center  ">
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

          <label>Assign to Member:</label>
          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
            disabled={!teamId}
          >
            <option value="">--Select Member--</option>
            {teamId &&
              members[teamId]?.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
          </select>
        </div>
        {!teamId || !projectCode || !moduleId || !memberId ? (
          <div className="text-center">
            <div>
              Note: Please select Team, Project,Module and Member to continue
            </div>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              overflowX: "scroll",
              pointerEvents:
                !teamId || !projectCode || !moduleId || !memberId
                  ? "none"
                  : "auto",
              opacity:
                !teamId || !projectCode || !moduleId || !memberId ? 0.6 : 1,
            }}
          >
            <table style={{ width: "130%" }} className="table-bordered ">
              <thead>
                <tr>
                  <th>Project Code</th>
                  <th>Module Code</th>
                  <th>Assigned To</th>
                  <th>Task ID</th>
                  <th>Description</th>
                  <th style={{ width: 105 }}>Sub Task No</th>
                  <th>Subtask Description</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Planned Hours</th>
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
                        className="form-control"
                        type="text"
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
                        style={{ minWidth: 130 }}
                        value={task.fromDate}
                        onChange={(e) => handleTaskChange(index, e)}
                        required
                        min="2024-10-01" // Minimum date allowed
                        max="2025-12-31" // Maximum date allowed
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="date"
                        style={{ minWidth: 130 }}
                        name="toDate"
                        min="2024-10-01" // Minimum date allowed
                        max="2025-12-31" // Maximum date allowed
                        value={task.toDate}
                        onChange={(e) => handleTaskChange(index, e)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        name="plannedHours"
                        max={7}
                        value={task.plannedHours}
                        onChange={(e) => handleTaskChange(index, e)}
                        placeholder=""
                        required
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        name="status"
                        required
                        value={task.status || "Scheduled"}
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
                        value={task.priority}
                        required
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
                        value={task.complexity}
                        required
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
                <tr
                  style={{
                    backgroundColor: "white",
                    borderTop: "2px solid black",
                  }}
                >
                  <td colSpan={15}></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-3">
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
      </PublicLayout>
    </div>
  );
};

export default DeveloperBoard;
