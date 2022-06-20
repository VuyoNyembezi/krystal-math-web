import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      data: [12, 3, 9, 15, 48, 12, 12, 3, 9, 15, 48, 12],
      backgroundColor: ["red", "blue", "green", "pink", "blue", "yellow"],
      borderColor: ["red", "blue", "green", "pink", "blue", "yellow"],
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Progress Chart for selected member",
    },
  },
};
function UserProgressChart() {
  return (
    <div>
      <div style={{ width: "61%" }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default UserProgressChart;
