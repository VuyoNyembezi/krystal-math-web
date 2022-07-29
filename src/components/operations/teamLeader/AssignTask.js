import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import { FcApproval } from "react-icons/fc";

import { URL } from "../../../server_connections/server";

function AssignTask() {
  // create date condition toasts
  // Kick off date less than today/now
  const [kickoff_date_less_now, set_kickoff_date_less_now] = useState(false);
  const handleShowKODateLessNow = () => set_kickoff_date_less_now(true);
  const handleCloseKODateLessNow = () => set_kickoff_date_less_now(false);
  // Kick off date less than due date
  const [kickoff_date_less_due_date, set_kickoff_date_less_due_date] =
    useState(false);
  const handleShowKODateLessDue = () => set_kickoff_date_less_due_date(true);
  const handleCloseKODateLessDue = () => set_kickoff_date_less_due_date(false);
  // Due  date less than now
  const [due_date_less_now, set_due_date_less_now] = useState(false);
  const handleShowDueDateLessNOW = () => set_due_date_less_now(true);
  const handleCloseDueDateLessNOW = () => set_due_date_less_now(false);
  // Due off date less than kickoff
  const [due_date_less_kickoff, set_due_date_less_kickoff] = useState(false);
  const handleShowDueDateLessKO = () => set_due_date_less_kickoff(true);
  const handleCloseDueDateLessKO = () => set_due_date_less_kickoff(false);

  // Toast Alerts State Controller
  const [success_create, set_success_create] = useState(false);
  const handleShowsuccessCreate = () => set_success_create(true);
  const handleCloseSuccessCreate = () => set_success_create(false);
  // Create Toaster Error
  const [error_create, set_error_create] = useState(false);
  const handleShowErrorCreate = () => set_error_create(true);
  const handleCloseErrorCreate = () => set_error_create(false);

  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);

  const history = useNavigate();
  const [TeamMembers, setTeamMembers] = useState([]);
  const [teamValue, setTeamValue] = useState([]);
  const [TaskStatus, setTaskStatus] = useState([]);
  const [environmentValue, setEnvironmentValue] = useState([]);

  // task  modal
  const [setShow_Add_task] = useState(false);
  const handleClose_Add_task = () => {
    setShow_Add_task(false);
    setTaskFormValue({
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
      id: 0,
    });
  };

  const [_user, setUser] = useState([]);
  //Task Assign And Form States
  const [taskFormValue, setTaskFormValue] = useState({
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
    id: 0,
  });

  useEffect(() => {
    // All team Members
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
    // fetch all teams (for form use)
    fetch(`${URL}/api/auth/teams`, requestOptions)
      .then((response) => response.json())
      .then((res) => setTeamValue(res.data));

    // fetch for environments (for form use)
    fetch(`${URL}/api/auth/environments`, requestOptions)
      .then((response) => response.json())
      .then((results) => setEnvironmentValue(results.data));

    // fetch for task statuses  (for form use)
    fetch(`${URL}/api/auth/task_statuses`, requestOptions)
      .then((response) => response.json())
      .then((results) => setTaskStatus(results.data));
  }, []);
  // Create Task
  function handleSubmitTaskCreate(event) {
    event.preventDefault();
    const today = new Date().toISOString();
    var kickoffValue = new Date(kickoffDate).toISOString();
    var due_dateValue = new Date(dueDate).toISOString();

    if (kickoffValue < today) {
      handleShowKODateLessNow();
    } else if (kickoffDate > due_dateValue) {
      handleShowKODateLessDue();
    } else if (due_dateValue < today) {
      handleShowDueDateLessNOW();
    } else if (due_dateValue < kickoffDate) {
      handleShowDueDateLessKO();
    } else {
      fetch(`${URL}/api/auth/task/create`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
        body: JSON.stringify({
          task: {
            name: taskFormValue.name,
            team_id: taskFormValue.team_id,
            user_id: taskFormValue.user_id,
            task_status_id: taskFormValue.task_status_id,
            environment_id: taskFormValue.environment_id,
            due_date: dueDate,
            kickoff_date: kickoffDate,
            task_comment: taskFormValue.task_comment,
          },
        }),
      })
        .then((response) => {
          response.json();
          if (response.status === 201) {
            handleShowsuccessCreate();
            handleClose_Add_task();
          } else if (response.status === 422) {
            handleShowErrorCreate();
          } else if (response.status === 500) {
            handleShowServerError();
          } else if (response.status === 401) {
            history("/");
          }
        })
        .then((results) => results.json());
    }
  }

  const dueDate = `${taskFormValue.due_date + " " + taskFormValue.due_time}`;
  const kickoffDate = `${
    taskFormValue.kickoff_date + " " + taskFormValue.kickoff_time
  }`;

  const handleChange = (event) => {
    setUser({
      ..._user,
      [event.target.name]: event.target.value,
    });
    setTaskFormValue({
      ...taskFormValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmitTaskCreate}>
        <FormGroup>
          <Label> Name : </Label>
          <Input
            name="name"
            placeholder="with a Project Or Task Name"
            type="text"
            onChange={handleChange}
            value={taskFormValue.name}
            required
          />
        </FormGroup>
        <Form.Group className="mb-3">
          <Form.Label>Task Status</Form.Label>
          <Form.Select
            name="task_status_id"
            id="task_status_id"
            onChange={handleChange}
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
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enviroment</Form.Label>
          <Form.Select
            name="environment_id"
            id="environment_id"
            onChange={handleChange}
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
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team</Form.Label>
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
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Assign To:</Form.Label>
          <Form.Select
            name="user_id"
            id="user_id"
            onChange={handleChange}
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
        </Form.Group>
        <InputGroup className="mb-3">
          <InputGroup.Text className="col-4" id="project-name">
            {" "}
            Start Date:{" "}
          </InputGroup.Text>
          <FormControl
            aria-label="Name"
            aria-describedby="project-name"
            name="kickoff_date"
            onChange={handleChange}
            value={taskFormValue.date}
            placeholder="date placeholder"
            type="date"
          />
          <FormControl
            name="kickoff_time"
            onChange={handleChange}
            value={taskFormValue.time}
            placeholder="time placeholder"
            type="time"
            defaultValue={"23:59"}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text className="col-4" id="project-name">
            {" "}
            Due Date:{" "}
          </InputGroup.Text>
          <FormControl
            aria-label="Name"
            aria-describedby="project-name"
            name="due_date"
            onChange={handleChange}
            value={taskFormValue.dueDate}
            placeholder="date placeholder"
            type="date"
          />
          <FormControl
            name="due_time"
            onChange={handleChange}
            value={taskFormValue.dueDate}
            placeholder="time placeholder"
            type="time"
            defaultValue={"23:59"}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text className="col-4">Comment :</InputGroup.Text>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            name="task_comment"
            maxLength={200}
            onChange={handleChange}
          />
        </InputGroup>
        <br />
        <Button variant="success" size="sm" type="submit">
          Create Task
        </Button>{" "}
      </Form>

      {/* Toast Arlets */}

      <ToastContainer className="p-3" position={"top-end"}>
        {/* Date Alerts Toast */}
        {/* KIck off Date less than Today */}
        <Toast
          onClose={handleCloseKODateLessNow}
          show={kickoff_date_less_now}
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
            <strong className="me-auto">KICK OFF DATE ERROR</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            kick off date can't be set to previous dates
          </Toast.Body>
        </Toast>
        {/* Kick off greater than Due Date */}
        <Toast
          onClose={handleCloseKODateLessDue}
          show={kickoff_date_less_due_date}
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
            <strong className="me-auto">KICK OFF DATE ERROR</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            kick off date can't be set ahead of due date
          </Toast.Body>
        </Toast>
        {/* Due Date  less Than Today*/}
        <Toast
          onClose={handleCloseDueDateLessNOW}
          show={due_date_less_now}
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
            <strong className="me-auto">DUE DATE ERROR</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            due date can't be set to previous date
          </Toast.Body>
        </Toast>
        {/* Due Date less Than Kick Off */}
        <Toast
          onClose={handleCloseDueDateLessKO}
          show={due_date_less_kickoff}
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
            <strong className="me-auto">DUE DATE ERROR</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            due date can't be set before kick off date
          </Toast.Body>
        </Toast>

        {/* Successfully Create */}
        <Toast
          onClose={handleCloseSuccessCreate}
          show={success_create}
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
            <strong className="me-auto">{<FcApproval />} Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            Task Created Successfully
          </Toast.Body>
        </Toast>
        {/* Error Create */}
        <Toast
          onClose={handleCloseErrorCreate}
          show={error_create}
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
            <strong className="me-auto">Error Occured</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
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
      </ToastContainer>
    </>
  );
}
export default AssignTask;
