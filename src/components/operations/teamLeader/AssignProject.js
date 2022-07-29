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
import { FcApproval } from "react-icons/fc";

import { URL } from "../../../server_connections/server";
function AssignProject() {
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
  // Create Toaster Error
  const [limit_reached, set_limit_reached] = useState(false);
  const handleShowLimitReached = () => set_limit_reached(true);
  const handleCloseLimitReached = () => set_limit_reached(false);

  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);

  const history = useNavigate();
  const [UserStatus, setUserStatus] = useState([]);

  const [ProjectCategoryType, setProjectCategoryType] = useState([]);
  const [ProjectType, setProjectType] = useState([]);
  const [projectData, set_ProjectData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [_user, setUser] = useState([]);
  //Assign and Update Projects
  const [AssignProjectFormValue, setAssignProjectFormValue] = useState({
    user_id: 0,
    project_type_id: 0,
    project_category_type_id: 0,
    project_id: 0,
    due_date: "",
    due_time: "",
    kickoff_date: "",
    kickoff_time: "",
    team_id: localStorage.getItem("team"),
    user_status_id: 0,
    active: true,
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

    // fetch team members
    fetch(
      `${URL}/api/auth/team/members?id=${localStorage.getItem("team")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => setUserData(Result.data.users));

    // fetch for project category type Data
    fetch(`${URL}/api/auth/project_category_type/all`, requestOptions)
      .then((response) => response.json())
      .then((results) => setProjectCategoryType(results.data));

    // fetch for project type Data
    fetch(`${URL}/api/auth/project_type/all`, requestOptions)
      .then((response) => response.json())
      .then((results) => setProjectType(results.data));

    // fetch for task statuses
    fetch(`${URL}/api/auth/user_status/all`, requestOptions)
      .then((response) => response.json())
      .then((results) => setUserStatus(results.data));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // ############################

    // fetch all bet projects assigned to the team
    fetch(
      `${URL}/api/auth/team/projects/category_and_project_type/all?team_id=${localStorage.getItem(
        "team"
      )}&category_type=${
        AssignProjectFormValue.project_category_type_id
      }&project_type=${AssignProjectFormValue.project_type_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => set_ProjectData(res.data));
  }, [
    AssignProjectFormValue.project_type_id,
    AssignProjectFormValue.project_category_type_id,
  ]);
  const dueDate = `${
    AssignProjectFormValue.due_date + " " + AssignProjectFormValue.due_time
  }`;
  const kickoffDate = `${
    AssignProjectFormValue.kickoff_date +
    " " +
    AssignProjectFormValue.kickoff_time
  }`;
  function handleSubmitAssignMember(event) {
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
      fetch(`${URL}/api/auth/project_assignment/assign`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
        body: JSON.stringify({
          projects_assignment: {
            project_type_id: AssignProjectFormValue.project_type_id,
            project_category_type_id:
              AssignProjectFormValue.project_category_type_id,
            team_id: AssignProjectFormValue.team_id,
            user_id: AssignProjectFormValue.user_id,
            user_status_id: AssignProjectFormValue.user_status_id,
            project_id: AssignProjectFormValue.project_id,
            due_date: dueDate,
            kickoff_date: kickoffDate,
            active: true,
          },
        }),
      })
        .then((response) => {
          response.json();
          if (response.status === 201) {
            handleShowsuccessCreate();
          } else if (response.status === 422) {
            handleShowErrorCreate();
          } else if (response.status === 412) {
            handleShowLimitReached();
          } else if (response.status === 500) {
            handleShowServerError();
          } else if (response.status === 401) {
            history("/");
          }
        })
        .then((results) => results.json());
    }
  }

  const handleChange = (event) => {
    setUser({
      ..._user,
      [event.target.name]: event.target.value,
    });
    setAssignProjectFormValue({
      ...AssignProjectFormValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmitAssignMember}>
        <InputGroup className="mb-3">
          <InputGroup.Text className="col-4" id="user_status_id">
            {" "}
            Status:{" "}
          </InputGroup.Text>
          <Form.Select
            name="user_status_id"
            id="user_status_id"
            onChange={handleChange}
            required
          >
            <option value="">Select Member Status</option>
            {UserStatus.map((task_status, key) => {
              return (
                <option key={key} value={task_status.id}>
                  {task_status.name}
                </option>
              );
            })}
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="col-4" id="project_category_type_id">
            {" "}
            Category:{" "}
          </InputGroup.Text>
          <Form.Select
            name="project_category_type_id"
            id="project_category_type_id"
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {ProjectCategoryType.map((project_category_type, key) => {
              return (
                <option key={key} value={project_category_type.id}>
                  {project_category_type.name}
                </option>
              );
            })}
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="col-4" id="project_type_id">
            {" "}
            Project Type:{" "}
          </InputGroup.Text>
          <Form.Select
            name="project_type_id"
            id="project_type_id"
            onChange={handleChange}
            required
          >
            <option value="">Select Project Type</option>
            {ProjectType.map((project_type, key) => {
              return (
                <option key={key} value={project_type.id}>
                  {project_type.name}
                </option>
              );
            })}
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text className="col-4" id="project_id">
            {" "}
            Project:{" "}
          </InputGroup.Text>
          <Form.Select
            name="project_id"
            id="project_id"
            onChange={handleChange}
            required
          >
            <option value="">Select Project</option>
            {projectData.map((team, key) => {
              return (
                <option key={key} value={team.id}>
                  {team.name}
                </option>
              );
            })}
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text className="col-4" id="user_id">
            {" "}
            Assign To:{" "}
          </InputGroup.Text>
          <Form.Select
            name="user_id"
            id="user_id"
            onChange={handleChange}
            required
          >
            <option value="">Select Member</option>
            {userData.map((user, key) => {
              return (
                <option key={key} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </Form.Select>
        </InputGroup>
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
            value={AssignProjectFormValue.kickoff_date}
            placeholder="date placeholder"
            type="date"
          />
          <FormControl
            name="kickoff_time"
            onChange={handleChange}
            value={AssignProjectFormValue.kickoff_time}
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
            value={AssignProjectFormValue.due_date}
            placeholder="date placeholder"
            type="date"
          />
          <FormControl
            name="due_time"
            onChange={handleChange}
            value={AssignProjectFormValue.due_time}
            placeholder="time placeholder"
            type="time"
            defaultValue={"23:59"}
          />
        </InputGroup>
        <Button variant="primary" type="submit">
          Assign
        </Button>
      </Form>
      <>
        {/* Toast Arlets */}

        <ToastContainer className="p-3" position={"top-end"}>
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
              Assigned Successfully
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
              please check input or Record already exists
            </Toast.Body>
          </Toast>

          <Toast
            onClose={handleCloseLimitReached}
            show={limit_reached}
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
              Limit Reach Can't Assign more projects on This Dev
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
        </ToastContainer>
      </>
    </>
  );
}
export default AssignProject;
