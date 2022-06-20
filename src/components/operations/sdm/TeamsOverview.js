import React, { useState,useEffect  } from 'react';
import 'chart.js/auto';
import {Pie} from 'react-chartjs-2';
import CountUp from 'react-countup';
import {Card, CardGroup, Table, Button,  Form,  Col, Row,Badge, FormControl, Nav, Tabs, Tab} from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';

import { URL } from '../../../server_connections/server';

function TeamsOverview(){
    // const history = useNavigate()
    const [projectData,setProjectData] = useState([]);
    const [ProjectCategoryType,setProjectCategoryType] = useState([]);
    const [teamValue, setTeamValue] = useState([]);

    // team project status overview
    const [team_project_statuses, set_team_project_statuses] = useState([])

  

//All Live Issues Statuses
const [team_live_issues_statuses, set__team_live_issues_statsuses] = useState([])
    // Team Over view Stats
      // Team overview i.e Completed project and Pending project
    const [Team_Projects_CounterData, set_Team_Projects_Counter_Data] = useState([])
        // Team overview i.e Completed project and Pending project
        const [Team_Live_Issues_CounterData, set_Team_Live_Issues_Counter_Data] = useState([])
    // team value state
    const [team, setTeam]= useState({
      id: 0,
      name: ""
    })
    // project category state
    const [projectCategory, setprojectCategory]= useState({
      project_category_type_id: 0
    })
    // search state 
const [search_key,set_search_key] = useState({
  project_search:null,

})  
    useEffect(() => { 
        const requestOptions ={
          method:'Get',
          headers:{
              'Accept':'application/json',
              'Authorization': `Bearer ${localStorage.getItem('key')}`
            ,'Content-Type': 'application/json'},
        }
          // fetch all teams (for form use)
           fetch(`${URL}/api/auth/active/teams`,requestOptions)
           .then(response => response.json())
           .then(res => setTeamValue(res.data))

}, [])

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
// Team projects Data
useEffect(()=>{
  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  }
   
    // team project status overview
    fetch(`${URL}/api/auth/team_projects/overview/count?team_id=${team.id}`,requestOptions)
    .then((response) => response.json())
    .then(Result => set_team_project_statuses(Result))

       // team project status overview
       fetch(`${URL}/api/auth/live_issues/team/count/statuses?team_id=${team.id}`,requestOptions)
       .then((response) => response.json())
       .then(Result => set__team_live_issues_statsuses(Result))

    // Counters
 // All  Team Project 

   fetch(`${URL}/api/auth/team/project/count?team_id=${team.id}`,requestOptions)
   .then((response) => response.json())
   .then(Result => set_Team_Projects_Counter_Data(Result));

   fetch(`${URL}/api/auth/live_issues/team/count/overview?team_id=${team.id}`,requestOptions)
   .then((response) => response.json())
   .then(Result => set_Team_Live_Issues_Counter_Data(Result))
},[team.id])

useEffect(()=>{
  const requestOptions ={
    method:'Get',
    headers:{
        'Accept':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
      ,'Content-Type': 'application/json'},
  }
// Fetch team projects 
if(search_key.project_search === null){
    // fetch all projects assigned to the team

    fetch(`${URL}/api/auth/team/projects/category_type/all?team_id=${team.id}&category_type=${projectCategory.project_category_type_id}`,requestOptions)
    .then(response => response.json())
    .then(res => setProjectData(res.data))
}
    else if(search_key.project_search !== null){
      // fetch all team projects searched 
      fetch(`${URL}/api/auth/projects/team/category/search?team_id=${team.id}&category_type=${projectCategory.project_category_type_id}&search=${search_key.project_search}`,requestOptions)
      .then(response => response.json())
      .then(res => setProjectData(res.data))
      }
},[team.id, projectCategory.project_category_type_id,search_key])

// All System project Project Chart Data 
const project_data ={
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
        ],
}
]};
// All System Live Issues Chart Data 
const live_issues_data ={
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
  
    // fetch all team projects searched 
    fetch(`${URL}/api/auth/projects/team/category/search?team_id=${team.id}&category_type=${projectCategory.project_category_type_id}&search=${search_key.project_search}`,requestOptions)
    .then(response => response.json())
    .then(res => setProjectData(res.data))
  }

  
const handleChange =(event) => { 
   
  setTeam({
    ...team,
    [event.target.name] : event.target.value
})

setprojectCategory({
  ...projectCategory,
  [event.target.name] : event.target.value
})

set_search_key ({
  ...search_key,
  [event.target.name]: event.target.value
})

}
function selectTeam(team){
  setTeam(
        {
            id: team.id,
            name: team.name
        })         
}

return(
<div>
<br/>
    <CardGroup>
      <Col sm={4}> 
       <Card className="shadow" style={{height:'47rem'}}>
        <Card.Title>Teams</Card.Title>
            <Card.Body>
          
                <Table size='sm' striped bordered hover>
                        <thead>
                            <tr> 
                            <th > Name </th> 
                            <th > Team Leader </th> 
                            <th >  </th> 
                            </tr>    
                        </thead> 
                        <tbody>{
                            teamValue.map((team, Index)=>{
                                return<tr key={Index}>
                                    <th scope="row">{team.name}</th>
                                    <td>{team.team_lead.name}</td>
                                    <td className="text-center">
                                      {'  ' } {'  ' }
                                     <Button variant="outline-success" size='sm'  onClick={() => selectTeam(team)}>Select</Button>
                                     </td>
                                    
                            </tr>
                        })
                    } 
                    </tbody>
                </Table> 
            </Card.Body>
    <Card.Footer>
      <small className="text-muted">only active users are listed</small>
    </Card.Footer>
       </Card   >
      </Col>  
      <Col  sm={8}>
        <Row>
          <Col  >
            <Card className="shadow" style={{height:'47rem'}}>
              <Card.Header><b>{team.name }</b>{' '} over view</Card.Header>
                  <Card.Body>
                 <Tabs defaultActiveKey="projects" transition={true}  className="mb-3">
                    <Tab eventKey="projects" title="Projects">
                    <div style={{width: "400px", }}>
                              <Pie data={project_data} />
                            </div>
                            
                  <>
      <Card.Header>Project Stats</Card.Header>
      <Card.Body>
              <Row>
              <Col>
              Not Completed 
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
              Total
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
      </>
                      </Tab>
                      <Tab eventKey="live_issues" title="Live Issues">
                      <div style={{width: "400px", }}>
                              <Pie data={live_issues_data} />
                            </div> 
              
                  <>
      <Card.Header>Live Issues Stats</Card.Header>
      <Card.Body>
              <Row>
              <Col>
              Not Completed 
              </Col>     
              <Col>
              <Badge pill bg="danger">
                              <CountUp  start={0} end={Team_Live_Issues_CounterData.pending} delay={0}>
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
                                <CountUp  start={0} end={Team_Live_Issues_CounterData.completed} delay={0}>
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
              Total
              </Col>  
              <Col>
             <Badge pill bg="warning">
                              <CountUp  start={0} end={Team_Live_Issues_CounterData.all_project} delay={0}>
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
      </>
                      </Tab> 
                </Tabs>
                  </Card.Body>
                 
                
            </Card>
            </Col>
            <Col> 
            <Card className="shadow" style={{height:'47rem'}}>
            <Card.Header><b>{team.name }</b>{' '}projects</Card.Header>
                <Card.Body>
                <div  className="col-md-5 col-sm-9">
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select     name="project_category_type_id" id="project_category_type_id" onChange={handleChange}  required>
                                        <option value={0}>Select Category</option>
                                        {
                                        ProjectCategoryType.map((project_type, key) =>{
                                        return <option key={key} value={project_type.id}>{project_type.name}</option>
                                        })                
                                        }
                    </Form.Select>
                </Form.Group>
                </div>
                <Nav  className="justify-content-end">
                 <div  className="col-md-5 col-sm-9">
                   <Form onSubmit={handle_Search_Project_Submit} className="d-flex">
                      <FormControl type="search" required name='project_search' placeholder="Search (Auto)" onChange={handleChange} className="mr-3" aria-label="Search" />
                    </Form>
                  </div>
                  </Nav>
                  <Table size='sm' striped bordered hover>
                        <thead>
                            <tr> 
                            <th > Name </th> 
                            <th > Status </th> 
                            </tr>    
                        </thead> 
                        <tbody>{
                            projectData.map((project, Index)=>{
                                return<tr key={Index}>
                                    <th scope="row">{project.name}</th>
                                    <td>{project.project_status.name}</td>
                            </tr>
                        })
                    } 
                    </tbody>
                </Table> 
                  </Card.Body>
            </Card>
      </Col>
       </Row>
      </Col>
  
</CardGroup>


</div>
);
}
export default TeamsOverview;