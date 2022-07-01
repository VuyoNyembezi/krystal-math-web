import React, { useEffect, useMemo, useState } from "react";
import {
  Form,
  Badge,
  Button,
  Col,
  Modal,
  Row,
  Tab,
  Table,
  Tabs,
  Toast,
  ToastContainer,
  InputGroup,
  FormControl,
  Nav,
  Card,
  Container
} from "react-bootstrap";
import {

  FcApproval,
 
} from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { URL } from "../../../server_connections/server";
function DevTaskManager() {
  // Toast Alerts State Controller
  const [success_updated, set_success_updated] = useState(false);
  const handleShowsuccessUpdate = () => set_success_updated(true);
  const handleCloseSuccessUpdate = () => set_success_updated(false);
//   // Toast Alerts State Controller
const [success_completed, set_success_completed] = useState(false);
const handleShowsuccessComplete = () => set_success_completed(true);
const handleCloseSuccessComplete = () => set_success_completed(false);

  // update  error toast controller
  const [error_updated, set_error_updated] = useState(false);
  const handleShowErrorUpdate = () => set_error_updated(true);
  const handleCloseErrorUpdate = () => set_error_updated(false);

  // update  error toast controller
  const [duplicate_updated,set_duplicate_live_updated] = useState(false); 
  const handleShowDuplicateUpdate = () => set_duplicate_live_updated(true);
  const handleCloseDuplicateUpdate = () => set_duplicate_live_updated(false)

  // server error toast controller
  const [server_error, set_server_error_updated] = useState(false);
  const handleShowServerError = () => set_server_error_updated(true);
  const handleCloseServerError = () => set_server_error_updated(false);

  const history = useNavigate();
  const [TeamMembers, setTeamMembers] = useState([]);
  const [teamValue, setTeamValue] = useState([]);
  const [TaskStatus, setTaskStatus] = useState([]);
  const [environmentValue, setEnvironmentValue] = useState([]);
  const [taskFormValue, setTaskFormValue] = useState({
    name: "",
    team_id: 0,
    user_id: 0,
    task_status_id: 0,
    environment_id: 0,
    due_date: "",
    due_time: "",
    kickoff_date: "",
    kickoff_time: "",
    task_comment: "",
    active: true,
  });
  // Task State Values Holder
  const [taskValue, setTaskValue] = useState({
    id: 0,
    name: "",
    team_id: localStorage.getItem("team"),
    user_id: 0,
    task_status_id: 0,
    environment_id: 0,
    due_date: "",
    due_time: "",
    kickoff_date: "",
    kickoff_time: "",
    task_comment: "",
    active: true,
    days_left: 0,
    task_duration: 0,
  });
  // for update Task modal
  const [showUpdateTask, setUpdateTaskShow] = useState(false);
  const handleUpdateTaskShow = () => setUpdateTaskShow(true);
  const handleUpdateTaskClose = () => {setUpdateTaskShow(false);
    setTaskValue({
      id: 0,
      name: "",
      team_id: localStorage.getItem("team"),
      user_id: 0,
      task_status_id: 0,
      environment_id: 0,
      due_date: "",
      due_time: "",
      kickoff_date: "",
      kickoff_time: "",
      task_comment: "",
      days_left: 0,
      task_duration: 0,
      active: true,
    });};
  // for view Task Details modal
  const [showTaskDetails, setTaskDetailsShow] = useState(false);
  const handleTaskDetailsShow = () => setTaskDetailsShow(true);
  const handleTaskDetailsClose = () => setTaskDetailsShow(false);
  // for view OverDue Task Details modal
  const [showOverDueTaskDetails, setOverDueTaskDetailsShow] = useState(false);
  const handleOverDueTaskDetailsShow = () => setOverDueTaskDetailsShow(true);
  const handleOverDueTaskDetailsClose = () => setOverDueTaskDetailsShow(false);

  const [UserAllTasksData, setUserAllTasksData] = useState([]);
  const [UserCompletedTasksData, setUserCompletedTasksData] = useState([]);
  const [UserOverDueTasksData, setUserOverDueTasksData] = useState([]);
  const [UserOpenTasksData, setUserOpenTasksData] = useState([]);

   // Complete Confirmation Live Issue
   const [show_Complete_Task, setCompleteTask] = useState(false);
   const handleCompleteTaskShow = () => setCompleteTask(true);
   const handleCloseSuccessCompleted = () => {setCompleteTask(false);
     setTaskValue({
       id: 0,
       name: "",
       team_id: localStorage.getItem("team"),
       user_id: 0,
       task_status_id: 0,
       environment_id: 0,
       due_date: "",
       due_time: "",
       kickoff_date: "",
       kickoff_time: "",
       task_comment: "",
       days_left: 0,
       task_duration: 0,
       active: true,
     });};

  // search state 
  const [search_key,set_search_key] = useState({
    task_search:null
  });
  // Keeps track of changes in the database
  const [old_tasks_data, set_old_tasks_data] = useState([]);

  function OldData(){
    set_old_tasks_data(UserAllTasksData);
   
  };
 
  const latest_task_data = useMemo(() => old_tasks_data, [old_tasks_data]);
  
  useEffect(() => {
    fetch(`${URL}/api/auth/team/members?id=${localStorage.getItem("team")}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((Response) => Response.json())
      .then((Result) => {
        setTeamMembers(Result.data.users);
      });
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch all teams
    fetch(`${URL}/api/auth/teams`, requestOptions)
      .then((response) => response.json())
      .then((res) => setTeamValue(res.data));

    // fetch for environments
    fetch(`${URL}/api/auth/environments`, requestOptions)
      .then((response) => response.json())
      .then((results) => setEnvironmentValue(results.data));

    // fetch for task statuses
    fetch(`${URL}/api/auth/task_statuses`, requestOptions)
      .then((response) => response.json())
      .then((results) => setTaskStatus(results.data));
  }, []);

  // User Or Dev Effect
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

  // fetch user tasks
  if(search_key.task_search === null || search_key.task_search === ''){
      fetch(`${URL}/api/auth/user/tasks?id=${localStorage.getItem("team")}&user_id=${localStorage.getItem('SUID')}`,requestOptions)
  .then((response) => response.json())
  .then((Result) => {
    setUserOpenTasksData(Result.open_tasks)
    setUserAllTasksData(Result.all_tasks);
    setUserOverDueTasksData(Result.over_due_tasks);
    setUserCompletedTasksData(Result.completed_tasks)
  });
  }

  }, [latest_task_data,search_key]);

  // Update , Activate and Deactivate Task
  function handleSubmitTaskUpdate(event) {
    event.preventDefault();
    const completed_task = "5";

if(taskFormValue.task_status_id === completed_task){
  handleCompleteTaskShow();
}
else if (taskFormValue.task_status_id === taskValue.task_status_id){
  handleUpdateTaskClose();
  handleShowDuplicateUpdate();
}
else {
    fetch(`${URL}/api/auth/task/dev/update`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: taskValue.id,
        task: {
          task_status_id: taskValue.task_status_id,
          active: taskValue.active,
        },
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowsuccessUpdate();
          handleUpdateTaskClose();
          OldData();
        } else if (response.status === 422) {
          handleShowErrorUpdate();
        } else if (response.status === 500) {
          handleShowServerError();
          handleUpdateTaskClose();
        } else if (response.status === 401) {
          alert("session expired");
          history("/");
        }
      })
      .then((results) => results.json());
    }
  }
  const handleChange = (event) => {
    setTaskFormValue({
      ...taskFormValue,
      [event.target.name]: event.target.value,
    });

    set_search_key ({
      ...search_key,
      [event.target.name]: event.target.value
    })
  };

      // Complete Task Status
      function handle_Complete_Task(event) {
        event.preventDefault();
    
        fetch(`${URL}/api/auth/task/dev/update`, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("key")}`,
          },
          body: JSON.stringify({
            id: taskValue.id,
            task: {
              task_status_id: taskFormValue.task_status_id,
              active: false,
            },
          }),
        })
          .then((response) => {
            response.json();
            if (response.status === 200) {
              handleShowsuccessComplete();
              handleCloseSuccessCompleted();
              handleUpdateTaskClose();
              OldData();
            } else if (response.status === 422) {
              handleShowErrorUpdate();
            } else if (response.status === 500) {
              handleShowServerError();
              handleUpdateTaskClose();
            } else if (response.status === 401) {
              alert("session expired");
              history("/");
            }
          })
          .then((results) => results.json());
      }
  

  function selectTask(task) {
    const now_date = new Date();
    const kick_off = new Date(task.kickoff_date);
    const due_date = new Date(task.due_date);
    const last_updates = new Date(task.updated_at);
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calcualte Task Duration
    const task_time_difference = due_date.getTime() - kick_off.getTime();
    const Task_Duration = Math.round(task_time_difference / oneDay);
    //  Calculate  Task Days Left
    const task_time_due_difference = due_date.getTime() - now_date.getTime();
    const Task_due_in = Math.round(task_time_due_difference / oneDay);

    const task_duedate = due_date.toDateString();
    const task_updated = last_updates.toDateString();
    const task_kick_off = kick_off.toDateString();
    setTaskFormValue({
      id: task.id,
      name: task.name,
      environment_id: task.environment.id,
      task_status_id: task.task_status.id,
      team_id: task.team.id,
      kickoff_date: task.kickoff_date,
      last_update: task.updated_at,
      due_date: task.due_date,
      task_comment: task.task_comment,
      created_at: task.inserted_at,
      user_id: task.user.id,
    });
    setTaskValue({
      id: task.id,
      name: task.name,
      environment_id: task.environment.id,
      task_status_id: task.task_status.id,
      kickoff_date: task_kick_off,
      last_update: task_updated,
      due_date: task_duedate,
      task_comment: task.task_comment,
      created_at: task.inserted_at,
      environment: task.environment.name,
      task_status: task.task_status.name,
      days_left: Task_due_in,
      task_duration: Task_Duration,
    });
  }
  function handle_Search_Task_Submit(event){
    event.preventDefault();
    const requestOptions ={
      method:'Get',
      headers:{
          'Accept':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('key')}`
        ,'Content-Type': 'application/json'},
    }
  //search for Team Tasks
   fetch(`${URL}/api/auth/user/search?team_id=${localStorage.getItem('team')}&user_id=${localStorage.getItem('SUID')}&search=${search_key.task_search}`,requestOptions)
   .then(response => response.json())
   .then(Result => {
    setUserAllTasksData(Result.all_tasks);
    setUserCompletedTasksData(Result.completed_tasks);
    setUserOverDueTasksData(Result.over_due_tasks);
     setUserOpenTasksData(Result.open_tasks);
     })
  }


  return (
    <div className="mt-3">
      <Container fluid>
            <Card>
        <Card.Header>{localStorage.getItem('name')} Tasks</Card.Header>   
      
         <Nav  className="justify-content-end">
                          <div  className="col-md-3 col-sm-9 me-3">
                            <Form onSubmit={handle_Search_Task_Submit} className="d-flex">
                                <FormControl type="search" name='task_search' placeholder="Search" required onChange={handleChange} className="mr-3" aria-label="Search" />
                                <Button variant="outline-success" type='submit' size='sm'>Search</Button>
                              </Form>
                            </div>
                            </Nav>
        <Card.Body className="dev-task-card">
    
  <Tabs
        defaultActiveKey="open"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
         <Nav  className="justify-content-end">
                 <div  className="col-md-3 col-sm-9">
                   <Form onSubmit={handle_Search_Task_Submit} className="d-flex">
                      <FormControl type="search" name='task_search' placeholder="Search" required onChange={handleChange} className="mr-3" aria-label="Search" />
                      <Button variant="outline-success" type='submit' size='sm'>Search</Button>
                    </Form>
                  </div>
                  </Nav>
        <Tab eventKey="open" title="Open">
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th> Name </th>
                <th> enviroment</th>
                <th> Status </th>
                <th> Due date </th>
                <th> Kickoff date </th>
                <th>action </th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {UserOpenTasksData.map((task, Index) => {
                return (
                  <tr key={Index}>
                    <td>{task.name}</td>
                    <td>{task.environment.name}</td>
                    <td>{task.task_status.name}</td>
                    <td>{new Date(task.due_date).toDateString()}</td>
                    <td>{new Date(task.kickoff_date).toDateString()}</td>
                    <td className="text-center">
                      <button size="sm" className="btn" onClick={() => selectTask(task)}>
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={handleUpdateTaskShow}
                        >
                          Update
                        </Button>
                      </button>{" "}
                      <button size="sm" className="btn" onClick={() => selectTask(task)}>
                        <Button
                          size="sm"
                          variant="outline-warning"
                          onClick={handleTaskDetailsShow}
                        >
                          View
                        </Button>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="over due" title="Over-due">
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th> Name </th>
                <th> enviroment</th>
                <th> Status </th>
                <th> Due date </th>
                <th> Kickoff date </th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {UserOverDueTasksData.map((task, Index) => {
                return (
                  <tr key={Index}>
                    <td>{task.name}</td>
                    <td>{task.environment.name}</td>
                    <td>{task.task_status.name}</td>
                    <td>{new Date(task.due_date).toDateString()}</td>
                    <td>{new Date(task.kickoff_date).toDateString()}</td>
                    <td className="text-center">
                      <button size="sm" className="btn" onClick={() => selectTask(task)}>
                        <Button
                          size="sm"
                          variant="outline-warning"
                          onClick={handleOverDueTaskDetailsShow}
                        >
                          View
                        </Button>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="complete" title="Completed">
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th> Name </th>
                <th> enviroment</th>
                <th> Status </th>
                <th> Due date </th>
                <th> Kickoff date </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {UserCompletedTasksData.map((task, Index) => {
                return (
                  <tr key={Index}>
                    <td>{task.name}</td>
                    <td>{task.environment.name}</td>
                    <td>{task.task_status.name}</td>
                    <td>{new Date(task.due_date).toDateString()}</td>
                    <td>{new Date(task.kickoff_date).toDateString()}</td>
                    <td className="text-center">
                      <button size="sm" className="btn" onClick={() => selectTask(task)}>
                        <Button
                          size="sm"
                          variant="outline-warning"
                          onClick={handleTaskDetailsShow}
                        >
                          View
                        </Button>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="all" title="All">
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th> Name </th>
                <th> enviroment</th>
                <th> Status </th>
                <th> Due date </th>
                <th> Kickoff date </th>
                <th>action </th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {UserAllTasksData.map((task, Index) => {
                return (
                  <tr key={Index}>
                    <td>{task.name}</td>
                    <td>{task.environment.name}</td>
                    <td>{task.task_status.name}</td>
                    <td>{new Date(task.due_date).toDateString()}</td>
                    <td>{new Date(task.kickoff_date).toDateString()}</td>
                    <td className="text-center">
                      <button size="sm" className="btn" onClick={() => selectTask(task)}>
                        <Button
                          size="sm"
                          variant="outline-warning"
                          onClick={handleTaskDetailsShow}
                        >
                          View
                        </Button>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

        </Card.Body>
      </Card>
      </Container>
  
    
      {/* Update Task */}
      <Modal show={showUpdateTask} onHide={handleUpdateTaskClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update{" "}
            <b>
              <u>{taskFormValue.name}</u>{" "}
            </b>{" "}
            Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitTaskUpdate}>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
              <FormControl
                aria-label="name"
                aria-describedby="name"
                name="name"
                placeholder="with a Project Or Task Name"
                type="text"
                onChange={handleChange}
                value={taskFormValue.name}
                disabled
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="task_status_id">Task Status:</InputGroup.Text>
              <Form.Select
                name="task_status_id"
                id="task_status_id"
                onChange={handleChange}
                value={taskFormValue.task_status_id}
                required
              >
                <option value="">Select Task Status</option>
                {TaskStatus.map((task_status, key) => {
                  return (
                    <option key={key} value={task_status.id}>
                      {task_status.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="environment_id">Enviroment:</InputGroup.Text>
              <Form.Select
                name="environment_id"
                id="environment_id"
                onChange={handleChange}
                value={taskFormValue.environment_id}
                disabled
                required
              >
                <option value="">Select Enviroment</option>
                {environmentValue.map((team, key) => {
                  return (
                    <option key={key} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="team_id">Team:</InputGroup.Text>
              <Form.Select
                name="team_id"
                id="team_id"
                onChange={handleChange}
                value={taskFormValue.team_id}
                disabled
                required
              >
                <option value="">Select Team</option>
                {teamValue.map((team, key) => {
                  return (
                    <option key={key} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="user_id">Assign To:</InputGroup.Text>
              <Form.Select
                name="user_id"
                id="user_id"
                onChange={handleChange}
                value={taskFormValue.user_id}
                disabled
                readOnly
                required
              >
                <option value="">Select select</option>
                {TeamMembers.map((user, key) => {
                  return (
                    <option key={key} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text  className="col-4">Comment :</InputGroup.Text>
              <FormControl
                as="textarea"
                aria-label="textarea"
                name="task_comment"
                onChange={handleChange}
                value={taskFormValue.task_comment}
                maxLength={200}
                disabled
                required
                type="textarea"
              />
            </InputGroup>
            <br />
            <Button variant="success" type="submit">
              Submit
            </Button>{" "}
            <Button variant="warning" onClick={handleUpdateTaskClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">update user record</label>
        </Modal.Footer>
      </Modal>

      {/* View Task Details */}
      <Modal show={showTaskDetails} onHide={handleTaskDetailsClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <b>
              <u>{taskFormValue.name}</u>{" "}
            </b>{" "}
            Full Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Row>
              <Col>Enviroment :</Col>
              <Col>
                <p>{taskValue.environment}</p>
              </Col>
            </Row>
            <Row>
              <Col>Kick Off Date</Col>
              <Col>
                <p>{taskValue.kickoff_date}</p>
              </Col>
            </Row>
            <Row>
              <Col>Due Date</Col>
              <Col>
                <p>{taskValue.due_date}</p>
              </Col>
            </Row>
            <Row>
              <Col>Last Updated:</Col>
              <Col>
                <p>{taskValue.last_update}</p>
              </Col>
            </Row>
            <Row>
              <Col>Days Left :</Col>
              <Col>
                <Badge pill bg="success">
                  <CountUp start={0} end={taskValue.days_left} delay={0}>
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
              <Col>Task Comment :</Col>
              <Col>
                <Form.Control
                  readOnly
                  as="textarea"
                  placeholder="task comment here"
                  style={{ height: "100px" }}
                  value={taskValue.task_comment}
                />
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">task details</label>
        </Modal.Footer>
      </Modal>

      {/* Overdue Task Details */}
      <Modal
        show={showOverDueTaskDetails}
        onHide={handleOverDueTaskDetailsClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <b>
              <u>{taskFormValue.name}</u>{" "}
            </b>{" "}
            Full Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Row>
              <Col>Enviroment :</Col>
              <Col>
                <p>{taskValue.environment}</p>
              </Col>
            </Row>
            <Row>
              <Col>Kick Off Date</Col>
              <Col>
                <p>{taskValue.kickoff_date}</p>
              </Col>
            </Row>
            <Row>
              <Col>Due Date</Col>
              <Col>
                <p>{taskValue.due_date}</p>
              </Col>
            </Row>
            <Row>
              <Col>Last Updated:</Col>
              <Col>
                <p>{taskValue.last_update}</p>
              </Col>
            </Row>
            <Row>
              <Col>Days Left :</Col>
              <Col>
                <Badge pill bg="danger">
                  <CountUp start={0} end={taskValue.days_left} delay={0}>
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
              <Col>Task Comment :</Col>
              <Col>
                <Form.Control
                  readOnly
                  as="textarea"
                  placeholder="task comment here"
                  style={{ height: "100px" }}
                  value={taskValue.task_comment}
                />
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">task details</label>
        </Modal.Footer>
      </Modal>
      {/* Completed Confirmation Live Issue */}
   {/*  Task */}
   <Modal  show={show_Complete_Task}  onHide={handleCloseSuccessCompleted} backdrop="static" size='md' keyboard={false}  >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  confirm that <b>{taskValue.user} completed </b><b>{taskValue.name}</b> task. 
                  Are you Sure?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" size='sm'  onClick={handleCloseSuccessCompleted}>
                      No
                    </Button>
                    <Button variant="primary" size='sm'  onClick={handle_Complete_Task}>Yes</Button>
                  </Modal.Footer>
                </Modal>
     
      {/* Toast Arlets */}

      <ToastContainer className="p-3" position={"top-end"}>
             {/* Duplicate Toast */}
          <Toast onClose={handleCloseDuplicateUpdate} show={duplicate_updated} bg={'warning'} delay={5000} autohide>
                              <Toast.Header>
                                <img
                                  src="holder.js/20x20?text=%20"
                                  className="rounded me-2"
                                  alt=""
                                />
                                <strong className="me-auto">Error</strong>
                              
                              </Toast.Header>
                              <Toast.Body className='text-white'>status already assigned</Toast.Body>
                            </Toast>
        {/* Successfully Updated */}
        <Toast
          onClose={handleCloseSuccessUpdate}
          show={success_updated}
          bg={"success"}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">
{<FcApproval/>}{' '}Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-white"> Updated Successfully</Toast.Body>
        </Toast>
        {/*  Error Update  */}
        <Toast
          onClose={handleCloseErrorUpdate}
          show={error_updated}
          bg={"warning"}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            please check input or task already assigned
          </Toast.Body>
        </Toast>

        {/*  Server Error  */}
        <Toast
          onClose={handleCloseServerError}
          show={server_error}
          bg={"danger"}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Server Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">server error occured</Toast.Body>
        </Toast>
                        {/* Successfully Completed */}
                        <Toast
            onClose={handleCloseSuccessComplete}
            show={success_completed}
            bg={"success"}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">
{<FcApproval/>}{' '}Completed</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              Task Completed Successfully
            </Toast.Body>
          </Toast>
      </ToastContainer>
    </div>
  );
}
export default DevTaskManager;
