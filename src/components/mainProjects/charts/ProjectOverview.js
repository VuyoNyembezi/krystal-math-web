import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Badge,
  Card,
  Tabs,
  Tab,
} from "react-bootstrap";
import "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";
import CountUp from "react-countup";

import { URL } from "../../../server_connections/server";
import LiveOverView from "./LiveIssuesOverview";
function ProjectsOverView() {
  const [project_statuses, set_project_statuses] = useState([]);
  const [live_issue_statuses, set_live_issue_statuses] = useState([]);
  const [Teams, setTeamsData] = useState([]);
  // team project status overview
  const [team_project_statuses, set_team_project_statuses] = useState([]);
  const [team_live_issues_statuses, set_live_issues_statuses] = useState([]);
  // Team overview i.e Completed project and Pending project
  const [Team_Projects_CounterData, set_Team_Projects_Counter_Data] = useState(
    []
  );
  const [Team_Live_issues_CounterData, set_Team_Live_Issues_Data] = useState(
    []
  );
  // team value state
  const [team, setTeam] = useState({
    id: 0,
    name: "",
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
    // fetch for project type Data
    fetch(`${URL}/api/auth/active/teams`, requestOptions)
      .then((response) => response.json())
      .then((results) => setTeamsData(results.data));
  }, []);

  //  projects Data
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // projects overview statuses
    fetch(`${URL}/api/auth/projects_status/count`, requestOptions)
      .then((response) => response.json())
      .then((Result) => set_project_statuses(Result));
    // projects overview statuses
    fetch(`${URL}/api/auth/live_issues/count/statuses`, requestOptions)
      .then((response) => response.json())
      .then((Result) => set_live_issue_statuses(Result));
  }, [project_statuses, live_issue_statuses]);

  // Team projects Data
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // nteam project status overview
    fetch(
      `${URL}/api/auth/team_projects/overview/count?team_id=${team.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_team_project_statuses(Result));

    // nteam project status overview
    fetch(
      `${URL}/api/auth/live_issues/team/count/statuses?team_id=${team.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_live_issues_statuses(Result));
    // Counters
    // All  Team Project

    fetch(
      `${URL}/api/auth/team/project/count?team_id=${team.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_Team_Projects_Counter_Data(Result));
    // All  Team Live Issues

    fetch(
      `${URL}/api/auth/live_issues/team/count/overview?team_id=${team.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_Team_Live_Issues_Data(Result));
  }, [team.id, Team_Projects_CounterData]);

  const main_project_data = {
    labels: [
      "No Started",
      "Planning",
      "Under Investigation",
      "On Hold",
      "In Progress",
      "Dev Completed",
      "QA",
      "Deployed",
    ],
    datasets: [
      {
        data: [
          project_statuses.not_started,
          project_statuses.planning,
          project_statuses.under_investigation,
          project_statuses.on_hold,
          project_statuses.in_progress,
          project_statuses.dev_complete,
          project_statuses.qa,
          project_statuses.deployed,
        ],
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
      },
    ],
  };

  const team_data = {
   
    labels: [
      "No Started",
      "Planning",
      "Under Investigation",
      "On Hold",
      "In Progress",
      "Dev Completed",
      "QA",
      "Deployed",
    ],
    datasets: [
      {
        data: [
          team_project_statuses.not_started,
          team_project_statuses.planning,
          team_project_statuses.under_investigation,
          team_project_statuses.on_hold,
          team_project_statuses.in_progress,
          team_project_statuses.dev_complete,
          team_project_statuses.qa,
          team_project_statuses.deployed,
        ],
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
      },
    ],
  };
  const team_live_data_data = {
    labels: [
      "No Started",
      "Planning",
      "Under Investigation",
      "On Hold",
      "In Progress",
      "Dev Completed",
      "QA",
      "Deployed",
    ],
    datasets: [
      {
        data: [
          team_live_issues_statuses.not_started,
          team_live_issues_statuses.planning,
          team_live_issues_statuses.under_investigation,
          team_live_issues_statuses.on_hold,
          team_live_issues_statuses.in_progress,
          team_live_issues_statuses.dev_complete,
          team_live_issues_statuses.qa,
          team_live_issues_statuses.deployed,
        ],
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
      },
    ],
  };

  const handleChange = (event) => {
    setTeam({
      ...team,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
    <div className="mt-3">

        <Container fluid>
        <Card  style={{ backgroundColor: "white", height: "86%" }}>
          <Card.Header>Live Chart Overviews</Card.Header>
          <Card.Body className="scroll--chars">
            <Row className="row">
              <Col className="col-md-7">
                <Tabs
                  defaultActiveKey="projects"
                  transition={true}
                  className="mb-3"
                >
                  <Tab eventKey="projects" title="Projects"> 
                  <div style={{ width: "50%" }}>
                      <Pie data={main_project_data} />
                    </div>
                  </Tab>
                  <Tab eventKey="live_issues" title="Live Issues">
                    <div style={{ width: "50%" }}>
                      <LiveOverView />
                    </div>
                  </Tab>
                </Tabs>
              </Col>
              <Col className="col-md-5">
                
                  <Row>
                    <Col sm={1}>   <Form.Label >Team</Form.Label>
                    </Col>
                    <Col>
                    <div className="col-sm-5"> 
                     <Form.Select 
                      name="id"
                      id="id"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Team</option>
                      {Teams.map((project_type, key) => {
                        return (
                          <option key={key} value={project_type.id}>
                            {project_type.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                    </div>   
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                 
               
                  </Form.Group>
                

                <Tabs
                  defaultActiveKey="projects"
                  transition={true}
                  className="mb-3"
                >
                  <Tab eventKey="projects" title="Projects">
                    <div style={{ width: "50%", height:"50%" }}>
                      <Pie data={team_data} />
                    </div>
                    <Row>
                      <Card>
                        <Card.Header>Project Stats</Card.Header>
                        <Card.Body>
                          <Row>
                            <Col>Not Completed</Col>
                            <Col>
                              <Badge pill bg="danger">
                                <CountUp
                                  start={0}
                                  end={Team_Projects_CounterData.pending}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </Badge>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>Completed</Col>
                            <Col>
                              <Badge pill bg="success">
                                <CountUp
                                  start={0}
                                  end={Team_Projects_CounterData.completed}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </Badge>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>Assigned</Col>
                            <Col>
                              <Badge pill bg="warning">
                                <CountUp
                                  start={0}
                                  end={Team_Projects_CounterData.all_project}
                                  delay={0}
                                >
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
                      </Card>
                    </Row>
                  </Tab>
                  <Tab eventKey="live_issues" title="Live Issues">
                    <div style={{ width: "50%", height:"50%" }}>
                      <Doughnut data={team_live_data_data} />
                    </div>
                    <Row>
                      <Card style={{ backgroundColor: "white"}}>
                        <Card.Header>Live Issues Stats</Card.Header>
                        <Card.Body>
                          <Row>
                            <Col>Not Completed</Col>
                            <Col>
                              <Badge pill bg="danger">
                                <CountUp
                                  start={0}
                                  end={Team_Live_issues_CounterData.pending}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </Badge>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>Completed</Col>
                            <Col>
                              <Badge pill bg="success">
                                <CountUp
                                  start={0}
                                  end={Team_Live_issues_CounterData.completed}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </Badge>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>Assigned</Col>
                            <Col>
                              <Badge pill bg="warning">
                                <CountUp
                                  start={0}
                                  end={Team_Live_issues_CounterData.all_project}
                                  delay={0}
                                >
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
                      </Card>
                    </Row>
                  </Tab>
                </Tabs>

                <Row></Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
    
    </>
  );
}
export default ProjectsOverView;
