import React,{useState,useEffect} from 'react';
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2';

import { URL } from '../../../../../server_connections/server';

function TeamLiveIssuesOverviewChart() {

    // team project status overview
    const [team_live_issues_statuses, set_team_project_statuses] = useState([])

  useEffect(()=>{
    const requestOptions ={
      method:'Get',
      headers:{
          'Accept':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('key')}`
        ,'Content-Type': 'application/json'},
    }
     // nteam project status overview
     fetch(`${URL}/api/auth/live_issues/team/count/statuses?team_id=${localStorage.getItem('team')}`,requestOptions)
     .then((response) => response.json())
     .then(Result => set_team_project_statuses(Result))
      
  },[team_live_issues_statuses])


  const data ={
    labels: ["No Started","Planning","Under Investigation","On Hold","In Progress","Dev Completed","QA","Deployed"],
    datasets:[{
        data: [
            team_live_issues_statuses.not_started,
        team_live_issues_statuses.planning,
        team_live_issues_statuses.under_investigation,
        team_live_issues_statuses.on_hold,
        team_live_issues_statuses.in_progress,
        team_live_issues_statuses.dev_complete,
        team_live_issues_statuses.qa,
        team_live_issues_statuses.deployed],
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
    }
    ]};
  return (
   
     <div style={{ width: "40%" }}>
        <Doughnut data={data} />
     </div>

  );
}

export default TeamLiveIssuesOverviewChart;
