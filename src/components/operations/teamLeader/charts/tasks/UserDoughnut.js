
import React,{useEffect,useState} from 'react';
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2';
import { URL } from '../../../../../server_connections/server';
import { Token } from '../../../../../server_connections/server';

function UserProjectChart() {
  
    const [user_task_statuses, set_user_task_statuses] = useState([]);

    const [memberValue] =useState({
        id: 6,
        name: "",
      })
    useEffect(()=>{
        const requestOptions ={
          method:'Get',
          headers:{
              'Accept':'application/json',
              'Authorization': `Bearer ${Token}`
            ,'Content-Type': 'application/json'},
        }
          // user task statuses
          fetch(`${URL}/api/auth/user/tasks_status?team_id=${localStorage.getItem('team')}&id=${memberValue.id}`,requestOptions)
          .then((response) => response.json())
          .then(Result => set_user_task_statuses(Result))
      },[memberValue.id])

 
    const data ={
        labels: ["Not Started","On Hold","In Progress","Testing","Completed"],
    datasets:[{
        data: [ 
          user_task_statuses.not_started,
          user_task_statuses.on_hold,
          user_task_statuses.in_progress,
          user_task_statuses.testing,
          user_task_statuses.completed],
          backgroundColor:[
            "#BCB3AF",
            "#E6581B",
            "#1672EB",
            "#E4DD86",
            "#229577"
          ],
          borderColor:[
            "#BCB3AF",
            "#E6581B",
            "#1672EB",
            "#E4DD86",
            "#229577"
          ]
    }
    ]};
  return (      
  <div style={{width: "300px", }}>
  <Doughnut data={data} />
  </div>
  );
}

export default UserProjectChart;
