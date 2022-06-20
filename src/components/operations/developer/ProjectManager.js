import React, { useState,useEffect, useMemo  } from 'react';
import {Tab, Button, Form, Tabs, Card, Table, Modal, Toast, ToastContainer} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import {

    FcApproval,
   
  } from "react-icons/fc";
  

import { URL } from '../../../server_connections/server';

function ProjectManager(){
    const history = useNavigate();
// Toast Alerts State Controller
const [success_updated,set_success_updated] = useState(false);
const handleShowsuccessUpdate = () => set_success_updated(true);
const handleCloseSuccessUpdate = () => set_success_updated(false);


// update  error toast controller
const [error_updated,set_error_updated] = useState(false); 
const handleShowErrorUpdate = () => set_error_updated(true);
const handleCloseErrorUpdate = () => set_error_updated(false);
// server error toast controller
const [server_error,set_server_error_updated] = useState(false); 
const handleShowServerError = () => set_server_error_updated(true);
const handleCloseServerError = () => set_server_error_updated(false);
    const [UserStatus, setUserStatus] = useState([])

      //project assignemnt Data
      const [assign_projectData, set_assign_ProjectData] = useState({});
    const [assign_bet_projectData,set_assign_bet_ProjectData] = useState([]);
    const [assign_bet_partners_projectData,set_assign_bet_partners_ProjectData] = useState([]);
    const [assign_country_projectData,set_assign_country_ProjectData] = useState([]);
    const [assign_customer_journey_projectData,set_assign_customer_journey_ProjectData] = useState([]);
    const [assign_digital_marketing_projectData,set_assign_digital_marketing_ProjectData] = useState([]);
    const [assign_integrations_projectData,set_assign_integrations_ProjectData] = useState([]);
    const [assign_payment_methods_projectData,set_assign_payment_methods_ProjectData] = useState([]);
    const [assign_all_projects,set_assign_all_projects_ProjectData] = useState([]);

      //over due project assignemnt Data
      const [over_due_assign_projectData, set_over_due_assign_ProjectData] = useState({});
      const [over_due_assign_bet_projectData,set_over_due_assign_bet_ProjectData] = useState([])
      const [over_due_assign_bet_partners_projectData,set_over_due_assign_bet_partners_ProjectData] = useState([])
      const [over_due_assign_country_projectData,set_over_due_assign_country_ProjectData] = useState([])
      const [over_due_assign_customer_journey_projectData,set_over_due_assign_customer_journey_ProjectData] = useState([])
      const [over_due_assign_digital_marketing_projectData,set_over_due_assign_digital_marketing_ProjectData] = useState([])
      const [over_due_assign_integrations_projectData,set_over_due_assign_integrations_ProjectData] = useState([])
      const [over_due_assign_payment_methods_projectData,set_over_due_assign_payment_methods_ProjectData] = useState([])
      const [over_due_assign_all_projects,set_over_due_assign_all_projects_ProjectData] = useState([])

    // for update  project assignemnt record 
    const [showUpdateProjectAssign, setUpdateProjectAssign] = useState(false);
    const handleShowUpdateProjectAssign = () => setUpdateProjectAssign(true);
    const handleCloseUpdateProjectAssign = () => {setUpdateProjectAssign(false);
        setAssignProjectFormValue({
            id:0,
            due_date:"",
            due_time:"",
            team_id: localStorage.getItem('team'),
            kickoff_date:"",
            kickoff_time:"",
            status_id:0,
            active: true,
            assign_name: "",
            project_name: ""
        })
    };

//Assign and Update Projects
    const [AssignProjectFormValue, setAssignProjectFormValue] = useState({
        id:0,
        due_date:"",
        due_time:"",
        team_id: localStorage.getItem('team'),
        kickoff_date:"",
        kickoff_time:"",
        status_id:0,
        active: true,
        assign_name: "",
        project_name: ""
    })

      // Keeps track of changes in the database
  const [old_project_assignment_data, set_old_project_assignment_data] = useState([]);
  const [old_over_due_project_assignment_data, set_old_over_due_project_assignment_data] = useState([]);

  function OldData(){
    set_old_project_assignment_data(assign_projectData);
    set_old_over_due_project_assignment_data(over_due_assign_projectData);
  };
 
  const latest__project_assignment = useMemo(() => old_project_assignment_data, [old_project_assignment_data]);
  const latest_over_due_project_assignment = useMemo(() => old_over_due_project_assignment_data, [old_over_due_project_assignment_data]);

    useEffect(() =>{
        const requestOptions ={
            method:'Get',
            headers:{
                'Accept':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('key')}`
              ,'Content-Type': 'application/json'},
          } 
              // fetch for user assignment statuses 
                  fetch(`${URL}/api/auth/user_status/all`,requestOptions)
                  .then(response => response.json())
                  .then(results => setUserStatus(results.data))
    },[])

    // Project Assignments
    useEffect(() => {
        const requestOptions = {
          method: "Get",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("key")}`,
            "Content-Type": "application/json",
          },
        };
         //fecth team  project assignments 
         fetch(
          `${URL}/api/auth/project_assignment/dev/all?team_id=${localStorage.getItem('team')}&id=${localStorage.getItem("SUID")}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((results) => {
            set_assign_ProjectData(results)
            set_assign_bet_ProjectData(results.bet_projects)
            set_assign_bet_partners_ProjectData(results.bet_project_partners_projects)
            set_assign_country_ProjectData(results.country_projects)
            set_assign_customer_journey_ProjectData(results.customer_journey_projects)
            set_assign_digital_marketing_ProjectData(results.digital_marketing_projects)
            set_assign_integrations_ProjectData(results.integrations_projects)
            set_assign_payment_methods_ProjectData(results.payment_method_projects)
            set_assign_all_projects_ProjectData(results.all_projects)
          });
       
      }, [latest__project_assignment]);
    // Over due  Assignment
        // Project Assignments
        useEffect(() => {
            const requestOptions = {
              method: "Get",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("key")}`,
                "Content-Type": "application/json",
              },
            };
             //fecth team  project assignments 
             fetch(
              `${URL}/api/auth/project_assignment/dev/all?team_id=${localStorage.getItem('team')}&id=${localStorage.getItem("SUID")}`,
              requestOptions
            )
              .then((response) => response.json())
              .then((results) => {
                set_over_due_assign_ProjectData(results)
                set_over_due_assign_bet_ProjectData(results.bet_projects)
                set_over_due_assign_bet_partners_ProjectData(results.bet_project_partners_projects)
                set_over_due_assign_country_ProjectData(results.country_projects)
                set_over_due_assign_customer_journey_ProjectData(results.customer_journey_projects)
                set_over_due_assign_digital_marketing_ProjectData(results.digital_marketing_projects)
                set_over_due_assign_integrations_ProjectData(results.integrations_projects)
                set_over_due_assign_payment_methods_ProjectData(results.payment_method_projects)
                set_over_due_assign_all_projects_ProjectData(results.all_projects)
              });
       
           
          }, [latest_over_due_project_assignment]);

 // Update Assignment Details
function handleSubmitUpdateProject(event){
    event.preventDefault()
    fetch(`${URL}/api/auth/project_assignment/update`,{
        method: 'put',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        },
        body: JSON.stringify({
            id: AssignProjectFormValue.id,
            projects_assignment: {
                user_status_id: AssignProjectFormValue.user_status_id
            }
        })
    })
    .then((response) =>
    {response.json()
        if(response.status === 200){
            handleShowsuccessUpdate();
          handleCloseUpdateProjectAssign();
          OldData();
        }
        else if(response.status === 422){
            handleShowErrorUpdate();
        }
        else if(response.status === 500){
            handleShowServerError();
        }
        else if(response.status === 401){
          alert('session expired')
          history('/')
        }
    })
    .then((results) => results.json())
}
    
    const handleChange =(event) => {
        setAssignProjectFormValue({
            ...AssignProjectFormValue,
            [event.target.name] : event.target.value,
        })
        }

        function selectProject(project){
            setAssignProjectFormValue({ 
                id: project.id,
                due_date: project.due_date,    
                team_id: localStorage.getItem('team'),
                kickoff_date: project.kickoff_date,
                user_status_id: project.user_status.id,
                active: project.active,
                assign_name: project.user.name,
                project_name: project.project.name
             
            })
          }
        
    return(
        <>
 
                    <Card fluid>
                <Card.Header>.
                </Card.Header> 
                 <div>
              </div>
                <Card.Body>
                <Tabs defaultActiveKey="open"  className="mb-3">
                <Tab eventKey="open" title="Open">
                  <Tabs defaultActiveKey="bet_projects"  className="mb-3">
                    <Tab eventKey="bet_projects" title="Bet Projects">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            <th>click</th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            assign_bet_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td className="text-center">
                                                <button size="sm" onClick={() => selectProject(project)}>
                                                <Button size="sm" variant="outline-success"  onClick={handleShowUpdateProjectAssign}>update</Button>  
                                                </button>  
                                                </td>  
                                                </tr>
                                            })
                                            }
                                    </tbody>

                                  
                    </Table> 
                    </Tab>
                    <Tab eventKey="country" title="Country">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            <th>click</th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            assign_country_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td className="text-center">
                                                <button size='sm' onClick={() => selectProject(project)}>
                                                <Button size="sm" variant="outline-success"  onClick={handleShowUpdateProjectAssign}>update</Button>  
                                                </button>
                                                </td> 
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="customerJourney" title="Customer" >
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            <th>click</th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            assign_customer_journey_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td className="text-center">
                                                <button size='sm' onClick={() => selectProject(project)}>
                                                <Button size="sm" variant="outline-success"  onClick={handleShowUpdateProjectAssign}>update</Button>  
                                                </button>   
                                                </td> 
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="integrations" title="Integrations">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            <th>click</th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            assign_integrations_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td className="text-center">
                                                <button size='sm' onClick={() => selectProject(project)}>
                                                <Button size="sm" variant="outline-success"  onClick={handleShowUpdateProjectAssign}>update</Button>  
                                                </button>
                                                </td> 
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="pay_methods" title="Payments">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            <th>click</th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            assign_payment_methods_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td className="text-center">
                                                <button size='sm' onClick={() => selectProject(project)}>
                                                <Button size="sm" variant="outline-success"  onClick={handleShowUpdateProjectAssign}>update</Button>  
                                                </button>
                                                </td> 
                                                </tr>
                                            })
                                            }
                                        
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="digital" title="Digital Marketing">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            <th>click</th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            assign_digital_marketing_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td className="text-center">
                                                <button size='sm' onClick={() => selectProject(project)}>
                                                <Button size="sm" variant="outline-success"  onClick={handleShowUpdateProjectAssign}>update</Button>  
                                                </button>
                                                </td> 
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table> 
                    </Tab>
                    <Tab eventKey="betsoftware" title="Bet Software Partners">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            <th>click</th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            assign_bet_partners_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td className="text-center">
                                                <button  size='sm'  onClick={() => selectProject(project)}>
                                                <Button size="sm" variant="outline-success"  onClick={handleShowUpdateProjectAssign}>update</Button>  
                                                </button>
                                                </td> 
                                                </tr> })
                                            }
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="all" title="All">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            <th>click</th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            assign_all_projects.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td className="text-center">
                                                <button size="sm" onClick={() => selectProject(project)}>
                                                <Button size="sm" variant="outline-success"  onClick={handleShowUpdateProjectAssign}>update</Button>  
                                                </button>  
                                                </td>  
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table> 
                    </Tab>
                  </Tabs>
                    </Tab>
                    <Tab eventKey="over due" title="Over Due">
                    <Tabs defaultActiveKey="over due bet_projects"  className="mb-3">
                    <Tab eventKey="over due bet_projects" title="Bet Projects">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            over_due_assign_bet_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                <td>{project.user.name}</td>
                                                </tr>
                                            })
                                            }
                                    </tbody>

                                  
                    </Table> 
                    </Tab>
                    <Tab eventKey="over due country" title="Country">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            over_due_assign_country_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="over due customerJourney" title="Customer" >
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                           
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            over_due_assign_customer_journey_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                               
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="over due integrations" title="Integrations">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            over_due_assign_integrations_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="over due pay_methods" title="Payments">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            over_due_assign_payment_methods_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                              
                                                </tr>
                                            })
                                            }
                                        
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="over due digital" title="Digital Marketing">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            over_due_assign_digital_marketing_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table> 
                    </Tab>
                    <Tab eventKey="over due betsoftware" title="Bet Software Partners">
                    <Table size='sm'  striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            <th>Category</th> 
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            over_due_assign_bet_partners_projectData.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td> {project.project_type.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                </tr> })
                                            }
                                    </tbody>
                    </Table>  
                    </Tab>
                    <Tab eventKey="over due all" title="All">
                    <Table size="sm" striped bordered hover>
                                        <thead>
                                            <tr> 
                                            <th>Name</th>
                                            
                                            <th>Status</th>
                                            <th> Due Date </th>
                                            <th> Kickoff Date </th>
                                            </tr>    
                                        </thead> 
                                        <tbody>
                                        {
                                            over_due_assign_all_projects.map((project, Index) =>{
                                                return <tr key={Index} >
                                                <td>{project.project.name}</td>
                                                <td>{project.user_status.name}</td>
                                                <td>{new Date(project.due_date).toDateString()}</td>
                                                <td>{new Date(project.kickoff_date).toDateString()}</td>
                                                </tr>
                                            })
                                            }
                                    </tbody>
                    </Table> 
                    </Tab>
                  </Tabs>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
    {/*  Projects */}
        <Modal show={showUpdateProjectAssign} onHide={handleCloseUpdateProjectAssign}  size="lg">
                        <Modal.Header closeButton>
                        <Modal.Title>Update <u><i>{AssignProjectFormValue.project_name}</i> </u>   </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>  
                                <Form onSubmit={handleSubmitUpdateProject}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status :</Form.Label>
                                    <Form.Select     name="user_status_id" id="user_status_id" onChange={handleChange} value={AssignProjectFormValue.user_status_id}  required>
                                                        <option value="">Select Member Status</option>
                                                        {
                                                        UserStatus.map((task_status, key) =>{
                                                        return <option key={key} value={task_status.id}>{task_status.name}</option>
                                                        })                
                                                        }
                                    </Form.Select>
                                </Form.Group>
                                    <Button variant="primary" size='sm' type="submit">
                                        Update 
                                    </Button>  
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <label  className='text-center'>update project assignment record</label>
                        </Modal.Footer>
        </Modal>


        
{/* Toast Arlets */}


     <ToastContainer className="p-3" position={'top-end'}>

{/* Successfully Updated */}
           <Toast onClose={handleCloseSuccessUpdate} show={success_updated} bg={'success'} delay={5000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">  {<FcApproval/>}{' '}Successfully</strong>
          
          </Toast.Header>
          <Toast.Body className='text-white'>  Updated Successfully</Toast.Body>
        </Toast>
   {/*  Error Update  */}
   <Toast onClose={handleCloseErrorUpdate} show={error_updated} bg={'warning'} delay={5000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
          
          </Toast.Header>
          <Toast.Body className='text-white'>please check input or task already assigned</Toast.Body>
        </Toast>

         {/* Server Error  */}
   <Toast onClose={handleCloseServerError} show={server_error} bg={'danger'} delay={5000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Server Error</strong>
          
          </Toast.Header>
          <Toast.Body className='text-white'>server error occured</Toast.Body>
        </Toast>
     </ToastContainer>
    
   
    
        </>
    );
}
export default ProjectManager;