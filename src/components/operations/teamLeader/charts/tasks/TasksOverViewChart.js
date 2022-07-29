import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { URL } from "../../../../../server_connections/server";

function TaskOverviewChart() {
  const [team_tasks_statuses, set_team_tasks_statuses] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // team statuses

    fetch(
      `${URL}/api/auth/team/task_status?id=${localStorage.getItem("team")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_team_tasks_statuses(Result));
  }, [team_tasks_statuses]);
  const data = {
    labels: ["Not Started", "On Hold", "In Progress", "Testing", "Completed"],
    datasets: [
      {
        data: [
          team_tasks_statuses.not_started,
          team_tasks_statuses.on_hold,
          team_tasks_statuses.in_progress,
          team_tasks_statuses.testing,
          team_tasks_statuses.completed,
        ],
        backgroundColor: [
          "#BCB3AF",
          "#E6581B",
          "#1672EB",
          "#E4DD86",
          "#229577",
        ],
        borderColor: ["#BCB3AF", "#E6581B", "#1672EB", "#E4DD86", "#229577"],
      },
    ],
  };
  return (
    <div style={{ width: "40%" }}>
      <Doughnut data={data} />
    </div>
  );
}
export default TaskOverviewChart;
