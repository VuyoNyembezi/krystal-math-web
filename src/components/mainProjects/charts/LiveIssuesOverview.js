import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import { URL } from "../../../server_connections/server";
function LiveOverView() {
  const [live_issue_statuses, set_live_issue_statuses] = useState([]);

  //  projects Data
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // projects overview statuses
    fetch(`${URL}/api/auth/live_issues/count/statuses`, requestOptions)
      .then((response) => response.json())
      .then((Result) => set_live_issue_statuses(Result));
  }, [live_issue_statuses]);

  const main_live_issues_data = {
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
          live_issue_statuses.not_started,
          live_issue_statuses.planning,
          live_issue_statuses.under_investigation,
          live_issue_statuses.on_hold,
          live_issue_statuses.in_progress,
          live_issue_statuses.dev_complete,
          live_issue_statuses.qa,
          live_issue_statuses.deployed,
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
    <>
      <div style={{ width: "500px" }}>
        <Doughnut data={main_live_issues_data} />
      </div>
    </>
  );
}
export default LiveOverView;
