import React,{useState,useEffect} from 'react';
import 'chart.js/auto';

import { URL } from '../../../../../server_connections/server';
import { Token } from '../../../../../server_connections/server';
import {Form } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';



function TeamProjectsOverviewChart() {

const [ProjectCategoryType,setProjectCategoryType] = useState([])
const [projectCategory, setprojectCategory]= useState({
  project_category_type_id: 0
})

      // team project status overview
      const [team_project_statuses, set_team_project_statuses] = useState([]);
useEffect(() =>{
  const requestOptions ={
      method:'Get',
      headers:{
          'Accept':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('key')}`
        ,'Content-Type': 'application/json'},
    } 
       // fetch for project type Data
        fetch(`${URL}/api/auth/project_category_type/all`,requestOptions)
        .then(response => response.json())
        .then(results => setProjectCategoryType(results.data))
},[])

  useEffect(()=>{
    const requestOptions ={
      method:'Get',
      headers:{
          'Accept':'application/json',
          'Authorization': `Bearer ${Token}`
        ,'Content-Type': 'application/json'},
    }
    if(projectCategory.project_category_type_id !== 0){
          // team category projects by category
      fetch(`${URL}/api/auth/team_projects/category/count?team_id=${localStorage.getItem('team')}&category_type=${projectCategory.project_category_type_id}`,requestOptions)
      .then((response) => response.json())
      .then(Result => set_team_project_statuses(Result))
    }
  

  },[projectCategory])

  const data ={
    
    labels: ["No Started","Planning","Under Investigation","On Hold","In Progress","Dev Completed","QA","Deployed"],
    datasets:[{
        data: [
          team_project_statuses.not_started,
          team_project_statuses.planning,
          team_project_statuses.under_investigation,
          team_project_statuses.on_hold,
          team_project_statuses.in_progress,
          team_project_statuses.dev_complete,
          team_project_statuses.qa,
          team_project_statuses.deployed],
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
          ]
    }
    ]};
  
    const handleChange =(event) => {
      setprojectCategory({
        ...projectCategory,
        [event.target.name] : event.target.value
      })
      }
  return (
    <>
   
       <div style={{width: "50%",height:"30%" }}>
        <Form.Group className="mb-3">
                    <Form.Select     name="project_category_type_id" id="project_category_type_id" onChange={handleChange}  required>
                                        <option value="">Select Category</option>
                                        {
                                        ProjectCategoryType.map((project_type, key) =>{
                                        return <option key={key} value={project_type.id}>{project_type.name}</option>
                                        })                
                                        }
                    </Form.Select>
                </Form.Group>
        <Pie data={data} />
      </div>

    </>
  );
}

export default TeamProjectsOverviewChart;
