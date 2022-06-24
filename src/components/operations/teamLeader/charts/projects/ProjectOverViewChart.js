import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import { URL } from "../../../../../server_connections/server";
import { Token } from "../../../../../server_connections/server";

function ProjectOverviewChart() {
  // team project status overview
  const [team_project_statuses, set_team_project_statuses] = useState([]);
  // Team overview


  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
    };
    // nteam project status overview
    fetch(
      `${URL}/api/auth/team_projects/overview/count?team_id=${localStorage.getItem(
        "team"
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_team_project_statuses(Result));
  }, [team_project_statuses]);


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
          team_project_statuses.not_started,
          team_project_statuses.planning,
          team_project_statuses.under_investigation,
          team_project_statuses.on_hold,
          team_project_statuses.in_progress,
          team_project_statuses.dev_complete,
          team_project_statuses.qa,
          team_project_statuses.deployed,
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
  
       <div style={{width: "60%",height:"60%" }}>
       <Doughnut data={data} />
       </div>
     
     
  );
}

export default ProjectOverviewChart;
