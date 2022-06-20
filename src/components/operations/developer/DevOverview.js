import React from 'react';
import 'chart.js/auto';
import {Card,  Col, Row, Container} from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';

import DevTaskOverviewChart from './charts/TasksOverViewChart';
import ProjectOverviewChart from '../teamLeader/charts/projects/ProjectOverViewChart';

function DevOverview(){

return (
<div>

<Container fluid>
    <Row>
    <Col>
    <Card >
      <Card.Header> Team Projects Overview</Card.Header>
      <Card.Body >
          <div style={{height: "640px"}}>
            <ProjectOverviewChart/>
          </div>
        
      </Card.Body>
    </Card>
    </Col>
    <Col>
    <Card>
      <Card.Header>Tasks Overview</Card.Header>
      <Card.Body >
      <div style={{height: "640px"}} >
          <DevTaskOverviewChart/>
     
      </div>
      
      </Card.Body>
    </Card>
    </Col>
    </Row>
    
    
    </Container>
    

</div>
);
}
export default DevOverview;