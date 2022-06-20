import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardGroup,
  Table,
  Tab,
  Button,
  Badge,
  Form,
  Modal,
  Toast,
  ToastContainer,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { FcApproval  } from "react-icons/fc";



import holder from "../../content/images/holder.png";
import { URL } from "../../../server_connections/server";
import { Token } from "../../../server_connections/server";
function ManageMembers() {
  // Update Toaster
  const [success_updated, set_success_updated] = useState(false);
  const handleShowsuccessUpdate = () => set_success_updated(true);
  const handleCloseSuccessUpdate = () => set_success_updated(false);
  // update  error toast controller
  const [error_updated, set_error_updated] = useState(false);
  const handleShowErrorUpdate = () => set_error_updated(true);
  const handleCloseErrorUpdate = () => set_error_updated(false);
  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);

  const [TeamMembers, setTeamMembers] = useState([]);
  const [teamValue, setTeamValue] = useState([]);
  const [TeamMembersForm, setTeamMembersForm] = useState([]);
  const [_user, setUser] = useState([]);

  const [showUpdateUser, setUpdateShow] = useState(false);
  const handleUpdateShow = () => setUpdateShow(true);
  const handleUpdateClose = () => setUpdateShow(false);

  const [showLoanRequest, setLoanRequest] = useState(false);
  const handleLoanRequestShow = () => setLoanRequest(true);
  const handleLoanRequestClose = () => setLoanRequest(false);

  const [requestValue, setrequestvalue] = useState({
    user_id: 0,
    team_id: 0,
    duration: "",
    due_date: "",
    due_time: "",
  });
  // Keeps track of changes in the database
  const [old_user_data, set_old_user_data] = useState([]);

  function OldData(){
    set_old_user_data(TeamMembers);

  };
  
  const latest_user_data = useMemo(() => old_user_data, [old_user_data]);

  useEffect(() => {
    fetch(`${URL}/api/auth/team/members?id=${localStorage.getItem("team")}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${Token}`,
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
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
    };
    // fetch all teams
    fetch(`${URL}/api/auth/teams`, requestOptions)
      .then((response) => response.json())
      .then((res) => setTeamValue(res.data));
  }, [latest_user_data]);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(
      `${URL}/api/auth/team/members?id=${requestValue.team_id}`,
      requestOptions
    )
      .then((Response) => Response.json())
      .then((Result) => {
        setTeamMembersForm(Result.data.users);
      });
  }, [requestValue.team_id]);

  // const durationPeriod = `${requestValue.due_date +' '+ requestValue.due_time}`

  if (!TeamMembers) {
    return <p>no user</p>;
  }

  const handleChange = (event) => {
    setUser({
      ..._user,
      [event.target.name]: event.target.value,
    });

    setrequestvalue({
      ...requestValue,
      [event.target.name]: event.target.value,
    });
  };

  function selectUser(user) {
    setUser({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      team_id: user.team_id,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user/map`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify({
        id: _user.id,
        user: {
          team_id: _user.team_id,
        },
      }),
    }).then((Response) => {
      Response.json(Response);
      if (Response.status === 200) {
        handleShowsuccessUpdate();
        handleUpdateClose();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorUpdate();
      } else if (Response.status === 500) {
        handleShowServerError();
      }
    });
  }

  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="default">
        <Tab.Content>
          <h4> Members :</h4>

          <CardGroup>
            <Card className="shadow" style={{ height: "50rem" }}>
              <h4>
                Team Leader:{" "}
                <b>
                  <i>{localStorage.getItem('name')}</i>
                </b>{" "}
              </h4>
              <Card.Body>
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> Last name </th>
                      <th> email </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TeamMembers.map((user, Index) => {
                      return (
                        <tr key={Index}>
                          <th scope="row">{user.name}</th>
                          <td>{user.last_name}</td>
                          <td>{user.email}</td>

                          <td className="text-center">
                            <button size="sm" className="btn" onClick={() => selectUser(user)}>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handleUpdateShow}
                              >
                                Update
                              </Button>
                            </button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  only active users are listed
                </small>
              </Card.Footer>
            </Card>
            <Card
              className="shadow"
              style={{ maxWidth: "28rem", maxHeight: "70rem" }}
            >
              <Card className="shadow" style={{ width: "20rem" }}>
                <Card.Img variant="top" src={holder} />
                <Card.Body>
                  <Card.Title>{}</Card.Title>

                  <Badge className="badge rounded-pill bg-success ">
                    Request loan
                  </Badge>
                  <br />
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={handleLoanRequestShow}
                    >
                      Request
                    </Button>
                  </>
                  <hr />
                </Card.Body>
              </Card>

              <Card.Footer>
                <small className="text-muted">overview of your teammates</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Tab.Content>
      </Tab.Container>

      {/* modal for updating record details  */}
      <Modal show={showUpdateUser} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update <b>{_user.name}</b> Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
              <FormControl
                aria-label="name"
                aria-describedby="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={_user.name}
                placeholder="first name"
                readOnly
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="last_name">Last Name :</InputGroup.Text>
              <FormControl
                aria-label="last_name"
                aria-describedby="last_name"
                type="text"
                name="last_name"
                onChange={handleChange}
                value={_user.last_name}
                placeholder="last name"
                readOnly
              />
            </InputGroup>
            <Form.Group className="mb-3">
              <Form.Label>Team</Form.Label>
              <div className="form-group dropdown">
                <select
                  className="form-control"
                  name="team_id"
                  id="team_id"
                  onChange={handleChange}
                  value={_user.team_id}
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
                </select>
              </div>
            </Form.Group>
            <Button variant="secondary" onClick={handleUpdateClose}>
              Close
            </Button>{" "}
            <Button variant="success" type="submit">
              Update record
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">
            {" "}
            you are about to update <b>{_user.name}</b> record
          </label>
        </Modal.Footer>
      </Modal>

      <Modal show={showLoanRequest} onHide={handleLoanRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loan Request </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Team</Form.Label>
              <div className="form-group dropdown">
                <select
                  className="form-control"
                  name="team_id"
                  id="team_id"
                  onChange={handleChange}
                  value={requestValue.team_id}
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
                </select>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Member</Form.Label>
              <div className="form-group dropdown">
                <select
                  className="form-control"
                  name="user_id"
                  id="user_id"
                  onChange={handleChange}
                  value={requestValue.user_id}
                  required
                >
                  <option value="">Select Member</option>
                  {TeamMembersForm.map((member, key) => {
                    return (
                      <option key={key} value={member.id}>
                        {member.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="project-name"> Period: </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="project-name"
                name="due_date"
                onChange={handleChange}
                value={requestValue.due_date}
                placeholder="date placeholder"
                type="date"
              />
              <FormControl
                name="due_time"
                onChange={handleChange}
                value={requestValue.due_time}
                placeholder="time placeholder"
                type="time"
              />
            </InputGroup>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLoanRequestClose}
            >
              Close
            </Button>{" "}
            <Button variant="success" size="sm" type="submit">
              Send
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">request details</label>
        </Modal.Footer>
      </Modal>

      <ToastContainer className="p-3" position={"top-end"}>
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
            <strong className="me-auto">{<FcApproval/>}{' '}Successfully</strong>
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
            please check input or value already assigned
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
    </div>
  );
}
export default ManageMembers;
