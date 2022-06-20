import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { URL } from "../../../server_connections/server";

function ProjectOverviewChart() {
  const [project_statuses, set_project_not_started] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // not started
    fetch(`${URL}/api/auth/projects_status/count`, requestOptions)
      .then((response) => response.json())
      .then((Result) => set_project_not_started(Result));
  }, [project_statuses]);

  const data = {
    labels: [
      "No Started",
      "Planning",
      "Under Investigation",
      "On Hold",
      "In Progress",
      "Dev Completed",
      "QA",
      "Deployed",
    ],
    datasets: [
      {
        data: [
          project_statuses.not_started,
          project_statuses.planning,
          project_statuses.under_investigation,
          project_statuses.on_hold,
          project_statuses.in_progress,
          project_statuses.dev_complete,
          project_statuses.qa,
          project_statuses.deployed,
        ],
        backgroundColor: [
          "#BCB3AF",
          "#AF4619",
          "#AC6E1C",
          "#E6581B",
          "#1672EB",
          "#B38D7E",
          "#E4DD86",
          "#229577",
        ],
        borderColor: [
          "#BCB3AF",
          "#AF4619",
          "#AC6E1C",
          "#E6581B",
          "#1672EB",
          "#B38D7E",
          "#E4DD86",
          "#229577",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "400px" }}>
      <Pie data={data} />
    </div>
  );
}

export default ProjectOverviewChart;
