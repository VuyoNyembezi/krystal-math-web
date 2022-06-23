import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Table,
  Tab,
  Button,
  Form,
  Modal,
  Tabs,
  Col,
  Nav,
  Toast,
  ToastContainer,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { URL } from "../../server_connections/server";
import { FcApproval } from "react-icons/fc";

function SystemUsers() {
  const [ActiveUsersData, setActiveUsersData] = useState([]);
  const [FilterActiveUsersData, setFilterActiveUsersData] = useState([]);
  const [TerminatedUsersData, setTerminatedUsersData] = useState([]);
  const [teamValue, setTeamValue] = useState([]);
  const [RolesData, setRolesData] = useState([]);

  const [_user, setUser] = useState([]);
  const history = useNavigate();
  // Users
  const [show_update_user, set_update_Show] = useState(false);
  const handle_update_Show = () => set_update_Show(true);
  const handle_update_Close = () => {
    set_update_Show(false);
    setForm({
      id: 0,
      name: "",
      last_name: "",
      email: "",
      team_id: 0,
      user_role_id: null,
      is_admin: false,
    });
  };
  // Terminate modal controller
  const [show_terminate_user, set_terminate_Show] = useState(false);
  const handle_terminate_Show = () => set_terminate_Show(true);
  const handle_terminate_Close = () => {
    set_terminate_Show(false);
    setForm({
      id: 0,
      name: "",
      last_name: "",
      email: "",
      team_id: 0,
      user_role_id: null,
      is_admin: false,
    });
  };
  // activate modal controller
  const [show_activate_user, set_activate_Show] = useState(false);
  const handle_activate_Show = () => set_activate_Show(true);
  const handle_activate_Close = () => {
    set_activate_Show(false);
    setForm({
      id: 0,
      name: "",
      last_name: "",
      email: "",
      team_id: 0,
      user_role_id: null,
      is_admin: false,
    });
  };
  // delete modal controller
  const [show_delete_user, set_delete_Show] = useState(false);
  const handle_delete_Show = () => set_delete_Show(true);
  const handle_delete_Close = () => {
    set_delete_Show(false);
    setForm({
      id: 0,
      name: "",
      last_name: "",
      email: "",
      team_id: 0,
      user_role_id: null,
      is_admin: false,
    });
  };

  // #################################################################

  // Update Toaster
  const [success_updated, set_success_updated] = useState(false);
  const handleShowsuccessUpdate = () => set_success_updated(true);
  const handleCloseSuccessUpdate = () => set_success_updated(false);

  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);
  // delete success toast controller

  const [success_delete, set_success_delete] = useState(false);
  const handleShowSuccessDelete = () => set_success_delete(true);
  const handleCloseSuccessDelete = () => set_success_delete(false);
  // delete success toast controller
  const [error_delete, set_error_delete] = useState(false);
  const handleShowErrorDelete = () => set_error_delete(true);
  const handleCloseErrorDelete = () => set_error_delete(false);
  // Active Toaster
  const [success_active, set_success_active] = useState(false);
  const handleShowsuccessActive = () => set_success_active(true);
  const handleCloseSuccessActive = () => set_success_active(false);
  //No Active Toaster
  const [success_de_activated, set_success_de_activated] = useState(false);
  const handleShowsuccessDeActive = () => set_success_de_activated(true);
  const handleCloseSuccessDeActive = () => set_success_de_activated(false);
  //Error Toaster
  const [error_occured, set_error] = useState(false);
  const handleShowError = () => set_error(true);
  const handleCloseError = () => set_error(false);

  // #################################################################

  const [formValue, setForm] = useState({
    id: 0,
    name: "",
    last_name: "",
    email: "",
    team_id: 0,
    user_role_id: null,
    is_admin: false,
  });
  const [old_all_accounts_data, set_old_all_accounts_data] = useState([]);
  const [old_terminted_accounts_data, set_oterminated_accounts_data] = useState(
    []
  );

  function OldData() {
    set_old_all_accounts_data(ActiveUsersData);
    set_oterminated_accounts_data(TerminatedUsersData);
  }

  const latest_active_accounts_data = useMemo(
    () => old_all_accounts_data,
    [old_all_accounts_data]
  );
  const latest_terminated_accounts_data = useMemo(
    () => old_terminted_accounts_data,
    [old_terminted_accounts_data]
  );
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    if (formValue.user_role_id !== null) {
      // By Role
      fetch(
        `${URL}/api/auth/user/role?id=${formValue.user_role_id}`,
        requestOptions
      )
        .then((Response) => Response.json())
        .then((Result) => setFilterActiveUsersData(Result.data));
    } else {
      // Active
      fetch(`${URL}/api/auth/users/active`, requestOptions)
        .then((Response) => Response.json())
        .then((Result) => setFilterActiveUsersData(Result.data));
    }
  }, [formValue.user_role_id]);
  // Fetch Teams and Roles Values
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // fetch teams
    fetch(`${URL}/api/auth/teams`, requestOptions)
      .then((response) => response.json())
      .then((res) => setTeamValue(res.data));

    // fetch roles
    fetch(`${URL}/api/auth/user/roles`, requestOptions)
      .then((response) => response.json())
      .then((Result) => setRolesData(Result.data));
  }, []);
  // Active Accounts
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // Active
    fetch(`${URL}/api/auth/users/active`, requestOptions)
      .then((Response) => Response.json())
      .then((Result) => setActiveUsersData(Result.data));
  }, [latest_active_accounts_data]);
  // Terminated Accounts
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // Terminated
    fetch(`${URL}/api/auth/users/terminated`, requestOptions)
      .then((Response) => Response.json())
      .then((Result) => setTerminatedUsersData(Result.data));
  }, [latest_terminated_accounts_data]);
  if (!ActiveUsersData) {
    return <p>no user</p>;
  }
  if (!RolesData) {
    return <p>no roles</p>;
  }
  if (!teamValue) {
    return <p>no team data</p>;
  }
  const handleChange = (event) => {
    setUser({
      ..._user,
      [event.target.name]: event.target.value,
    });

    setForm({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  function selectUser(user) {
    setUser({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      team_id: user.team_id,
      is_admin: user.is_admin,
    });

    setForm({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      team_id: user.team.id,
      user_role_id: user.user_role.id,
      is_admin: user.is_admin,
    });
  }
  // Update User Account
  function handleUpdateUser(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user/update`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: formValue.id,
        user: {
          is_admin: formValue.is_admin,
          team_id: formValue.team_id,
          user_role_id: formValue.user_role_id,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessUpdate();
        handle_update_Close();
        OldData();
      }
      if (Response.status === 422) {
        handleShowError();
        handle_update_Close();
      }
    });
  }

  // Update User Account
  function handleUserTerminateSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user/terminate`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: formValue.id,
        user: {
          is_admin: formValue.is_admin,
          team_id: formValue.team_id,
          user_role_id: formValue.user_role_id,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessDeActive();
        handle_terminate_Close();
        OldData();
      }
      if (Response.status === 422) {
        handleShowError();
        handle_terminate_Close();
      }
    });
  }
  function handleUserActivateSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user/activate`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: formValue.id,
        user: {
          is_admin: formValue.is_admin,
          team_id: formValue.team_id,
          user_role_id: formValue.user_role_id,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessActive();
        handle_activate_Close();
        OldData();
      }
      if (Response.status === 422) {
        handleShowError();
        handle_activate_Close();
      }
    });
  }

  // Delete function
  function handleSubmitDeleteUser(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user/delete`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: formValue.id,
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowSuccessDelete();
          handle_delete_Close();
        } else if (response.status === 422) {
          handleShowErrorDelete();
          handle_delete_Close();
          OldData();
        } else if (response.status === 500) {
          handleShowServerError();
          handle_delete_Close();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }

  return (
    <>
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header>
              {" "}
              <h4>Users :</h4>{" "}
            </Card.Header>
            <Card.Body className="admin-user-account-card">
              <Tabs
                defaultActiveKey="all"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="all" title="All Accounts (active)">
                  <Table size="sm" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Emp Code</th>
                        <th> Name </th>
                        <th> Last name </th>
                        <th> email </th>
                        <th> team</th>
                        <th> Role</th>
                        <th>Admin Rights </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ActiveUsersData.map((user, Index) => {
                        return (
                          <tr key={Index}>
                            <th scope="row">{user.employee_code}</th>
                            <td>{user.name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.team.name}</td>
                            <td>{user.user_role.name}</td>
                            <td>
                              {" "}
                              <Form.Select
                                size="sm"
                                value={user.is_admin}
                                disabled
                              >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </Form.Select>
                            </td>
                            <td className="text-center">
                              <button
                                size="sm"
                                className="btn"
                                onClick={() => selectUser(user)}
                              >
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  onClick={handle_update_Show}
                                >
                                  Update
                                </Button>
                              </button>{" "}
                              <button
                                size="sm"
                                className="btn"
                                onClick={() => selectUser(user)}
                              >
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={handle_terminate_Show}
                                >
                                  Termiante
                                </Button>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="filter" title="Filter Users ">
                  <div>
                    <Nav className="justify-content-start">
                      <div className="col-md-2 col-sm-1">
                        <Form.Group as={Col} className="mb-3">
                          <div className="form-group dropdown">
                            <select
                              className="form-control"
                              name="user_role_id"
                              id="user_role_id"
                              onChange={handleChange}
                              value={formValue.user_role_id}
                              required
                            >
                              <option>Select Role</option>
                              {RolesData.map((role, key) => {
                                return (
                                  <option key={key} value={role.id}>
                                    {role.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                    </Nav>
                  </div>
                  <Table size="sm" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Emp Code</th>
                        <th> Name </th>
                        <th> Last name </th>
                        <th> email </th>
                        <th> team</th>
                        <th> Role</th>
                        <th>Admin Rights </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {FilterActiveUsersData.map((user, Index) => {
                        return (
                          <tr key={Index}>
                            <th scope="row">{user.employee_code}</th>
                            <td>{user.name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.team.name}</td>
                            <td>{user.user_role.name}</td>
                            <td>
                              {" "}
                              <Form.Select
                                size="sm"
                                value={user.is_admin}
                                disabled
                              >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </Form.Select>
                            </td>
                            <td className="text-center">
                              <button
                                size="sm"
                                className="btn"
                                onClick={() => selectUser(user)}
                              >
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  onClick={handle_update_Show}
                                >
                                  Update
                                </Button>
                              </button>{" "}
                              <button
                                size="sm"
                                className="btn"
                                onClick={() => selectUser(user)}
                              >
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={handle_terminate_Show}
                                >
                                  Termiante
                                </Button>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="terminated" title="Terminated">
                  <Table size="sm" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Emp Code</th>
                        <th> Name </th>
                        <th> Last name </th>
                        <th> email </th>
                        <th> team</th>
                        <th> Role</th>
                        <th>Admin Rights </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {TerminatedUsersData.map((user, Index) => {
                        return (
                          <tr key={Index}>
                            <th scope="row">{user.employee_code}</th>
                            <td>{user.name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.team.name}</td>
                            <td>{user.user_role.name}</td>
                            <td>
                              {" "}
                              <Form.Select
                                size="sm"
                                value={user.is_admin}
                                disabled
                              >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </Form.Select>
                            </td>
                            {/* <td className="text-center"><button  onClick={() => selectUser(user)}>click</button>  </td>  */}
                            <td className="text-center">
                              <button
                                className="btn"
                                size="sm"
                                onClick={() => selectUser(user)}
                              >
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={handle_delete_Show}
                                >
                                  DELETE
                                </Button>
                              </button>{" "}
                              <button
                                className="btn"
                                size="sm"
                                onClick={() => selectUser(user)}
                              >
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={handle_activate_Show}
                                >
                                  Activate
                                </Button>
                              </button>{" "}
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
      </div>

      {/* modal for updating record details  */}
      <Modal show={show_update_user} onHide={handle_update_Close}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateUser}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                type="text"
                aria-label="name"
                aria-describedby="name"
                name="name"
                onChange={handleChange}
                value={formValue.name}
                placeholder="first name"
                readOnly
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Last Name :
              </InputGroup.Text>
              <FormControl
                type="text"
                aria-label="name"
                aria-describedby="name"
                name="last_name"
                onChange={handleChange}
                value={formValue.last_name}
                placeholder="display last name"
                readOnly
              />
            </InputGroup>
            <Form.Group className="mb-3">
              <Form.Label>Admin Rights</Form.Label>
              <div className="form-group dropdown">
                <select
                  className="form-control"
                  name="is_admin"
                  id="is_admin"
                  onChange={handleChange}
                  value={formValue.is_admin}
                  required
                >
                  <option value="">Assign Rights</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Team</Form.Label>
              <div className="form-group dropdown">
                <select
                  className="form-control"
                  name="team_id"
                  id="team_id"
                  onChange={handleChange}
                  value={formValue.team_id}
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
              <Form.Label>Role</Form.Label>
              <div className="form-group dropdown">
                <select
                  className="form-control"
                  name="user_role_id"
                  id="user_role_id"
                  onChange={handleChange}
                  value={formValue.user_role_id}
                  required
                >
                  <option value="">Select Role</option>
                  {RolesData.map((role, key) => {
                    return (
                      <option key={key} value={role.id}>
                        {role.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Form.Group>
            <Button size="sm" variant="secondary" onClick={handle_update_Close}>
              Close
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Update record
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">update user record</label>
        </Modal.Footer>
      </Modal>

      {/* Users Termination */}
      <Modal
        show={show_terminate_user}
        onHide={handle_terminate_Close}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Termination Confirmation </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about to terminate <b>{formValue.name}</b>'s
          acccount from the system. this account can no longer access the
          services of the system.
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={handle_terminate_Close}
          >
            No
          </Button>{" "}
          <Button
            size="sm"
            variant="danger"
            onClick={handleUserTerminateSubmit}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Users Activation */}
      <Modal
        show={show_activate_user}
        onHide={handle_activate_Close}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove User Role </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about activate <b>{formValue.name}</b>'s from the
          system. this account will gain access to services.
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handle_activate_Close}>
            No
          </Button>{" "}
          <Button
            size="sm"
            variant="success"
            onClick={handleUserActivateSubmit}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Users Account Removal */}
      <Modal
        show={show_delete_user}
        onHide={handle_delete_Close}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove User Role </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove <b>{formValue.name}</b>'s account
          from the system. this action can not be undone
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handle_delete_Close}>
            No
          </Button>{" "}
          <Button size="sm" variant="warning" onClick={handleSubmitDeleteUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Toast Arlets */}
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
            <strong className="me-auto">{<FcApproval />} Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-white"> Updated Successfully</Toast.Body>
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

        {/* Successfully Deleted */}
        <Toast
          onClose={handleCloseSuccessDelete}
          show={success_delete}
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
            <strong className="me-auto">{<FcApproval />} Successfully </strong>
          </Toast.Header>
          <Toast.Body className="text-white"> Deleted Successfully</Toast.Body>
        </Toast>
        {/* Error Delete  */}
        <Toast
          onClose={handleCloseErrorDelete}
          show={error_delete}
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
            error occurd please refresh the page to confirm if the record
            removed
          </Toast.Body>
        </Toast>

        {/* Successfully Active */}
        <Toast
          onClose={handleCloseSuccessActive}
          show={success_active}
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
            Successfully Activated{" "}
          </Toast.Body>
        </Toast>
        {/* Successfully Deactived */}
        <Toast
          onClose={handleCloseSuccessDeActive}
          show={success_de_activated}
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
            <strong className="me-auto">{<FcApproval />} Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Terminated Successfully
          </Toast.Body>
        </Toast>

        {/* Error   */}
        <Toast
          onClose={handleCloseError}
          show={error_occured}
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
          <Toast.Body className="text-white">error occured</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
export default SystemUsers;
