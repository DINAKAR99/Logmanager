import React from "react";
import PublicLayout from "../../Layouts/PublicLayout";

const Log = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to API)
  };

  return (
    <div>
      <PublicLayout>
        <div className="container">
          <h1>Work Log Entry</h1>

          <form id="workLogForm" onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <th colSpan="2">Log Your Work</th>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="task">Task Description:</label>
                  </td>
                  <td>
                    <input type="text" id="task" name="task" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="date">Date:</label>
                  </td>
                  <td>
                    <input type="date" id="date" name="date" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="startTime">Start Time:</label>
                  </td>
                  <td>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="endTime">End Time:</label>
                  </td>
                  <td>
                    <input type="time" id="endTime" name="endTime" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="hoursWorked">Hours Worked:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      id="hoursWorked"
                      name="hoursWorked"
                      required
                      step="0.1"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    <input type="submit" value="Submit Work Log" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <h2>Your Submitted Work Logs</h2>
          <table>
            <thead>
              <tr>
                <th>Task Description</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Hours Worked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example of submitted logs, this should be dynamically generated */}
              <tr>
                <td>Implement login feature</td>
                <td>2024-11-04</td>
                <td>09:00</td>
                <td>11:00</td>
                <td>2</td>
                <td>
                  <a href="EditWorkLogServlet?id=1">Edit</a> |
                  <a href="DeleteWorkLogServlet?id=1">Delete</a>
                </td>
              </tr>
              <tr>
                <td>Fix bug in payment module</td>
                <td>2024-11-03</td>
                <td>10:00</td>
                <td>12:30</td>
                <td>2.5</td>
                <td>
                  <a href="EditWorkLogServlet?id=2">Edit</a> |
                  <a href="DeleteWorkLogServlet?id=2">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PublicLayout>
    </div>
  );
};

export default Log;
