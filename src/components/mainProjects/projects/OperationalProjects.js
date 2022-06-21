import React, { useEffect, useState } from 'react';
import {  Badge, Button, Card, CardGroup, Col, Container, Form, FormControl, Nav, Row, Tab, Table, Tabs } from 'react-bootstrap';


import { URL } from '../../../server_connections/server';

function OperationalProjects(){

const[ BetSoftwareProjectData, setBETSoftwareProjectData] = useState([]);
const[ CountryData, setCountryData] = useState([]);
const[ CustomerJourneyData, setCustomerJourneyData] = useState([]);
const[ IntegrationsData, setIntegrationsData] = useState([]);
const[ PaymentMethodsData, setPaymentMethodsData] = useState([]);
const[ DigitalMarketingData, setDigitalMarketingData] = useState([]);
const[ BetSoftwarePartnersData, setBETSoftwarePartnersData] = useState([]);
const [all_projectData,set_all_ProjectData] = useState([]);


// search state 
const [search_key,set_search_key] = useState({
  project_search:null
});

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
   
      setBETSoftwareProjectData(results.bet_projects)
      setBETSoftwarePartnersData(results.bet_project_partners_projects)
      setCountryData(results.country_projects)
      setCustomerJourneyData(results.customer_journey_projects)
      setDigitalMarketingData(results.digital_marketing_projects)
      setIntegrationsData(results.integrations_projects)
      setPaymentMethodsData(results.payment_method_projects)
      set_all_ProjectData(results.all_projects)
    });
  }
 
}, [search_key.project_search]);


const handleChange =(event) => {
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
    
    fetch(`${URL}/api/auth/projects/operational/search/?search=${search_key.project_search}`,requestOptions)
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
   //     //fetch all operational
   fetch(`${URL}/api/auth/projects/operational/search/all?search=${search_key.project_search}`,requestOptions)
   .then(response => response.json())
   .then(Result => set_all_ProjectData(Result.data) )
  
  }
     
return(


        <Container  fluid>
         <Row >
           <Col >
           <Tab.Container defaultActiveKey="operational_bet_project" >
        <Tab.Content>
        <CardGroup>
          <Card>
            <Card.Header>
                <h6>Operational Projects</h6>
                <Nav  className="justify-content-end">
                 <div  className="col-md-3 col-sm-9">
                   <Form onSubmit={handle_Search_Project_Submit} className="d-flex">
                      <FormControl type="search" name='project_search' placeholder="Search" required onChange={handleChange} className="mr-3" aria-label="Search" />
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
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>{
                    BetSoftwareProjectData.map((project, key)=>{
                      return <tr key={key}>
                         <td>{project.name}</td>
                        <td><Form.Select size="sm"  value={project.business_request_document_status} disabled>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Form.Select>
                        </td>
                        <td>{project.project_status.name}</td>
                        <td>{project.user.name}</td>
                        <td>{project.team.name}</td>
                        <td><Badge  style={{height: "25px"}} bg={project.priority_type.level} size='sm' ><p>{project.priority_type.name}</p></Badge></td>
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
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>{
                    CountryData.map((project, key)=>{
                      return <tr key={key}>
                         <td>{project.name}</td>
                        <td><Form.Select size="sm"  value={project.business_request_document_status} disabled>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Form.Select>
                        </td>
                        <td>{project.project_status.name}</td>
                        <td>{project.user.name}</td>
                        <td>{project.team.name}</td>
                        <td><Badge  style={{height: "25px"}} bg={project.priority_type.level} size='sm' ><p>{project.priority_type.name}</p></Badge></td>
                      </tr>
                    })
                    }
                  </tbody>
                </Table>
                  </Tab>
                  <Tab eventKey="operational_customer_journey" title="Customer Journey" >
                
                <Table size='sm'  striped bordered hover>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>BRD</th>
                      <th>Status</th>
                      <th>PM</th>
                      <th>Team</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>{
                    CustomerJourneyData.map((project, key)=>{
                      return <tr key={key}>
                         <td>{project.name}</td>
                        <td><Form.Select size="sm"  value={project.business_request_document_status} disabled>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Form.Select>
                        </td>
                        <td>{project.project_status.name}</td>
                        <td>{project.user.name}</td>
                        <td>{project.team.name}</td>
                        <td><Badge  style={{height: "25px"}} bg={project.priority_type.level} size='sm' ><p>{project.priority_type.name}</p></Badge></td>
                      </tr>
                    })
                    }
                  </tbody>
                </Table>
                  </Tab>
                  <Tab eventKey="operational_integrations" title="Integrations">
                <Table size='sm'  striped bordered hover>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>BRD</th>
                      <th>Status</th>
                      <th>PM</th>
                      <th>Team</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>{
                    IntegrationsData.map((project, key)=>{
                      return <tr key={key}>
                         <td>{project.name}</td>
                        <td><Form.Select size="sm"  value={project.business_request_document_status} disabled>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Form.Select>
                        </td>
                        <td>{project.project_status.name}</td>
                        <td>{project.user.name}</td>
                        <td>{project.team.name}</td>
                        <td><Badge  style={{height: "25px"}} bg={project.priority_type.level} size='sm' ><p>{project.priority_type.name}</p></Badge></td>
                      </tr>
                    })
                    }
                  </tbody>
                </Table>
                  </Tab>
                  <Tab eventKey="operational_payment_methods" title="Payment Methods/Gateways">
                <Table size='sm'  striped bordered hover>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>BRD</th>
                      <th>Status</th>
                      <th>PM</th>
                      <th>Team</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>{
                    PaymentMethodsData.map((project, key)=>{
                      return <tr key={key}>
                         <td>{project.name}</td>
                        <td><Form.Select size="sm"  value={project.business_request_document_status} disabled>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Form.Select>
                        </td>
                        <td>{project.project_status.name}</td>
                        <td>{project.user.name}</td>
                        <td>{project.team.name}</td>
                        <td><Badge  style={{height: "25px"}} bg={project.priority_type.level} size='sm' ><p>{project.priority_type.name}</p></Badge></td>
                      </tr>
                    })
                    }
                  </tbody>
                </Table>
                  </Tab>
                  <Tab eventKey="operational_digital_marketing" title="Digital Marketing" >
                <Table size='sm'  striped bordered hover>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>BRD</th>
                      <th>Status</th>
                      <th>PM</th>
                      <th>Team</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>{
                    DigitalMarketingData.map((project, key)=>{
                      return <tr key={key}>
                         <td>{project.name}</td>
                        <td><Form.Select size="sm"  value={project.business_request_document_status} disabled>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Form.Select>
                        </td>
                        <td>{project.project_status.name}</td>
                        <td>{project.user.name}</td>
                        <td>{project.team.name}</td>
                        <td><Badge  style={{height: "25px"}} bg={project.priority_type.level} size='sm' ><p>{project.priority_type.name}</p></Badge></td>
                      </tr>
                    })
                    }
                  </tbody>
                </Table>
                  </Tab>
                  <Tab eventKey="operational_bet_software_partners" title="BET Software Partners" >
       
                <Table size='sm'  striped bordered hover>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>BRD</th>
                      <th>Status</th>
                      <th>PM</th>
                      <th>Team</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>{
                    BetSoftwarePartnersData.map((project, key)=>{
                      return <tr key={key}>
                         <td>{project.name}</td>
                        <td><Form.Select size="sm"  value={project.business_request_document_status} disabled>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Form.Select>
                        </td>
                        <td>{project.project_status.name}</td>
                        <td>{project.user.name}</td>
                        <td>{project.team.name}</td>
                        <td><Badge  style={{height: "25px"}} bg={project.priority_type.level} size='sm' ><p>{project.priority_type.name}</p></Badge></td>
                      </tr>
                    })
                    }
                  </tbody>
                </Table>
                 </Tab>
                 <Tab eventKey="operational_projects" title="All" >          
                <Table size='sm'  striped bordered hover>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>BRD</th>
                      <th>Status</th>
                      <th>PM</th>
                      <th>Team</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>{
                    all_projectData.map((project, key)=>{
                      return <tr key={key}>
                         <td>{project.name}</td>
                        <td><Form.Select size="sm"  value={project.business_request_document_status} disabled>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Form.Select>
                        </td>
                        <td>{project.project_status.name}</td>
                        <td>{project.user.name}</td>
                        <td>{project.team.name}</td>
                        <td><Badge  style={{height: "25px"}} bg={project.priority_type.level} size='sm' ><p>{project.priority_type.name}</p></Badge></td>
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
           </Col>         
         </Row>
        </Container>
    )
}
export default OperationalProjects;