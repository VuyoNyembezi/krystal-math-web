
import React, { useEffect, useState } from 'react';
import { Button, Card, CardGroup, Form, FormControl, FormGroup, InputGroup, Modal, Nav, Tab, Table, Tabs, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Input, Label } from 'reactstrap';
import { FcApproval } from "react-icons/fc";

import { URL } from '../../../../server_connections/server';

function OperationalProjects(){
    const history = useNavigate();


// Toast Alerts State Controller
const [success_create,set_success_create] = useState(false);
const handleShowsuccessCreate = () => set_success_create(true);
const handleCloseSuccessCreate = () => set_success_create(false);
// Create Toaster Error
const [error_create,set_error_create] = useState(false);
const handleShowErrorCreate = () => set_error_create(true);
const handleCloseErrorCreate = () => set_error_create(false);


// Update Toaster
const [success_updated,set_success_updated] = useState(false);
const handleShowsuccessUpdate = () => set_success_updated(true);
const handleCloseSuccessUpdate = () => set_success_updated(false);
// update  error toast controller
const [error_updated,set_error_updated] = useState(false); 
const handleShowErrorUpdate = () => set_error_updated(true);
const handleCloseErrorUpdate = () => set_error_updated(false);
// server error toast controller
const [server_error,set_server_error] = useState(false); 
const handleShowServerError = () => set_server_error(true);
const handleCloseServerError = () => set_server_error(false);


// Modal controls

// add project
const [showAddProject, setShowProject] = useState(false);
 const handleClose = () => {setShowProject(false);
  setProjectFormValue({
    id: 0,
    name:"",
    team_id:0,
    user_id:0,
    business_request_document_status:false,
    project_status_id:0,
    business_request_document_link:"",
    priority_type_id: 0 ,
    project_type_id:0,
    project_category_type_id: 1
  });
};
 const handleShow = () => setShowProject(true);

 // Update integration
const [show_update_Project, setShow_Update_Project] = useState(false);
const handleClose_update_Uproject = () => {setShow_Update_Project(false);
  setProjectFormValue({
    id: 0,
    name:"",
    team_id:0,
    user_id:0,
    business_request_document_status:false,
    project_status_id:0,
    business_request_document_link:"",
    priority_type_id: 0 ,
    project_type_id:0,
    project_category_type_id: 1
  });};
const handleShow_update_Project = () => setShow_Update_Project(true);


//Projects Data States
const[ BetSoftwareProjectData, setBETSoftwareProjectData] = useState([]);
const[ CountryData, setCountryData] = useState([]);
const[ CustomerJourneyData, setCustomerJourneyData] = useState([]);
const[ IntegrationsData, setIntegrationsData] = useState([]);
const[ PaymentMethodsData, setPaymentMethodsData] = useState([]);
const[ DigitalMarketingData, setDigitalMarketingData] = useState([]);
const[ BetSoftwarePartnersData, setBETSoftwarePartnersData] = useState([]);

const [projectData,set_ProjectData] = useState({});
//projects attributes States
const [projectCategoryTypeData, setProjectCategoryTypeData] =useState([])
const [teamsData, setTeamsData] = useState([]);
const [statusData,setStatus] = useState([]);
const [projectTypeData, setProjectTypeData] =useState([])
const [PriorityData,setPriorityData] = useState([])
const [userData, setUserData] = useState([])
const [projectFormValue, setProjectFormValue] = useState({
  id: 0,
  name:"",
  team_id:0,
  user_id:0,
  business_request_document_status:false,
  project_status_id:0,
  business_request_document_link:"",
  priority_type_id: 0 ,
  project_type_id:0,
  project_category_type_id: 1
});

// search state 
const [search_key,set_search_key] = useState({
  project_search:null,

})
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
  
  //  fetch teams 
   fetch(`${URL}/api/auth/active/teams`,requestOptions)
     .then(response => response.json())
     .then(res => setTeamsData(res.data))
     
},[])

useEffect(() => {
  const requestOptions = {
    method: "Get",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
      "Content-Type": "application/json",
    },
  };
   //fecth team  projects 
   if(search_key.project_search === null){
   fetch(
    `${URL}/api/auth/projects/operational`,
    requestOptions
  )
    .then((response) => response.json())
    .then((results) => {
      set_ProjectData(results)
      setBETSoftwareProjectData(results.bet_projects)
      setBETSoftwarePartnersData(results.bet_project_partners_projects)
      setCountryData(results.country_projects)
      setCustomerJourneyData(results.customer_journey_projects)
      setDigitalMarketingData(results.digital_marketing_projects)
      setIntegrationsData(results.integrations_projects)
      setPaymentMethodsData(results.payment_method_projects)
    });
  
  }
 
}, [projectData,search_key.project_search]);



 
const handleChange =(event) => {

      setProjectFormValue({
        ...projectFormValue,
        [event.target.name]: event.target.value
      })
      set_search_key ({
        ...search_key,
        [event.target.name]: event.target.value
      })
   }

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
    
    fetch(`${URL}/api/auth/projects/operational/search?search=${search_key.project_search}`,requestOptions)
    .then(response => response.json())
    .then(Result => {
      setBETSoftwareProjectData(Result.bet_projects);
      setBETSoftwarePartnersData(Result.bet_project_partners_projects);
      setCountryData(Result.country_projects);
      setCustomerJourneyData(Result.customer_journey_projects);
      setDigitalMarketingData(Result.digital_marketing_projects);
      setIntegrationsData(Result.integrations_projects);
      setPaymentMethodsData(Result.payment_method_projects);
    } )

  
  }



 // Create Project Record
 function handle_Add_Project_Submit(event){
  const now_date = new Date();
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
      project_category_type_id: projectFormValue.project_category_type_id,
      last_status_change: now_date.toISOString()
    }
})  
})
.then((response) => {
  response.json()
  if(response.status === 201){
    handleShowsuccessCreate();
    handleClose();
  }
  else if(response.status === 422){
    handleShowErrorCreate();
    
  }
  else if(response.status === 401){
    history('/')
  }
  else if(response.status === 500){
    handleShowServerError();
  }
})
}
 
 // ############   PUT OR UPDATE FUNCTIONS ################
 
 //Update project details
 function handle_Update_Project_Submit(event){
  event.preventDefault();
  fetch(`${URL}/api/auth/update/project`,{
    method: 'put',
    headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('key')}`
    },
  body: JSON.stringify({
    id: projectFormValue.id,
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
  if(response.status === 200){
    handleShowsuccessUpdate();
    handleClose_update_Uproject();
  }
  else if(response.status === 422){
    handleShowErrorUpdate();
  }
  else if(response.status === 401){
    history('/')
  }
  else if(response.status === 500){
    handleShowServerError();
  }
})
}

 function selectProject(project){
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
 }

     return(
         <>
          <Tab.Container id="left-tabs-example" defaultActiveKey="default" >
         <Tab.Content>
         <CardGroup>
           <Card>
             <Card.Header>
                 <h6>Operational Projects</h6> 
                 <Button variant="outline-warning" size='sm'  onClick={handleShow}>Add Project</Button>
                 <Nav  className="justify-content-end">
                 <div  className="col-md-3 col-sm-9">
                   <Form onSubmit={handle_Search_Project_Submit} className="d-flex">
                      <FormControl type="search"  name='project_search' placeholder="Search" required onChange={handleChange} className="mr-3" aria-label="Search" />
                      <Button variant="outline-success" type='submit' size='sm'>Search</Button>
                    </Form>
                  </div>
                  </Nav>
                  </Card.Header>
                  <Card.Body>
               <Tabs defaultActiveKey="operational_bet_project" id="uncontrolled-tab-example" className="mb-3">
                  <Tab eventKey="operational_bet_project" title="BET Projects">
                  <Table size='sm' striped bordered hover>
                   <thead>
                     <tr>
                       <th>Project Name</th>
                       <th>BRD</th>
                       <th>Status</th>
                       <th>PM</th>
                       <th>Team</th>
                     </tr>
                   </thead>
                   <tbody>
                     
                     {  
                     BetSoftwareProjectData.map((project, key)=>{
                       return <tr key={key}>
                          <td>{project.name}</td>
                          <td>
                         <Form.Select size="sm"  value={project.business_request_document_status} disabled>
                             <option value={true}>Yes</option>
                             <option value={false}>No</option>
                         </Form.Select></td>
                         <td>{project.project_status.name}</td>
                         <td>{project.user.name}</td>
                         <td>{project.team.name}</td>
                         <td className='text-center'><button size='sm' onClick={() => selectProject(project)}><Button variant="outline-success" size='sm' onClick={handleShow_update_Project}>Update</Button></button></td>
                       </tr>
                     })
                     } 
                     
                     
                   </tbody>
                 </Table>
                  </Tab>
                  <Tab eventKey="operational_country" title="Country">
                  <Table size='sm' striped bordered hover>
                   <thead>
                     <tr>
                       <th>Project Name</th>
                       <th>BRD</th>
                       <th>Status</th>
                       <th>PM</th>
                       <th>Team</th>
                     </tr>
                   </thead>
                   <tbody>{
                     CountryData.map((project, key)=>{
                       return <tr key={key}>
                          <td>{project.name}</td>
                          <td>
                         <Form.Select size="sm"  value={project.business_request_document_status} disabled>
                             <option value={true}>Yes</option>
                             <option value={false}>No</option>
                         </Form.Select></td>
                         <td>{project.project_status.name}</td>
                         <td>{project.user.name}</td>
                         <td>{project.team.name}</td>
                         <td className='text-center'><button size='sm' onClick={() => selectProject(project)}><Button variant="outline-success" size='sm' onClick={handleShow_update_Project}>Update</Button></button></td>
                       </tr>
                     })
                     }
                   </tbody>
                 </Table>
                  </Tab>
                  <Tab eventKey="operational_customer_journey" title="Customer Journey" >
                  <Table size='sm' striped bordered hover>
                   <thead>
                     <tr>
                       <th>Project Name</th>
                       <th>BRD</th>
                       <th>Status</th>
                       <th>PM</th>
                       <th>Team</th>
                     </tr>
                   </thead>
                   <tbody>{
                     CustomerJourneyData.map((project, key)=>{
                       return <tr key={key}>
                          <td>{project.name}</td>
                          <td>
                         <Form.Select size="sm"  value={project.business_request_document_status} disabled>
                             <option value={true}>Yes</option>
                             <option value={false}>No</option>
                         </Form.Select></td>
                         <td>{project.project_status.name}</td>
                         <td>{project.user.name}</td>
                         <td>{project.team.name}</td>
                         <td className='text-center'><button size='sm' onClick={() => selectProject(project)}><Button variant="outline-success" size='sm' onClick={handleShow_update_Project}>Update</Button></button></td>
                       </tr>
                     }) 
                     }
                   </tbody>
                 </Table>
                  </Tab>
                  <Tab eventKey="operational_integrations" title="Integrations">
                  <Table size='sm' striped bordered hover>
                   <thead>
                     <tr>
                       <th>Project Name</th>
                       <th>BRD</th>
                       <th>Status</th>
                       <th>PM</th>
                       <th>Team</th>
                     </tr>
                   </thead>
                   <tbody>{
                     IntegrationsData.map((project, key)=>{
                       return <tr key={key}>
                          <td>{project.name}</td>
                          <td>
                         <Form.Select size="sm"  value={project.business_request_document_status} disabled>
                             <option value={true}>Yes</option>
                             <option value={false}>No</option>
                         </Form.Select></td>
                         <td>{project.project_status.name}</td>
                         <td>{project.user.name}</td>
                         <td>{project.team.name}</td>
                         <td className='text-center'><button size='sm' onClick={() => selectProject(project)}><Button variant="outline-success" size='sm' onClick={handleShow_update_Project}>Update</Button></button></td>
                       </tr>
                     }) 
                     }
                   </tbody>
                 </Table>
                  </Tab>
                  <Tab eventKey="operational_payment_methods" title="Payment Methods/Gateways">
                  <Table size='sm' striped bordered hover>
                   <thead>
                     <tr>
                       <th>Project Name</th>
                       <th>BRD</th>
                       <th>Status</th>
                       <th>PM</th>
                       <th>Team</th>
                     </tr>
                   </thead>
                   <tbody>{
                     PaymentMethodsData.map((project, key)=>{
                       return <tr key={key}>
                          <td>{project.name}</td>
                          <td>
                         <Form.Select size="sm"  value={project.business_request_document_status} disabled>
                             <option value={true}>Yes</option>
                             <option value={false}>No</option>
                         </Form.Select></td>
                         <td>{project.project_status.name}</td>
                         <td>{project.user.name}</td>
                         <td>{project.team.name}</td>
                         <td className='text-center'><button size='sm' onClick={() => selectProject(project)}><Button variant="outline-success" size='sm' onClick={handleShow_update_Project}>Update</Button></button></td>
                       </tr>
                     }) 
                     }
                   </tbody>
                 </Table>
                  </Tab>
                  <Tab eventKey="operational_digital_marketing" title="Digital Marketing" >
                  <Table size='sm' striped bordered hover>
                   <thead>
                     <tr>
                       <th>Project Name</th>
                       <th>BRD</th>
                       <th>Status</th>
                       <th>PM</th>
                       <th>Team</th>
                     </tr>
                   </thead>
                   <tbody>{
                     DigitalMarketingData.map((project, key)=>{
                       return <tr key={key}>
                          <td>{project.name}</td>
                          <td>
                         <Form.Select size="sm"  value={project.business_request_document_status} disabled>
                             <option value={true}>Yes</option>
                             <option value={false}>No</option>
                         </Form.Select></td>
                         <td>{project.project_status.name}</td>
                         <td>{project.user.name}</td>
                         <td>{project.team.name}</td>
                         <td className='text-center'><button size='sm' onClick={() => selectProject(project)}><Button variant="outline-success" size='sm' onClick={handleShow_update_Project}>Update</Button></button></td>
                       </tr>
                     })
                     }
                   </tbody>
                 </Table>
                  </Tab>
                  <Tab eventKey="operational_bet_software_partners" title="BET Software Partners" >
                  <Table size='sm' striped bordered hover>
                   <thead>
                     <tr>
                       <th>Project Name</th>
                       <th>BRD</th>
                       <th>Status</th>
                       <th>PM</th>
                       <th>Team</th>
                     </tr>
                   </thead>
                   <tbody>{
                     BetSoftwarePartnersData.map((project, key)=>{
                       return <tr key={key}>
                          <td>{project.name}</td>
                          <td>
                         <Form.Select size="sm"  value={project.business_request_document_status} disabled>
                             <option value={true}>Yes</option>
                             <option value={false}>No</option>
                         </Form.Select></td>
                         <td>{project.project_status.name}</td>
                         <td>{project.user.name}</td>
                         <td>{project.team.name}</td>
                         <td className='text-center'><button size='sm' onClick={() => selectProject(project)}><Button variant="outline-success" size='sm' onClick={handleShow_update_Project}>Update</Button></button></td>
                       </tr>
                     })       
                     }
                   </tbody>
                 </Table>
                 </Tab>
                </Tabs>
             </Card.Body> 
           </Card>
         </CardGroup>
         </Tab.Content>
         </Tab.Container>
 
 
 {/* MODALS  */}
 
 {/* ADD/CREATE  Modals  */}

 
 {/* Projects */}
       <Modal show={showAddProject} onHide={handleClose} animation={false}>
         <Modal.Header closeButton>
           <Modal.Title>Add Project</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Form onSubmit={handle_Add_Project_Submit}>
         <FormGroup>
             <Label >  Project Category : </Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="project_category_type_id"  onChange={handleChange} id="project_category_type_id" value={projectFormValue.project_category_type_id} disabled  required>
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
            placeholder="Project Name" 
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
         <Button variant="primary" size='sm' type="submit">
             Create Project
         </Button>
         </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" size='sm' onClick={handleClose}>
             Close
           </Button>
           <Button variant="success" size='sm' onClick={handleClose}>
             Done
           </Button>
         </Modal.Footer>
       </Modal>

 {/* UPDATE MODALS */}


 {/* Update modal for Projects */}
 <Modal show={show_update_Project} onHide={handleClose_update_Uproject} animation={false}>
         <Modal.Header closeButton>
           <Modal.Title>Update  <b>{projectFormValue.name}</b></Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Form onSubmit={handle_Update_Project_Submit}>
         <FormGroup>
             <Label >  Project Category : </Label>
             <div className="form-group dropdown">
                     <select className="form-control" name="project_category_type_id"  onChange={handleChange} id="project_category_type_id" value={projectFormValue.project_category_type_id} disabled  required>
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
            placeholder="Project Name" 
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
                     <select className="form-control" name="team_id" onChange={handleChange} id="team_id"  value={projectFormValue.team_id}  required>
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
                     <select className="form-control" name="user_id" onChange={handleChange} id="user_id"   value={projectFormValue.user_id} required>
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
                     <select className="form-control" name="project_status_id" onChange={handleChange} id="project_status_id"  value={projectFormValue.project_status_id}  required>
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
                     <select className="form-control" name="priority_type_id" onChange={handleChange} id="priority_type_id"  value={projectFormValue.priority_type_id}  required>
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
         <Button variant="primary" size='sm' type="submit">
             Update Project
         </Button>
         </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" size='sm' onClick={handleClose_update_Uproject}>
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

{/* Successfully Updated */}
           <Toast onClose={handleCloseSuccessUpdate} show={success_updated} bg={'success'} delay={5000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{<FcApproval/>}{' '}Successfully</strong>
          
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
          <Toast.Body className='text-white'>please check input or value already assigned</Toast.Body>
        </Toast>

         {/*  Server Error  */}
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
     )
}
export default OperationalProjects;