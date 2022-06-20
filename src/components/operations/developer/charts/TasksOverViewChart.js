
import React,{useEffect,useState} from 'react';
import 'chart.js/auto';
import {Pie} from 'react-chartjs-2';
import { URL } from '../../../../server_connections/server';
import { Token } from '../../../../server_connections/server';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import CountUp from 'react-countup';


function DevTaskOverviewChart() {
 
  const [user_task_statuses, set_user_task_statuses] = useState([]);

    // Task
    const [DevTaskCounterData, setDevTaskCounterData] = useState([]);

  useEffect(()=>{
    const requestOptions ={
      method:'Get',
      headers:{
          'Accept':'application/json',
          'Authorization': `Bearer ${Token}`
        ,'Content-Type': 'application/json'},
    }

    // Dev Task Status Counters
    fetch(`${URL}/api/auth/user/tasks_status?team_id=${localStorage.getItem('team')}&id=${localStorage.getItem('SUID')}`,requestOptions)
    .then((response) => response.json())
    .then(Result => set_user_task_statuses(Result))
    
    // Dev Task  Ovver view Counters
    fetch(`${URL}/api/auth/task/user/count?team_id=${localStorage.getItem('team')}&id=${localStorage.getItem('SUID')}`,requestOptions)
    .then((response) => response.json())
    .then(Result => setDevTaskCounterData(Result))

  },[user_task_statuses])

  const data ={
    labels: ["Not Started","On Hold","In Progress","Testing","Completed", "Over Due"],
    datasets:[{
        data: [
          user_task_statuses.not_started,
          user_task_statuses.on_hold,
          user_task_statuses.in_progress,
          user_task_statuses.testing,
          user_task_statuses.completed,
          DevTaskCounterData.over_due
        ],
        backgroundColor:[
          "#BCB3AF",
          "#E6581B",
          "#1672EB",
          "#E4DD86",
          "#229577",
          "#E43A3A"
        ],
        borderColor:[
          "#BCB3AF",
          "#E6581B",
          "#1672EB",
          "#E4DD86",
          "#229577",
          "#E43A3A"
        ]
    }
    ]};

  return (
    <>
     <div style={{width: "400px", }}>
        <Pie data={data} />
      </div>
      <>
      <Card.Header>Tasks Stats</Card.Header>
      <Card.Body>
        <Row>
              <Col>
               Not Completed
              </Col>     
              <Col>
             <Badge pill bg="primary">
                                <CountUp  start={0} end={DevTaskCounterData.not_completed} delay={0}>
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
                                <CountUp  start={0} end={DevTaskCounterData.completed} delay={0}>
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
               Over Due
              </Col>     
              <Col>
               <Badge pill bg="danger">
                                <CountUp  start={0} end={DevTaskCounterData.over_due} delay={0}>
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
             <Badge pill bg="info">
                                <CountUp  start={0} end={DevTaskCounterData.all_tasks} delay={0}>
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
    </>
   
  );
}

export default DevTaskOverviewChart;
