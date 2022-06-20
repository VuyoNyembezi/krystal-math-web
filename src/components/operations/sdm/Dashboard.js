import React,{useState,useEffect, useMemo} from 'react';
import { Badge, Button, Card,  Col, Container,  Form, FormControl, FormGroup, InputGroup, Modal, Nav, ProgressBar, Row, Tab, Table, Tabs, Toast, ToastContainer } from 'react-bootstrap';
import CountUp from 'react-countup';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

import { URL } from '../../../server_connections/server';
import { Doughnut } from 'react-chartjs-2';
import { Input, Label } from 'reactstrap';
import { FcApproval } from "react-icons/fc";


function DashBoardSDM(){


// Toast Alerts State Controller
const [success_create,set_success_create] = useState(false);
const handleShowsuccessCreate = () => set_success_create(true);
const handleCloseSuccessCreate = () => set_success_create(false);
// Create Toaster Error
const [error_create,set_error_create] = useState(false);
const handleShowErrorCreate = () => set_error_create(true);
const handleCloseErrorCreate = () => set_error_create(false);




  const history = useNavigate();
  // add project 
  const [showAddProject, setShowAddProject] = useState(false);
  const handleAddProjectClose = () => {setShowAddProject(false)
    setProjectFormValue({
      name:"",
      team_id:0,
      user_id:0,
      business_request_document_status:false,
      project_status_id:0,
      business_request_document_link:"",
      priority_type_id: 0 ,
      project_type_id:0,
      project_category_type_id: 0
    });
  };
  const handleAddProjectShow = () => setShowAddProject(true);
// Add Live Issue
const [showAddLiveIssue, setShowAddLiveIssue] = useState(false);
const handleAddLiveIssueClose = () => {setShowAddLiveIssue(false);
  setLiveIssueFormValue({
    name:"",
    team_id:0,
    pm_id:0,
    business_request_document_status:false,
    project_status_id:0,
    business_request_document_link:"",
    priority_type_id: 0 ,
    last_status_change:"",
    assigned_date:""
  });
};
const handleAddLiveShow = () => setShowAddLiveIssue(true);

const [teamsData, setTeamsData] = useState([])
const [projectData,setProjectData] = useState([]);

// Team Project Counter
const [Team_Projects_CounterData, set_Team_Projects_Counter_Data] = useState([])
// Team Live Issues Counter
const [Team_live_issues_CounterData, set_Team_Live_Issues_Counter_Data] = useState([])

//All Projects over view status 
const [project_statuses, set_project_statsuses] = useState([])

//All Live Issues Statuses
const [live_issues_statuses, set_live_issues_statsuses] = useState([])

//projects attributes States
const [projectCategoryTypeData, setProjectCategoryTypeData] =useState([])
const [statusData,setStatus] = useState([]);
const [projectTypeData, setProjectTypeData] =useState([])
const [PriorityData,setPriorityData] = useState([])
const [userData, setUserData] = useState([])

const [projectValue, setProject] =useState({
  name: "",
  business_request_document_link: "",
  business_request_document_status: false
  ,inserted_at: "",
  project_type: "",
  status: "",
  progress: 0,
  last_update: "",
  pm: "",
  status_level: "",
  priority_level:"",
  last_status_change: ""
})
// Project Form
const [projectFormValue, setProjectFormValue] = useState({
  name:"",
  team_id:0,
  user_id:0,
  business_request_document_status:false,
  project_status_id:0,
  business_request_document_link:"",
  priority_type_id: 0 ,
  project_type_id:0,
  project_category_type_id: 0
})
// Live Issue Form
const [liveIssueFormValue, setLiveIssueFormValue] = useState({
  id:0,
  name:"",
  team_id:0,
  pm_id:0,
  business_request_document_status:false,
  project_status_id:0,
  business_request_document_link:"",
  priority_type_id: 0 ,
  last_status_change:"",
  assigned_date:""

})
// search state
const [team, setteam] =useState({
  id:0,
  name: "",
  team_lead:""
})

// search state 
const [search_key,set_search_key] = useState({
  project_search:null,

})

  // Keeps track of changes in the database
  const [old_team_projects_data, set_old_team_projects_data] = useState([]);
  const [old_team_live_issue_data, set_old_team_live_issue_data] = useState([])
  function OldData(){
    set_old_team_projects_data(Team_Projects_CounterData);
    set_old_team_live_issue_data()
  };
  

  const latest_project_data = useMemo(() => old_team_projects_data, [old_team_projects_data]);
  
  const latest_ive_ssue_data = useMemo(() => old_team_live_issue_data, [old_team_live_issue_data]);

// modal state
const [show_team_projects, setShowTeamProjects] = useState(false);
const handleCloseProjects = () => {setShowTeamProjects(false);
  set_search_key({
    project_search:null
  });
  
}
const handleShow = () => setShowTeamProjects(true);
// member tasks modal
const [show_teams, setShowTeams] = useState(false);
const handleCloseTeams = () => {setShowTeams(false);

};
const handleShow_Teams = () => setShowTeams(true);

// Team projects Data
useEffect(()=>{
  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  }
 
    // Counters
 // All  Team Project 
 fetch(`${URL}/api/auth/team/project/count?team_id=${team.id}`,requestOptions)
 .then((response) => response.json())
 .then(Result => set_Team_Projects_Counter_Data(Result))

  // All  Team Live Issues Project 
  fetch(`${URL}/api/auth/live_issues/team/count/overview?team_id=${team.id}`,requestOptions)
  .then((response) => response.json())
  .then(Result => set_Team_Live_Issues_Counter_Data(Result))

},[team.id,latest_project_data])

useEffect(() =>{
  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  }
   
  let pm_key = 6;
    // fetch all statuses
   fetch(`${URL}/api/auth/project_status/all`,requestOptions)
   .then(response => response.json())
   .then(Result => setStatus(Result.data))
   
// fetch all priority values
   fetch(`${URL}/api/auth/priority_type/all`,requestOptions)
   .then(response => response.json())
   .then(Result => setPriorityData(Result.data)) 

// fetch all project type
   fetch(`${URL}/api/auth/project_type/all`,requestOptions)
   .then(response => response.json())
   .then(Result => setProjectTypeData(Result.data))
   
// fetch all project category type
fetch(`${URL}/api/auth/project_category_type/all`,requestOptions)
.then(response => response.json())
.then(Result => setProjectCategoryTypeData(Result.data))

   // fetch users
   fetch(`${URL}/api/auth/user/role?id=${pm_key}`,requestOptions)
   .then(response => response.json()
    )
   .then(Result => setUserData(Result.data))
  
},[])

useEffect(() =>{
  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  }
    // fetch all teams
     fetch(`${URL}/api/auth/active/teams`,requestOptions)
     .then(response => response.json())
     .then(res => setTeamsData(res.data))
     
  },[])


useEffect(()=>{
  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  } 
    //  All Live Issues Statuses
  
    fetch(`${URL}/api/auth/live_issues/count/statuses`,requestOptions)
    .then((response) => response.json())
    .then(Result => set_live_issues_statsuses(Result))
},[latest_ive_ssue_data])
useEffect(()=>{
  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  }  
//  All projects Statuses
  
    fetch(`${URL}/api/auth/projects_status/count`,requestOptions)
    .then((response) => response.json())
    .then(Result => set_project_statsuses(Result))
  
},[latest_project_data])

useEffect(() =>{

  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  }
  if(search_key.project_search === null){
  
  // fetch all projects for the team
  fetch(`${URL}/api/auth/team/projects/all?team_id=${team.id}`,requestOptions)
  .then(response => response.json())
  .then(res => setProjectData(res.data))
  }

  // Counters
  // All  Team Project 
  fetch(`${URL}/api/auth/team/project/count?team_id=${team.id}`,requestOptions)
  .then((response) => response.json())
  .then(Result => set_Team_Projects_Counter_Data(Result))

},[team.id,search_key]) 
 // Search
 function handle_Search_Project_Submit(event){
  event.preventDefault();

  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  }
  fetch(`${URL}/api/auth/projects/team/all/search?team_id=${team.id}&search=${search_key.project_search}`,requestOptions)
  .then(response => response.json())
  .then(res => setProjectData(res.data))

}
 // Create Project Record
 function handle_Add_Project_Submit(event){
  event.preventDefault();
  fetch(`${URL}/api/auth/create/project`,{
    method: 'post',
    headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
    },
  body: JSON.stringify({
    project:{
      name: projectFormValue.name,
      team_id: projectFormValue.team_id,
      user_id: projectFormValue.user_id,
      business_request_document_status: projectFormValue.business_request_document_status,
      project_status_id: projectFormValue.project_status_id,
      business_request_document_link: projectFormValue.business_request_document_link,
      priority_type_id: projectFormValue.priority_type_id ,
      project_type_id: projectFormValue.project_type_id,
      project_category_type_id: projectFormValue.project_category_type_id
    }
})  
})
.then((response) => {
  response.json()
  if(response.status === 201){
    handleShowsuccessCreate();
    handleAddProjectClose();
    OldData();
  }
  else if(response.status === 422){
    handleShowErrorCreate();
  }
  else if(response.status === 401){
    history('/')
  }
})
}

// Create Live Issue Record
function handle_Add_Live_Issue(event){
  event.preventDefault();
const now_date = new Date();
  fetch(`${URL}/api/auth/create/live_issues`,{
      method: 'post',    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`,
        'Content-Type': 'application/json'},
          body: JSON.stringify({
              live_issue:{
                  name: liveIssueFormValue.name,
                  business_request_document_status: liveIssueFormValue.business_request_document_status,
                  business_request_document_link: liveIssueFormValue.business_request_document_link,
                  team_id: liveIssueFormValue.team_id,
                  pm_id: liveIssueFormValue.pm_id,
                  project_status_id: liveIssueFormValue.project_status_id,
                  priority_type_id: liveIssueFormValue.priority_type_id,
                  last_status_change: now_date.toISOString()

              }
          })
  })
  .then((Response) => {
      Response.json()
      if (Response.status === 201){
         handleShowsuccessCreate();
          handleAddLiveIssueClose()
      }
      else if(Response.status === 422){
        handleShowErrorCreate();
      }
      else if(Response.status === 401){
          history('/')
      }
  })
}
if(!projectData){
    return <p>no projects</p>
}
if(!teamsData){
    return <p>no team data</p>
}

function selectTeam(team){
  setteam(
        {
            id: team.id,
            name: team.name,
            team_lead: team.team_lead.name
        })     
}
const handleChange =(event) => {
  setLiveIssueFormValue({
    ...liveIssueFormValue,
    [event.target.name]: event.target.value
  })

  setteam(
    {
       ...team,
       [event.target.name]: event.target.value
    });  
  setProjectFormValue({
     ...projectFormValue,
     [event.target.name]: event.target.value
   })

   setProject({
    ...projectValue,
    [event.target.name]: event.target.value
  })

  set_search_key ({
    ...search_key,
    [event.target.name]: event.target.value
  })
 
   }

 function selectProject(project){
 
  var last_status = new Date(project.last_status_change).toDateString();
  var last_update = new Date( project.updated_at).toDateString();
  var created_project_at = new Date( project.inserted_at).toDateString();

   setProjectFormValue({
     id: project.id,
     name: project.name,
     team_id: project.team.id,
     user_id: project.user.id,
     business_request_document_status: project.business_request_document_status,
     project_status_id: project.project_status.id,
     business_request_document_link: project.business_request_document_link,
     project_type_id: project.project_type.id,
     priority_type_id: project.priority_type.id,
     project_category_type_id: project.project_category_type.id
   })
   setProject({
    name: project.name,
    business_request_document_link: "",
    business_request_document_status: project.business_request_document_status
    ,inserted_at: created_project_at,
    project_type: project.project_type.name,
    status: project.project_status.name,
    progress: project.project_status.effect,
    last_update: last_update,
    pm: project.user.name,
    status_level: project.project_status.level,
    priority_type: project.priority_type.name,
    priority_level: project.priority_type.level,
    last_status_change: last_status
   })
 }

// All System project Project Chart Data 
const project_data ={
  labels: ["No Started","Planning","Under Investigation","On Hold","In Progress","Dev Completed","QA","Deployed"],
  datasets:[{
      data: [
        project_statuses.not_started,
        project_statuses.planning,
        project_statuses.under_investigation,
        project_statuses.on_hold,
        project_statuses.in_progress,
        project_statuses.dev_complete,
        project_statuses.qa,
        project_statuses.deployed],
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
// All System Live Issues Chart Data 
const live_issues_data ={
  labels: ["No Started","Planning","Under Investigation","On Hold","In Progress","Dev Completed","QA","Deployed"],
  datasets:[{
      data: [
        live_issues_statuses.not_started,
        live_issues_statuses.planning,
        live_issues_statuses.under_investigation,
        live_issues_statuses.on_hold,
        live_issues_statuses.in_progress,
        live_issues_statuses.dev_complete,
        live_issues_statuses.qa,
        live_issues_statuses.deployed],
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

return(
<div className='dash-boards'>
  
    <Card>
      <Card.Body><Nav  className="justify-content-end">
                 <div  className="col-md-1 col-sm-9">
                  <Button variant="danger" size='sm' onClick={handleAddLiveShow} >
                                      Add Live Issue
                  </Button>
                  </div>
                  </Nav>
   <Tabs defaultActiveKey="home" transition={true}  className="mb-3">
   
  <Tab eventKey="home" title="Projects">
  
  <Container fluid>
  <Row>
    <Col sm={8}> 
    <Card className="shadow" style={{height: "750px"}}>
    <Card.Header>Teams   </Card.Header>  
    <Card.Body style={{height: "100px"}}> 
                <Form>
                <Row>
                  <Col>
                  <div  className="col-md-6 col-sm-9">
                  <Form.Group className="mb-3">
                    <Form.Select     name="id" onChange={handleChange} id="id"   required>
                    <option value={0}>Select Team</option>
                                        {
                                        teamsData.map((team, key) =>{
                                        return <option key={key} value={team.id} onSelect={() => selectTeam(team)} >{team.name}</option>
                                        })                
                                        }
                    </Form.Select>
                  </Form.Group>
                  </div>
                  </Col>
                  <Col>  
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control size='sm' placeholder="Selected Team" readOnly />
                  </Col>
                   <Col>
                    <Form.Control  size='sm' placeholder="Team Leader" readOnly/>
                  </Col>
                  <Col><Button size='sm' variant="info" >
                      Overview
                    </Button>
                  </Col>
                </Row>
              </Form>    
    </Card.Body>
    <Card.Footer  className="text-center">
      <Button variant="success" size='sm' onClick={handleShow_Teams} >
                          All
      </Button>
    </Card.Footer>
    <Card.Header><b>{team.name}</b> projects </Card.Header> 
    <Card.Body style={{height: "347px"}}> 
    <Nav  className="justify-content-end">
                 <div  className="col-md-5 col-sm-9">
                   <Form onSubmit={handle_Search_Project_Submit} className="d-flex">
                      <FormControl type="search" name='project_search' placeholder="Search" onChange={handleChange} required className="mr-3" aria-label="Search" />
                      <Button variant="outline-success" type='submit' size='sm'>Search</Button>
                    </Form>
                  </div>
                  </Nav>
                  <br/>
              <Table size="sm" striped bordered hover>
                        <thead>
                            <tr> 
                            <th>Name</th>
                            <th>Category</th>
                           <th>Type</th>
                            <th >PM</th> 
                            <th> </th>
                            </tr>    
                        </thead> 
                        <tbody>
                        {
                             projectData.slice(0, 5).map((project, Index) =>{
                               return <tr key={Index} >
                               <td>{project.name}</td>
                               <td> {project.project_category_type.name}</td>
                               <td> {project.project_type.name}</td>
                               <td>{project.user.name}</td>
                               <td className="text-center"><Button variant="outline-success" size='sm' onClick={() => selectProject(project)}>Select</Button>  </td> 
                               </tr>
                             })
                           }
                         
                    </tbody>
                </Table> 
    </Card.Body>
    <Card.Footer  className="text-center">
      <Button variant="success" size='sm' onClick={handleShow} >
                          All
      </Button>
      {' '}{' '}
      <Button variant="info" size='sm' onClick={handleAddProjectShow} >
                        
                          Add Project
      </Button>
    </Card.Footer>
  </Card>
  </Col>
    <Col >
    <Card className="shadow" style={{height: "750px"}}>
      <Card.Header><b>{projectValue.name}</b> Project Details</Card.Header>
    <Card.Body  >
              <Row>
              <Col>
             Name :
              </Col>     
              <Col>
              <p>{projectValue.name}</p>
              </Col>
              </Row>
             <hr/>
               <Row>
              <Col>
             Priority  :
              </Col>     
              <Col>
              <Badge  style={{height: "25px"}} bg={projectValue.priority_level} size='sm' ><p>{projectValue.priority_type}</p></Badge>
              </Col>
              </Row>
              <br/>
              <Row>
              <Col>
              Last Status Update :
              </Col>     
              <Col>
              <p>{projectValue.last_status_change}</p>
              </Col>
              </Row>
              <br/>
              <Row>
              <Col>
              PM :
              </Col>     
              <Col>
              <p>{projectValue.pm}</p>
              </Col>
              </Row>
              <br/>
              <Row>
              <Col>
              Status :
              </Col>     
              <Col>
              <p>{projectValue.status}</p>
              </Col>
              </Row>
              <br/>
              <Row>
                <Col> 
                    Progress :
                </Col>
                <Col>
                  <ProgressBar now={projectValue.progress} striped variant={projectValue.status_level} label={`${projectValue.progress}%`} />
                </Col>
              </Row>         
              <br/>
              <br/>
              <Row>
                 <Col>
               To Completion :
              </Col>  
              <Col>
              <Badge pill bg="info"><CountUp start={0} end={100 - projectValue.progress} delay={0}>
                        {({ countUpRef }) => (
                            <div>
                            <span ref={countUpRef}  />%
                            </div>
                        )}
                        </CountUp>
                        </Badge>
              </Col>     
              </Row>
              <br/>
              <Row>
              <Col>
              Added
              </Col>     
              <Col>
              <p>{projectValue.inserted_at}</p>
              </Col>
              </Row>
              <br/>
              <Row>
              <Col>
              Last Update
              </Col>     
              <Col>
              <p>{projectValue.last_update}</p>
              </Col>
              </Row>
      </Card.Body> 
      
      
      </Card>
    </Col>  
  </Row>
  <Row>
 
    <Col sm={6}>
  </Col>
  </Row>
  
</Container>


  </Tab>
  <Tab eventKey="overview" title="Teams & Projects Overview" >
  <Container fluid>
    <Row>
    <Col>
    <Card className="shadow" fluid>
      <Card.Header>Projects Overview</Card.Header>
      
   <Card.Body ><Tabs defaultActiveKey="projects" transition={true}  className="mb-3">
          <Tab eventKey="projects" title="Projects">
              <div style={{width: "400px", }}>
                <Doughnut data={project_data} />
              </div> 
             </Tab>
             <Tab eventKey="live_issues" title="Live Issues">
              <div style={{width: "400px", }}>
                <Doughnut data={live_issues_data} />
              </div> 
             </Tab> 
              </Tabs>
      </Card.Body>
     
    </Card>
    </Col>


    <Col>
    <Card className="shadow" >
      <Card.Header>Projects On Teams Overview
 </Card.Header>
     <Row>
    <Card.Body  style={{height: "300px"}}>
      <Table size='sm' striped bordered hover>
                        <thead>
                            <tr> 
                            <th className='text-center'>Team</th>
                            <th className='text-center'>select</th>
                            
                            </tr>    
                        </thead> 
                        <tbody>
                        {
                             teamsData.map((team, Index) =>{
                               return <tr key={Index} >
                               <td>{team.name}</td>
                               <td className="text-center">
                                      {'  ' } {'  ' }
                                     <Button variant="outline-success" size='sm' onClick={() => selectTeam(team)}>Select</Button>
                                     </td>
                              </tr>
                             })
                           }
                         
                    </tbody>
                </Table>     
      </Card.Body>
     
     </Row> <Card.Footer  className="text-center"> 
       <Button variant="success" size='sm' onClick={handleShow_Teams} >
                            All
        </Button>
      </Card.Footer>
     <Card.Header><b>{team.name}</b> Projects Counters</Card.Header>
     <Row>
      
      <Card.Body>
     
    <Row>
              <Col>
              Pending
              </Col>     
              <Col>
               <Badge pill bg="danger">
                              <CountUp  start={0} end={Team_Projects_CounterData.pending} delay={0}>
                                {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                      )}
                              </CountUp>
                            </Badge>
                         
              </Col>
              </Row>
              <br/>
                <Row>
              <Col>
              Completed
              </Col>  
              <Col>
              <Badge pill bg="success">
                                <CountUp  start={0} end={Team_Projects_CounterData.completed} delay={0}>
                                    {({ countUpRef }) => (
                                      <div>
                                        <span ref={countUpRef} />
                                      </div>
                                    )}
                                  </CountUp>
                              </Badge>
                   
              </Col>     
              </Row> 
              <br/>
              <Row>
              <Col>
               Assigned
              </Col>  
              <Col>
             <Badge pill bg="warning">
                              <CountUp  start={0} end={Team_Projects_CounterData.all_project} delay={0}>
                                            {({ countUpRef }) => (
                                                <div>
                                                    <span ref={countUpRef} />
                                                </div>
                                            )}
                                </CountUp>
                      </Badge>
                    
              </Col>     
              </Row>    
</Card.Body>
     </Row>
     <Card.Header><b>{team.name}</b> Live Issues Counters</Card.Header>
     <Row>
      
      <Card.Body>
     
    <Row>
              <Col>
              Pending
              </Col>     
              <Col>
               <Badge pill bg="danger">
                              <CountUp  start={0} end={Team_live_issues_CounterData.pending} delay={0}>
                                {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                      )}
                              </CountUp>
                            </Badge>
                         
              </Col>
              </Row>
              <br/>
                <Row>
              <Col>
              Completed
              </Col>  
              <Col>
              <Badge pill bg="success">
                                <CountUp  start={0} end={Team_live_issues_CounterData.completed} delay={0}>
                                    {({ countUpRef }) => (
                                      <div>
                                        <span ref={countUpRef} />
                                      </div>
                                    )}
                                  </CountUp>
                              </Badge>
                   
              </Col>     
              </Row> 
              <br/>
              <Row>
              <Col>
               Assigned
              </Col>  
              <Col>
             <Badge pill bg="warning">
                              <CountUp  start={0} end={Team_live_issues_CounterData.all_project} delay={0}>
                                            {({ countUpRef }) => (
                                                <div>
                                                    <span ref={countUpRef} />
                                                </div>
                                            )}
                                </CountUp>
                      </Badge>
                    
              </Col>     
              </Row>    
</Card.Body>
     </Row>
    </Card>
    </Col>
    </Row>
    </Container>
  </Tab>
</Tabs>

      </Card.Body>
    </Card>
  

 
 
<div>
<Modal show={show_team_projects} onHide={handleCloseProjects} size="xl">
          <Modal.Header style={{ backgroundColor: "#90CAF9" }} closeButton>
            <Modal.Title><b>{team.name}</b> Projects </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col> <Col>
              <div  className="col-md-6 col-sm-9">
                  <Form.Group className="mb-3">
                    <Form.Select     name="id" onChange={handleChange} id="id"   required>
                    <option value={0}>Select Team</option>
                                        {
                                        teamsData.map((team, key) =>{
                                        return <option key={key} value={team.id} onSelect={() => selectTeam(team)} >{team.name}</option>
                                        })                
                                        }
                    </Form.Select>
                  </Form.Group>
                  </div>
                  </Col>
              </Col>
              <Col> <Nav  className="justify-content-end">
                 <div  className="col-md-6 col-sm-8">
                   <Form onSubmit={handle_Search_Project_Submit} className="d-flex">
                      <FormControl type="search" name='project_search' placeholder="Search" onChange={handleChange} className="mr-3" aria-label="Search" />
                      <Button variant="outline-success" type='submit' size='sm'>Search</Button>
                    </Form>
                  </div>
                  </Nav>
              </Col>
            </Row>
         
          <Table size="sm" striped bordered hover>
                        <thead>
                            <tr> 
                            <th>Name</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th >PM</th> 
                            <th> </th>
                            </tr>    
                        </thead> 
                        <tbody>
                        {
                             projectData.map((project, Index) =>{
                               return <tr key={Index} >
                               <td>{project.name}</td>
                               <td> {project.project_category_type.name}</td>
                               <td> {project.project_type.name}</td>
                               <td>{project.user.name}</td>
                               <td className="text-center"><button size='sm' onClick={handleCloseProjects}><Button variant="outline-success" size='sm'  onClick={() => selectProject(project) }>Select</Button> </button> </td> 
                               </tr>
                             })
                           }   
                    </tbody>
                </Table> 
 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProjects}>
              Close
            </Button>
          </Modal.Footer>
</Modal>
<Modal show={show_teams} onHide={handleCloseTeams} size="xl">
          <Modal.Header style={{ backgroundColor: "#90CAF9" }} closeButton>
            <Modal.Title>Teams </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table size="sm"  striped bordered hover>
                        <thead>
                            <tr> 
                            <th>Name</th>
                            <th >Team Leader</th> 
                            <th> </th>
                            </tr>    
                        </thead> 
                        <tbody>
                           {
                             teamsData.map((team, Index) =>{
                               return <tr key={Index} >
                               <td>{team.name}</td>
                               <td>{team.team_lead.name}</td>
                               <td className="text-center"><button size='sm' onClick={handleCloseTeams}><Button variant="outline-success" size='sm' onClick={() => selectTeam(team)} >Select</Button></button>  </td> 
                          
                               </tr>
                             })
                           }
                    </tbody>
                </Table> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size='sm' onClick={handleCloseTeams}>
              Close
            </Button>
          </Modal.Footer>
</Modal>
</div>



<Modal show={showAddProject} onHide={handleAddProjectClose} animation={false}>
         <Modal.Header closeButton>
           <Modal.Title>Add New Project</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Form onSubmit={handle_Add_Project_Submit}>
         <FormGroup>
             <Label >  Project Category : </Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="project_category_type_id"  onChange={handleChange} id="project_category_type_id" value={projectFormValue.project_category_type_id}  required>
                         <option value="">Select Project Category</option>
                         {projectCategoryTypeData.map((project_category_type, key) =>{
                         return <option key={key} value={project_category_type.id}>{project_category_type.name}</option>
                         })                  
                         }
                     </select>
                 </div> 
         </FormGroup>
                 <FormGroup>
             <Label >  Project Type : </Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="project_type_id" onChange={handleChange} id="project_type_id" value={projectFormValue.project_type_id}  required>
                         <option value="">Select Project Type</option>
                         {projectTypeData.map((project_type, key) =>{
                         return <option key={key} value={project_type.id}>{project_type.name}</option>
                         })                  
                         }
                     </select>
                 </div> 
         </FormGroup>
         <br/>
         <InputGroup className="mb-3">
          <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
          <FormControl
            aria-label="ProjectName"
            aria-describedby="name"
            name="name" 
            placeholder="with a Project" 
            type="text" 
            onChange={handleChange} 
            value={projectFormValue.name} 
            required
          />
        </InputGroup>
         <Form.Group className="mb-3" >
       <Form.Label>BRD Available :</Form.Label>
             <div className="form-group dropdown">
                 <select className="form-control" name="business_request_document_status" id="business_request_document_status" onChange={handleChange} value={projectFormValue.business_request_document_status} required>
                   <option value="">BRD Status</option>
                   <option value={true}>Yes</option>
                   <option value={false}>No</option>                         
                 </select>
             </div>
       </Form.Group>               
       <FormGroup>
         <Label>BRD File</Label>
             <Form.Control type="file"   name="business_request_document_link" onChange={handleChange}  />
             <Input  name="business_request_document_link" defaultValue="none" placeholder="file link" type="text" onChange={handleChange} value={projectFormValue.business_request_document_link} />
       </FormGroup>
         <FormGroup>
             <Label >  Team : </Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="team_id" onChange={handleChange} id="team_id"   required>
                         <option value="">Select Team</option>
                         {teamsData.map((team, key) =>{
                         return <option key={key} value={team.id}>{team.name}</option>
                         })                  
                         }
                     </select>
                 </div> 
         </FormGroup>
         <FormGroup>
             <Label >PM : </Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="user_id" onChange={handleChange} id="user_id"   required>
                         <option value="">Select PM</option>
                         {userData.map((user, key) =>{
                         return <option key={key} value={user.id} >{user.name}</option>
                         })                  
                         }
                     </select>
                 </div> 
         </FormGroup>
         <FormGroup>
             <Label>  Status :</Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="project_status_id" onChange={handleChange} id="project_status_id"   required>
                         <option value="">Assign</option>
                         <></>
                         {
                         statusData.map((status, key) =>{
                         return <option key={key} value={status.id}>{status.name}</option>
                         })                
                         }
                     </select>
                 </div>  
         </FormGroup>
         <FormGroup>
             <Label>  Priority :</Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="priority_type_id" onChange={handleChange} id="priority_type_id"   required>
                         <option value="">Assign</option>
                         
                         {
                         PriorityData.map((priority, key) =>{
                         return <option key={key} value={priority.id}>{priority.name}</option>
                         })                
                         }
                     </select>
                 </div>  
         </FormGroup>
                           <br />
         <Button variant="primary" type="submit">
             Create Project
         </Button>
         </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" size='sm' onClick={handleAddProjectClose}>
             Close
           </Button>
         
         </Modal.Footer>
       </Modal>
<Modal show={showAddLiveIssue} onHide={handleAddLiveIssueClose} animation={false}>
         <Modal.Header closeButton>
           <Modal.Title>Add Live Issue</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Form onSubmit={handle_Add_Live_Issue}>
         <br/>
         <InputGroup className="mb-3">
          <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
          <FormControl
            aria-label="ProjectName"
            aria-describedby="name"
            name="name" 
            placeholder="with a Project" 
            type="text" 
            onChange={handleChange} 
            value={liveIssueFormValue.name} 
            required
          />
        </InputGroup>
         <Form.Group className="mb-3" >
       <Form.Label>BRD Available :</Form.Label>
             <div className="form-group dropdown">
                 <select className="form-control" name="business_request_document_status" id="business_request_document_status" onChange={handleChange} value={liveIssueFormValue.business_request_document_status} required>
                   <option value="">BRD Status</option>
                   <option value={true}>Yes</option>
                   <option value={false}>No</option>                         
                 </select>
             </div>
       </Form.Group>          
       <FormGroup>
         <Label>BRD File</Label>
             <Form.Control type="file"   name="business_request_document_link" onChange={handleChange}  />
             <Input  name="business_request_document_link" defaultValue="none" placeholder="file link" type="text" onChange={handleChange} value={liveIssueFormValue.business_request_document_link} />
       </FormGroup>
         <FormGroup>
             <Label >  Team : </Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="team_id" onChange={handleChange} id="team_id"   required>
                         <option value="">Select Team</option>
                         {teamsData.map((team, key) =>{
                         return <option key={key} value={team.id}>{team.name}</option>
                         })                  
                         }
                     </select>
                 </div> 
         </FormGroup>
         <FormGroup>
             <Label >PM : </Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="pm_id" onChange={handleChange} id="pm_id"   required>
                         <option value="">Select PM</option>
                         {userData.map((user, key) =>{
                         return <option key={key} value={user.id} >{user.name}</option>
                         })                  
                         }
                     </select>
                 </div> 
         </FormGroup>
         <FormGroup>
             <Label>  Status :</Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="project_status_id" onChange={handleChange} id="project_status_id"   required>
                         <option value="">Assign</option>
                         <></>
                         {
                         statusData.map((status, key) =>{
                         return <option key={key} value={status.id}>{status.name}</option>
                         })                
                         }
                     </select>
                 </div>  
         </FormGroup>
         <FormGroup>
             <Label>  Priority :</Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="priority_type_id" onChange={handleChange} id="priority_type_id"   required>
                         <option value="">Assign</option>
                         
                         {
                         PriorityData.map((priority, key) =>{
                         return <option key={key} value={priority.id}>{priority.name}</option>
                         })                
                         }
                     </select>
                 </div>  
         </FormGroup>
                           <br />
         <Button variant="primary" type="submit">
             Add Live Issue
         </Button>
         </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" size='sm' onClick={handleAddLiveIssueClose}>
             Close
           </Button>
         
         </Modal.Footer>
       </Modal>
 




{/* Toast Arlets */}


<ToastContainer className="p-3" position={'top-end'}>
{/* Successfully Create */}
<Toast onClose={handleCloseSuccessCreate} show={success_create} bg={'success'} delay={5000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{<FcApproval/>}{' '}Successfully</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>  Project Created Successfully</Toast.Body>
        </Toast>
        {/* Error Create */}
<Toast onClose={handleCloseErrorCreate} show={error_create} bg={'warning'} delay={5000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error Occured</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>  please check input or Record already exists</Toast.Body>
        </Toast>


     </ToastContainer>

</div>

)
}

export default DashBoardSDM;