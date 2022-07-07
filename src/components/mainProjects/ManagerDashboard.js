import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  ProgressBar,
  Carousel,
  Container,
  Form,
  FormControl,
  Modal,
  Nav,
  Row,
  Table,
  Col,
  Badge,
} from "react-bootstrap";
import { URL } from "../../server_connections/server";
import CountUp from "react-countup";
import { FcEngineering, FcHighPriority, FcCircuit } from "react-icons/fc";

function ManagerDashboard() {
  const [operational_data, setOperational_data] = useState([]);
  const [live_issues_data, setlive_issues_data] = useState([]);
  const [strategic_data, set_strategic_data] = useState([]);
  // now constant controller
  // full display of operational projects data
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    set_operational_search_key({
      operational_project_search: null,
    });
  };
  const handleShow = () => setShow(true);
  const [show_live_issues, setShowLiveIssues] = useState(false);
  const handleCloseLiveIssues = () => {
    setShowLiveIssues(false);
    set_live_search_key({
      live_issue_search: null,
    });
  };
  const handleShowLiveIssues = () => setShowLiveIssues(true);
  // full display of strategic projects data
  const [showStrategic, setShowStrategic] = useState(false);
  const handleCloseStrategic = () => {
    setShowStrategic(false);
    set_strategic_search_key({
      strategic_project_search: null,
    });
  };
  const handleShowStrategic = () => setShowStrategic(true);

  // Counters
  //project counts state  Operational Projects
  const [operational_project_Count, set_operational_Project_Count] = useState(
    []
  );
  // status project count handlers
  const [operational_project_statuses, set_operational_project_statuses] =
    useState([]);

  //project counts state  Strategic Projects
  const [strategic_project_count, set_strategic_project_count] = useState([]);
  // status state control for strategic projects
  const [strategic_project_statuses, set_strategic_project_statuses] = useState(
    []
  );

  //project counts state  Operational Projects
  const [live_issues_project_Count, set_live_issues_Project_Count] = useState(
    []
  );
  // status project count handlers
  const [live_issues_project_statuses, set_live_issues_project_statuses] =
    useState([]);
  // search state
  const [operational_search_key, set_operational_search_key] = useState({
    operational_project_search: null,
  });

  const [strategic_search_key, set_strategic_search_key] = useState({
    strategic_project_search: null,
  });
  const [live_search_key, set_live_search_key] = useState({
    live_issue_search: null,
  });

// Time Render function
  // Renders Every 5 Seconds To all load latest Projects Data Changes
  // const [projects_data, set_projects_data] = useState({
  //   operational: [],
  //   strategic: [],
  //   live_issues: []
  // });
  // setInterval(ProjectsData,
  //   6000);
  // function ProjectsData() {
  //   // set_projects_data({
  //   //   operational: operational_data,
  //   //   strategic: strategic_data,
  //   //   live_issues: live_issues_data
  //   // });
 

  //   console.log("6 Second Function Rendered")
  //   return console.log(projects_data);
  // }
 



  // Projects Data

  // Operational
  
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch operational projects

    if (operational_search_key.operational_project_search === null || operational_search_key.operational_project_search === '') {
      fetch(`${URL}/api/auth/projects/operational/all`, requestOptions)
        .then((response) => response.json())
        .then((Result) => setOperational_data(Result.data));
    }
 
  }, [ operational_data,operational_search_key]);
  // Strategic Project
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    if (strategic_search_key.strategic_project_search === null || strategic_search_key.strategic_project_search === '') {
      // fetch strategic projects
      fetch(`${URL}/api/auth/projects/strategic/all`, requestOptions)
        .then((response) => response.json())
        .then((Result) => set_strategic_data(Result.data));
    }
  }, [strategic_data, strategic_search_key]);
  // Live Issues Project
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    if (live_search_key.live_issue_search === null || live_search_key.live_issue_search === '') {
      // fetch live issues projects
      fetch(`${URL}/api/auth/live_issues`, requestOptions)
        .then((response) => response.json())
        .then((Result) => setlive_issues_data(Result.all_live_issues));
    }
  }, [live_issues_data, live_search_key]);

  // COUNTERS
  //project counters
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // operational project counter  request
    fetch(`${URL}/api/auth/projects/category/counter`, requestOptions)
      .then((response) => response.json())
      .then((Result) => {
        set_operational_Project_Count(Result.operational);
        set_strategic_project_count(Result.strategic);
        set_live_issues_Project_Count(Result.live_issues);
      });
  }, [operational_project_Count]);

  // operational and strategic status Counters
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${URL}/api/auth/projects/status/counter`, requestOptions)
      .then((response) => response.json())
      .then((Result) => {
        set_operational_project_statuses(Result.operational);
        set_strategic_project_statuses(Result.strategic);
      });
  }, [operational_project_statuses]);

  // Live Issues  status Counters
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // strategic project count
    fetch(`${URL}/api/auth/live_issues/count/statuses`, requestOptions)
      .then((response) => response.json())
      .then((Result) => set_live_issues_project_statuses(Result));
  }, [live_issues_project_statuses]);

  const handleChange = (event) => {
    set_operational_search_key({
      ...operational_search_key,
      [event.target.name]: event.target.value,
    });

    set_strategic_search_key({
      ...strategic_search_key,
      [event.target.name]: event.target.value,
    });
    set_live_search_key({
      ...live_search_key,
      [event.target.name]: event.target.value,
    });
  };
  // Search (Operational, Strategic Search )

  function handle_Strategic_Search_Project_Submit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    //     //fetch all strategic
    fetch(
      `${URL}/api/auth/projects/strategic/search/all?search=${strategic_search_key.strategic_project_search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_strategic_data(Result.data));
  }
  function handle_Operation_Search_Project_Submit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    //fetch all operational
    fetch(
      `${URL}/api/auth/projects/operational/search/all?search=${operational_search_key.operational_project_search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => setOperational_data(Result.data));
  }

  function handle_Live_Search_Project_Submit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

      fetch(`${URL}/api/auth/live_issues/search?search=${live_search_key.live_issue_search}`,requestOptions)
      .then((response) => response.json())
      .then((res) => {
        setlive_issues_data(res.all_live_issues);
     
      });
  }
  return (
    <div>
      {/* Top navigation */}
      <main className="mt-3">
        <Container fluid className="bg-light main-body">
          <Row>
            <Col>
              <h4>BET SOFTWARE PROJECTS</h4>
            </Col>
          </Row>
          <Card className="shadow border-0 mb-7">
            <Carousel fade indicators={false}>
              {/* Operational Carousel Item */}
              <Carousel.Item style={{ backgroundColor: "#F0FFFF" }} interval={40000}>
                <div className="row mb-2">
                  <div className="col-md-2 col-sm-12">
                    <Card
                      className="text-white mb-3 py-3"
                      style={{ backgroundColor: "#8f9cb3" }}
                    >
                      <Card.Body>
                        <div className="row">
                          <div className="col">
                            <span className="h6">Operational</span>
                            <span className="h5 font-bold mb-0">
                              <CountUp
                                start={0}
                                end={operational_project_Count.projects_count}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </span>
                          </div>
                          <div className="col">
                            <h1>
                              <FcCircuit />
                            </h1>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <Container fluid>
                  <Row>
                    <div  className="col-md-8 col-sm-12"  style={{  height: "calc(100vh - 290px)",  overflow: "auto" }} >
                      <Card className="text-black mb-3"  style={{ backgroundColor: "white", height: "86%" }} >
                        <Card.Header  className="card text-white mb-3"  style={{ backgroundColor: "#8F9CB3" }} >
                          {" "}
                          Operational Projects{" "}
                        </Card.Header>
                          <Nav className="justify-content-end">
                                                    <div className="col-md-3 col-sm-9 me-3">
                                                      <Form
                                                        onSubmit={
                                                          handle_Operation_Search_Project_Submit
                                                        }
                                                        className="d-flex"
                                                      >
                                                        <FormControl
                                                          type="search"
                                                          name="operational_project_search"
                                                          placeholder="Search"
                                                          onChange={handleChange}
                                                          className="mr-3"
                                                          aria-label="Search"
                                                        />
                                                        <Button
                                                          variant="outline-success"
                                                          type="submit"
                                                          size="sm"
                                                        >
                                                          Search
                                                        </Button>
                                                      </Form>
                                                    </div>
                                                  </Nav>
                        <Card.Body className="scroll">
                        
                          <Table  size="sm" striped bordered hover>
                            <thead>
                              <tr>
                                <th>Project Name</th>
                                <th>Last Update</th>
                                <th>PM</th>
                                <th>Priority</th>
                                <th>Progress</th>
                              </tr>
                            </thead>
                            <tbody>
                              {operational_data
                                .slice(0, 11)
                                .map((project, key) => {
                                  return (
                                    <tr key={key}>
                                      <td>{project.name}</td>
                                      <td>
                                        {new Date(
                                          project.updated_at
                                        ).toDateString()}
                                      </td>
                                      <td>{project.user.name}</td>
                                      <td>
                                        <Badge
                                          style={{ height: "25px" }}
                                          bg={project.priority_type.level}
                                          size="sm"
                                        >
                                          <p>{project.priority_type.name}</p>
                                        </Badge>
                                      </td>
                                      <td>
                                        {" "}
                                        <ProgressBar
                                          label={` ${project.project_status.effect} %`}
                                          striped
                                          animated
                                          variant={project.project_status.level}
                                          now={project.project_status.effect}
                                          max={100}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>

                      <Card.Footer
                        className="text-center"
                        style={{ backgroundColor: "#8F9CB3" }}
                      >
                        <Button size="sm" variant="outline-success" onClick={handleShow}>
                          All
                        </Button>
                      </Card.Footer>
                    </div>
                    <div className="col-md-3 col-sm-12">
                
                      <Card fluid style={{ height: "96%" }}>
                        <Card.Header
                          className="card text-white mb-3"
                          style={{ backgroundColor: "#8F9CB3" }}
                        >
                          Statuses
                        </Card.Header>
                        <Card.Body className="w-100">
                          <Row>
                            <Col>
                              <span className="h6 text-muted d-block mb-2">
                                Not Started
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={operational_project_statuses.not_started}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 text-muted d-block mb-2">
                                Planning
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={operational_project_statuses.planning}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                On Hold
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={operational_project_statuses.on_hold}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Under Investigation
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={
                                    operational_project_statuses.under_investigation
                                  }
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Dev Completed
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={
                                    operational_project_statuses.dev_complete
                                  }
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                In Progress
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={operational_project_statuses.in_progress}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                QA
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={operational_project_statuses.qa}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Deployed
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={operational_project_statuses.deployed}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Row>
                </Container>
              </Carousel.Item>
              {/* Strategic Carousel Item */}
              <Carousel.Item
                style={{ backgroundColor: "#F0FFFF" }}
                interval={40000}
              >
                <div className="row mb-2">
                  <div className="col-md-2 col-sm-12">
                    <Card  className="text-white mb-3 py-3"
                      style={{ backgroundColor: "#3e7dcc" }}
                    >
                      <Card.Body>
                       <Row>
                        <Col>
                            <span className="h6 ">Strategic </span>
                            <span className="h5 font-bold mb-0">
                              <CountUp
                                start={0}
                                end={strategic_project_count.projects_count}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </span>
                          </Col>
                        <Col>
                            <span className="h6 text-white">
                              <h1>
                                <FcEngineering />
                              </h1>
                            </span>
                         </Col>
                        </Row>                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <Container fluid >
                  <Row>
                    <div
                      className="col-md-8 col-sm-12" style={{ height: "calc(100vh - 290px)", overflow: "auto",
                      }}
                    >
                      <Card
                        className="text-black mb-3"
                        style={{ backgroundColor: "white", height: "86%" }}
                      >
                        <Card.Header className="card text-white mb-3" style={{ backgroundColor: "#3E7DCC" }} >
                          {" "}
                          Strategic Projects{" "}
                        </Card.Header>
                            <Nav className="justify-content-end">
                                                        <div className="col-md-3 col-sm-9  me-3">
                                                          <Form
                                                            onSubmit={
                                                              handle_Strategic_Search_Project_Submit
                                                            }
                                                            className="d-flex"
                                                          >
                                                            <FormControl
                                                              type="search"
                                                              name="strategic_project_search"
                                                              placeholder="Search"
                                                              onChange={handleChange}
                                                              className="mr-3"
                                                              aria-label="Search"
                                                            />
                                                            <Button
                                                              variant="outline-success"
                                                              type="submit"
                                                              size="sm"
                                                            >
                                                              Search
                                                            </Button>
                                                          </Form>
                                                        </div>
                                                      </Nav>
                        <Card.Body className="scroll">
                          <Table size="sm" striped bordered hover>
                            <thead>
                              <tr>
                                <th>Project Name</th>
                                <th>Last Update</th>
                                <th>PM</th>
                                <th>Priority</th>
                                <th>Progress</th>
                              </tr>
                            </thead>
                            <tbody>
                              {strategic_data
                                .slice(0, 11)
                                .map((project, key) => {
                                  return (
                                    <tr key={key}>
                                      <td>{project.name}</td>
                                      <td>
                                        {new Date(
                                          project.updated_at
                                        ).toDateString()}
                                      </td>
                                      <td>{project.user.name}</td>
                                      <td>
                                        <Badge
                                          style={{ height: "25px" }}
                                          bg={project.priority_type.level}
                                          size="sm"
                                        >
                                          <p>{project.priority_type.name}</p>
                                        </Badge>
                                      </td>
                                      <td>
                                        {" "}
                                        <ProgressBar
                                          label={` ${project.project_status.effect} %`}
                                          striped
                                          animated
                                          variant={project.project_status.level}
                                          now={project.project_status.effect}
                                          max={100}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>
                      <Card.Footer className="text-center">
                        <Button
                          size="sm"
                          style={{ backgroundColor: "#3E7DCC" }}
                          onClick={handleShowStrategic}
                        >
                          All
                        </Button>
                      </Card.Footer>
                    </div>
                    <div className="col-md-3 col-sm-12">
                      <Card fluid style={{ height: "96%" }}>
                        <Card.Header
                          className="card text-white mb-3"
                          style={{ backgroundColor: "#3E7DCC" }}
                        >
                          Statuses
                        </Card.Header>
                        <Card.Body className="w-100">
                          <Row>
                            <Col>
                              <span className="h6 text-muted d-block mb-2">
                                Not Started
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={strategic_project_statuses.not_started}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 text-muted d-block mb-2">
                                Planning
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={strategic_project_statuses.planning}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                On Hold
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={strategic_project_statuses.on_hold}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Under Investigation
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={
                                    strategic_project_statuses.under_investigation
                                  }
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Dev Completed
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={strategic_project_statuses.dev_complete}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                In Progress
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={strategic_project_statuses.in_progress}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                QA
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={strategic_project_statuses.qa}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Deployed
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={strategic_project_statuses.deployed}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Row>
                </Container>
              </Carousel.Item>
              {/* Live issues Carousel Item */}
              <Carousel.Item
                style={{ backgroundColor: "#F0FFFF" }}
                interval={40000}
              >
                <div className="row mb-2">
                  <div className="col-md-2 col-sm-12">
                    <Card
                      className="card text-white mb-3 py-3"
                      style={{ backgroundColor: "#00C8C8" }}
                    >
                      <Card.Body>
                        <div className="row">
                          <div className="col">
                            <span className="h6 ">Live Issues</span>
                            <span className="h5 font-bold mb-0">
                              <CountUp
                                start={0}
                                end={live_issues_project_Count.projects_count}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </span>
                          </div>

                          <div className="col">
                            <span className="h6 text-white ">
                              <h1>
                                <FcHighPriority />
                              </h1>
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <Container fluid style={{ backgroundColor: "#F0FFFF" }}>
                  <Row>
                    <div
                      className="col-md-8 col-sm-12"
                      style={{
                        height: "calc(100vh - 290px)",
                        overflow: "auto",
                      }}
                    >
                      <Card
                        className="card text-black mb-3"
                        style={{ backgroundColor: "white", height: "86%" }}
                      >
                        <Card.Header
                          className="card text-white mb-3"
                          style={{ backgroundColor: "#00C8C8" }}
                        >
                          {" "}
                          Live Issues Projects{" "}
                        </Card.Header>
                        <Nav className="justify-content-end">
                            <div className="col-md-3 col-sm-9  me-3">
                              <Form
                                onSubmit={handle_Live_Search_Project_Submit}
                                className="d-flex"
                              >
                                <FormControl
                                  type="search"
                                  name="live_issue_search"
                                  placeholder="Search"
                                  onChange={handleChange}
                                  className="mr-3"
                                  aria-label="Search"
                                />
                                <Button
                                  variant="outline-success"
                                  type="submit"
                                  size="sm"
                                >
                                  Search
                                </Button>
                              </Form>
                            </div>
                          </Nav>
                        <Card.Body  className="scroll">
               
                          <Table size="sm" striped bordered hover>
                            <thead>
                              <tr>
                                <th>Project Name</th>
                                <th>Last Update</th>
                                <th>PM</th>
                                <th>Priority</th>
                                <th>Progress</th>
                              </tr>
                            </thead>
                            <tbody>
                              {live_issues_data
                                .slice(0, 11)
                                .map((project, key) => {
                                  return (
                                    <tr key={key}>
                                      <td>{project.name}</td>
                                      <td>
                                        {new Date(
                                          project.updated_at
                                        ).toDateString()}
                                      </td>
                                      <td>{project.user.name}</td>
                                      <td>
                                        <Badge
                                          style={{ height: "25px" }}
                                          bg={project.priority_type.level}
                                          size="sm"
                                        >
                                          <p>{project.priority_type.name}</p>
                                        </Badge>
                                      </td>
                                      <td>
                                        {" "}
                                        <ProgressBar
                                          label={` ${project.project_status.effect} %`}
                                          striped
                                          animated
                                          variant={project.project_status.level}
                                          now={project.project_status.effect}
                                          max={100}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>
                      <Card.Footer className="text-center">
                        <Button
                           size="sm"
                          style={{ backgroundColor: "#00C8C8" }}
                          onClick={handleShowLiveIssues}
                        >
                          All
                        </Button>
                      </Card.Footer>
                    </div>
                    <div className="col-md-3 col-sm-12">
                      <Card fluid style={{ height: "96%" }}>
                        <Card.Header
                          className="card text-white mb-3"
                          style={{ backgroundColor: "#00C8C8" }}
                        >
                          Statuses
                        </Card.Header>
                        <Card.Body className="w-100">
                          <Row>
                            <Col>
                              <span className="h6 text-muted d-block mb-2">
                                Not Started
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={live_issues_project_statuses.not_started}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 text-muted d-block mb-2">
                                Planning
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={live_issues_project_statuses.planning}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                On Hold
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={live_issues_project_statuses.on_hold}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Under Investigation
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={
                                    live_issues_project_statuses.under_investigation
                                  }
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Dev Completed
                              </span>
                            </Col>
                            <Col>
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={
                                    live_issues_project_statuses.dev_complete
                                  }
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                In Progress
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={live_issues_project_statuses.in_progress}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                QA
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={live_issues_project_statuses.qa}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              {" "}
                              <span className="h6 font-semi bold text-muted text-sm d-block mb-2 ">
                                Deployed
                              </span>
                            </Col>
                            <Col>
                              {" "}
                              <span className="h5 font-bold mb-0">
                                <CountUp
                                  start={0}
                                  end={live_issues_project_statuses.deployed}
                                  delay={0}
                                >
                                  {({ countUpRef }) => (
                                    <div>
                                      <span ref={countUpRef} />
                                    </div>
                                  )}
                                </CountUp>
                              </span>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Row>
                </Container>
              </Carousel.Item>
            </Carousel>
          </Card>
        </Container>
      </main>
      {/* Modals */}
      <div>
        {/* Operational Modal */}

        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header style={{ backgroundColor: "#8F9CB3" }} closeButton>
            <Modal.Title>Operational Projects Progress</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav className="justify-content-end">
              <div className="col-md-3 col-sm-9">
                <Form
                  onSubmit={handle_Operation_Search_Project_Submit}
                  className="d-flex"
                >
                  <FormControl
                    type="search"
                    name="operational_project_search"
                    placeholder="Search"
                    onChange={handleChange}
                    className="mr-3"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" type="submit" size="sm">
                    Search
                  </Button>
                </Form>
              </div>
            </Nav>
            <Table size='sm'  striped bordered hover>
              <caption>List of operational projects</caption>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status Update</th>
                  <th>Priority </th>
                  <th>Progress </th>
                </tr>
              </thead>
              <tbody>
                {operational_data.map((project, key) => {
                  return (
                    <tr key={key}>
                      <td>{project.name}</td>
                      <td>{new Date(project.updated_at).toDateString()}</td>
                      <td>
                        {" "}
                        <Badge
                          style={{ height: "25px" }}
                          bg={project.priority_type.level}
                          size="sm"
                        >
                          <p>{project.priority_type.name}</p>
                        </Badge>
                      </td>
                      <td>
                        <ProgressBar
                          label={` ${project.project_status.effect} %`}
                          striped
                          animated
                          variant={project.project_status.level}
                          now={project.project_status.effect}
                          max={100}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Strategic modal */}

        <Modal show={showStrategic} onHide={handleCloseStrategic} size="xl">
          <Modal.Header style={{ backgroundColor: "#3E7DCC" }} closeButton>
            <Modal.Title>Strategic Project Progress</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav className="justify-content-end">
              <div className="col-md-3 col-sm-9">
                <Form
                  onSubmit={handle_Strategic_Search_Project_Submit}
                  className="d-flex"
                >
                  <FormControl
                    type="search"
                    name="strategic_project_search"
                    placeholder="Search"
                    onChange={handleChange}
                    className="mr-3"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" type="submit" size="sm">
                    Search
                  </Button>
                </Form>
              </div>
            </Nav>
            <Table size='sm'  striped bordered hover>
              <caption>List of Strategic projects</caption>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status Update</th>
                  <th>Priority </th>
                  <th>Progress </th>
                </tr>
              </thead>
              <tbody>
                {strategic_data.map((project, key) => {
                  return (
                    <tr key={key}>
                      <td>{project.name}</td>

                      <td>{new Date(project.updated_at).toDateString()}</td>
                      <td>
                        {" "}
                        <Badge
                          style={{ height: "25px" }}
                          bg={project.priority_type.level}
                          size="sm"
                        >
                          <p>{project.priority_type.name}</p>
                        </Badge>
                      </td>
                      <td>
                        <ProgressBar
                          label={` ${project.project_status.effect} %`}
                          striped
                          animated
                          variant={project.project_status.level}
                          now={project.project_status.effect}
                          max={100}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseStrategic}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Live Issues  */}

        <Modal show={show_live_issues} onHide={handleCloseLiveIssues} size="xl">
          <Modal.Header style={{ backgroundColor: "#00C8C8" }} closeButton>
            <Modal.Title>Live Issues Projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav className="justify-content-end">
              <div className="col-md-3 col-sm-9">
                <Form
                  onSubmit={handle_Live_Search_Project_Submit}
                  className="d-flex"
                >
                  <FormControl
                    type="search"
                    name="live_issue_search"
                    placeholder="Search"
                    onChange={handleChange}
                    className="mr-3"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" type="submit" size="sm">
                    Search
                  </Button>
                </Form>
              </div>
            </Nav>
            <Table size='sm'  striped bordered hover>
              <caption>List of live issues </caption>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status Update</th>
                  <th>Priority </th>
                  <th>Progress </th>
                </tr>
              </thead>
              <tbody>
                {live_issues_data.map((project, key) => {
                  return (
                    <tr key={key}>
                      <td>{project.name}</td>
                      <td>{new Date(project.updated_at).toDateString()}</td>
                      <td>
                        {" "}
                        <Badge
                          style={{ height: "25px" }}
                          bg={project.priority_type.level}
                          size="sm"
                        >
                          <p>{project.priority_type.name}</p>
                        </Badge>
                      </td>
                      <td>
                        <ProgressBar
                          label={` ${project.project_status.effect} %`}
                          striped
                          animated
                          variant={project.project_status.level}
                          now={project.project_status.effect}
                          max={100}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLiveIssues}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ManagerDashboard;
