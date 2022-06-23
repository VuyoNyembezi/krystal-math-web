import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Badge, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";

import ProjectOverviewChart from "./charts/projects/ProjectOverViewChart";
import TeamProjectsOverviewChart from "./charts/projects/TeamProjectsOverViewChart";
import TaskOverviewChart from "./charts/tasks/TasksOverViewChart";
import { URL } from "../../../server_connections/server";
import TeamLiveIssuesOverviewChart from "./charts/projects/TeamLiveIssueOverViewChart";

function TeamOverview() {
  // Team tasks overview state handler
  const [team_tasks_overview, set_team_tasks_overview] = useState([]);
  // Team projects overview state handler
  const [Team_Projects_CounterData, set_Team_Projects_Counter_Data] = useState(
    []
  );
// team live issues
  const [LiveIssueOverviewData, setActiveOverviewLiveIssue] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(
      `${URL}/api/auth/live_issues/team/count/overview?team_id=${localStorage.getItem(
        "team"
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((results) => {
        setActiveOverviewLiveIssue(results);
      });
  }, [LiveIssueOverviewData]);
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // team overview Tasks
    fetch(
      `${URL}/api/auth/task/team/count?id=${localStorage.getItem("team")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_team_tasks_overview(Result));
    // All  Projects Ovuerview
    fetch(
      `${URL}/api/auth/team/project/count?team_id=${localStorage.getItem(
        "team"
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_Team_Projects_Counter_Data(Result));
  }, [Team_Projects_CounterData, team_tasks_overview]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <Card.Header>Projects Overview</Card.Header>
              <Card.Body className="teamlead-overview-card">
                <Row>
                  <Col>
                    <Tabs
                      defaultActiveKey="project"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="project" title="project">
                        <div style={{ height: "30%" }}>
                          <ProjectOverviewChart />
                        </div>
                        <Row>
                                 <Row>
                                        <Col>Not Completed</Col>
                                        <Col>
                                          <Badge pill bg="danger">
                                            <CountUp
                                              start={0}
                                              end={
                                                Team_Projects_CounterData.pending
                                              }
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
                                              end={
                                                Team_Projects_CounterData.completed
                                              }
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
                                              end={
                                                Team_Projects_CounterData.all_project
                                              }
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
                        </Row>
                 
                      </Tab>
                      <Tab
                        eventKey="project_category"
                        title="project by category"
                      >
                        <div style={{ height: "30%" }}>
                          <TeamProjectsOverviewChart />
                        </div>
                        
                        <Row>
                                        <Col>Not Completed</Col>
                                        <Col>
                                          <Badge pill bg="danger">
                                            <CountUp
                                              start={0}
                                              end={
                                                Team_Projects_CounterData.pending
                                              }
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
                                              end={
                                                Team_Projects_CounterData.completed
                                              }
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
                                              end={
                                                Team_Projects_CounterData.all_project
                                              }
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
                      </Tab>
                      <Tab eventKey="live issues" title="Live Issues">
                      <div style={{ height: "30%" }}>
                          <TeamLiveIssuesOverviewChart />
                        </div>
                        
                        <Row>
                                        <Col>Not Completed</Col>
                                        <Col>
                                          <Badge pill bg="danger">
                                            <CountUp
                                              start={0}
                                              end={
                                                LiveIssueOverviewData.pending
                                              }
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
                                              end={
                                                LiveIssueOverviewData.completed
                                              }
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
                                              end={
                                                LiveIssueOverviewData.all_project
                                              }
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
                      </Tab>
                    </Tabs>
                  </Col>
                  <Col>
                  <Card>
                    <Card.Header>Tasks Progress</Card.Header>
                    <Card.Body className="teamlead-overview-card-task-progress-card">
                      
                          <TaskOverviewChart />
                    
                      <Row>
                                  <Col>Not Completed</Col>
                                  <Col>
                                    <Badge pill bg="secondary">
                                      <CountUp
                                        start={0}
                                        end={team_tasks_overview.not_completed}
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
                                  <Col>Over Due</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={team_tasks_overview.over_due}
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
                                        end={team_tasks_overview.completed}
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
                                  <Col>Total</Col>
                                  <Col>
                                    <Badge pill bg="info">
                                      <CountUp
                                        start={0}
                                        end={team_tasks_overview.all_tasks}
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
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default TeamOverview;
