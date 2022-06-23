import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Tab,
  Table,
  Tabs,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { URL } from "../../server_connections/server";

function UserTools() {
  const history = useNavigate();
  const [active_teamsData, set_active_TeamsData] = useState([]);
  const [not_active_teamsData, set_not_active_TeamsData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [rolesData, setRoleData] = useState([]);
  const [UsersData, setUsersData] = useState([]);
  // role create modal control
  const [showAddRole, setShowRole] = useState(false);
  const handleCloseAddRole = () => setShowRole(false);
  const handleShowRole = () => {
    setShowRole(true);
    setRoleFormValue({
      id: 0,
      name: "",
    });
  };
  //role update modal control
  const [show_update_role, set_update_Show_role] = useState(false);
  const handle_update_Show_Role = () => set_update_Show_role(true);
  const handle_update_Close_Role = () => {
    set_update_Show_role(false);
    setRoleFormValue({
      id: 0,
      name: "",
    });
  };
  //role delete modal control
  const [show_delete_role, set_delete_role_Show] = useState(false);
  const handle_delete_Show_role = () => set_delete_role_Show(true);
  const handle_delete_Close_role = () => {
    set_delete_role_Show(false);
    setRoleFormValue({
      id: 0,
      name: "",
    });
  };

  // team create modal control
  const [showAddTeam, setShowTeam] = useState(false);
  const handleCloseAddTeam = () => {
    setShowTeam(false);
    setToolFormValue({
      id: 0,
      name: "",
      team_lead_id: 0,
    });
  };
  const handleShowTeam = () => setShowTeam(true);
  //team update modal control
  const [show_update_team, set_update_Show] = useState(false);
  const handle_update_Show_Team = () => set_update_Show(true);
  const handle_update_Close_Team = () => {
    set_update_Show(false);
    setToolFormValue({
      id: 0,
      name: "",
      team_lead_id: 0,
    });
  };
  //team deactive modal control
  const [show_deactive_team, set_deactive_Team_Show] = useState(false);
  const handle_deactive_Show_Team = () => set_deactive_Team_Show(true);
  const handle_deactive_Close_Team = () => {
    set_deactive_Team_Show(false);
    setToolFormValue({
      id: 0,
      name: "",
      team_lead_id: 0,
    });
  };
  //team active modal control
  const [show_active_team, set_active_Team_Show] = useState(false);
  const handle_active_Show_Team = () => set_active_Team_Show(true);
  const handle_active_Close_Team = () => {
    set_active_Team_Show(false);
    setToolFormValue({
      id: 0,
      name: "",
      team_lead_id: 0,
    });
  };
  //team delete modal control
  const [show_delete_team, set_delete_Team_Show] = useState(false);
  const handle_delete_Show_Team = () => set_delete_Team_Show(true);
  const handle_delete_Close_Team = () => {
    set_delete_Team_Show(false);
    setToolFormValue({
      id: 0,
      name: "",
      team_lead_id: 0,
    });
  };

  // #################################################################

  // Toast Alerts State Controller
  const [success_create, set_success_create] = useState(false);
  const handleShowsuccessCreate = () => set_success_create(true);
  const handleCloseSuccessCreate = () => set_success_create(false);
  // Create Toaster Error
  const [error_create, set_error_create] = useState(false);
  const handleShowErrorCreate = () => set_error_create(true);
  const handleCloseErrorCreate = () => set_error_create(false);

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

  // ########## NEW ######

  // #################################################################

  const [RoleFormValue, setRoleFormValue] = useState({
    id: 0,
    name: "",
  });

  // Buttong Toogle

  const [toolFormValue, setToolFormValue] = useState({
    id: 0,
    name: "",
    team_lead_id: 0,
  });
  // Keeps track of changes in the database
  const [old_team_data, set_old_team_data] = useState([]);
  const [old_role_data, set_old_role_data] = useState([]);
  const [old_user_data, set_old_user_data] = useState([]);
  function OldData() {
    set_old_team_data(teamsData);
    set_old_role_data(rolesData);
    set_old_user_data(UsersData);
  }

  const latest_team_data = useMemo(() => old_team_data, [old_team_data]);
  const latest_roles_data = useMemo(() => old_role_data, [old_role_data]);
  const latest_user_data = useMemo(() => old_user_data, [old_user_data]);
  useEffect(() => {
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
      .then((Result) => setTeamsData(Result.data));
    // fetch all active teams
    fetch(`${URL}/api/auth/active/teams`, requestOptions)
      .then((response) => response.json())
      .then((Result) => set_active_TeamsData(Result.data));
    // fetch all not active teams
    fetch(`${URL}/api/auth/not_active/teams`, requestOptions)
      .then((response) => response.json())
      .then((Result) => set_not_active_TeamsData(Result.data));
  }, [latest_team_data]);

  // Loading users
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    //Fetch all users
    fetch(`${URL}/api/auth/users`, requestOptions)
      .then((Response) => Response.json())
      .then((Result) => setUsersData(Result.data));
  }, [latest_user_data]);

  // Roles Effect
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${URL}/api/auth/user/roles`, requestOptions)
      .then((response) => response.json())
      .then((Result) => setRoleData(Result.data));
  }, [latest_roles_data]);

  // Create Functions
  function handleTeamSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/create/team`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        team_attrs: {
          name: toolFormValue.name,
          team_lead_id: toolFormValue.team_lead_id,
        },
      }),
    }).then((Response) => {
      Response.json();

      if (Response.status === 201) {
        handleShowsuccessCreate();
        handleCloseAddTeam();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorCreate();
      } else if (Response.status === 401) {
        history("/");
      }
    });
  }
  function handleRoleSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user/create/role`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        user_role_attrs: {
          name: RoleFormValue.name,
        },
      }),
    }).then((Response) => {
      Response.json();

      if (Response.status === 201) {
        handleShowsuccessCreate();
        handleCloseAddRole();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorCreate();
      } else if (Response.status === 401) {
        history("/");
      }
    });
  }

  // Update Fucntions
  function handle_Update_Team_Submit(event) {
    event.preventDefault();

    fetch(`${URL}/api/auth/update/team`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: toolFormValue.id,
        team_attrs: {
          name: toolFormValue.name,
          team_lead_id: toolFormValue.team_lead_id,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessUpdate();
        handle_update_Close_Team();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorUpdate();
      }
    });
  }
  function handle_activate_Team_Submit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/activate/team`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: toolFormValue.id,
        team_attrs: {
          name: toolFormValue.name,
          team_lead_id: toolFormValue.team_lead_id,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessActive();
        handle_active_Close_Team();
        OldData();
      } else if (Response.status === 422) {
        handleShowError();
      }
    });
  }
  function handle_deactivate_Team_Submit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/deactivate/team`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: toolFormValue.id,
        team_attrs: {
          name: toolFormValue.name,
          team_lead_id: toolFormValue.team_lead_id,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessDeActive();
        handle_deactive_Close_Team();
        OldData();
      } else if (Response.status === 422) {
        handleShowError();
      }
    });
  }

  function handle_Update_Role_Submit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user/role/update`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: RoleFormValue.id,
        user_role_attrs: {
          name: RoleFormValue.name,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessUpdate();
        handle_update_Close_Role();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorUpdate();
      }
    });
  }

  // Delete Fucntions
  function handleSubmitDeleteTeam(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/delete/team`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: toolFormValue.id,
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowSuccessDelete();
          handle_delete_Close_Team();
          OldData();
        } else if (response.status === 422) {
          handleShowErrorDelete();
          handle_delete_Close_Team();
        } else if (response.status === 500) {
          handleShowServerError();
          handle_delete_Close_Team();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }
  function handleSubmitDeleteRole(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user/role/delete`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: RoleFormValue.id,
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowSuccessDelete();
          handle_delete_Close_role();
          OldData();
        } else if (response.status === 422) {
          handleShowErrorDelete();
          handle_delete_Close_role();
        } else if (response.status === 500) {
          handleShowServerError();
          handle_delete_Close_role();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }

  const handleChange = (event) => {
    setToolFormValue({
      ...toolFormValue,
      [event.target.name]: event.target.value,
    });
    setRoleFormValue({
      ...RoleFormValue,
      [event.target.name]: event.target.value,
    });
  };

  function selectTool(tool) {
    setToolFormValue({
      id: tool.id,
      name: tool.name,
      team_lead_id: tool.team_lead.id,
    });
  }
  function seletRole(tool) {
    setRoleFormValue({
      id: tool.id,
      name: tool.name,
    });
  }

  return (
    <div className="mt-3">
      <Container fluid>
        <Card>
          <Card.Header className="text-uppercase">user Tools</Card.Header>
          <Card.Body className="admin-user-tool-card">
            <Tabs defaultActiveKey="team" className="mb-3">
              <Tab eventKey="team" title="Teams">
                <Button className="mt-1 mb-3"
                  variant="success"
                  size="sm"
                  onClick={handleShowTeam}
                >
                  + Add New Team
                </Button>
                <br />
                <Tabs defaultActiveKey="active" className="mb-3">
                  <Tab eventKey="active" title="Active">
                    <Table size="sm" striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-center">Id</th>
                          <th className="text-center">name</th>
                          <th className="text-center">Team Leader</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {active_teamsData.map((tool, Index) => {
                          return (
                            <tr key={Index}>
                              <th scope="row">{tool.id}</th>
                              <td>{tool.name}</td>
                              <td>{tool.team_lead.name}</td>
                              <td className="text-center">
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectTool(tool)}
                                >
                                  <Button
                                    variant="outline-warning"
                                    size="sm"
                                    onClick={handle_deactive_Show_Team}
                                  >
                                    Deactivate
                                  </Button>
                                </button>
                              </td>
                              <td className="text-center">
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectTool(tool)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handle_update_Show_Team}
                                  >
                                    Update
                                  </Button>
                                </button>{" "}
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectTool(tool)}
                                >
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handle_delete_Show_Team}
                                  >
                                    Delete
                                  </Button>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="not active" title="Not Active">
                    <Table size="sm" striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-center">Id</th>
                          <th className="text-center">name</th>
                          <th className="text-center">Team Leader</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {not_active_teamsData.map((tool, Index) => {
                          return (
                            <tr key={Index}>
                              <th scope="row">{tool.id}</th>
                              <td>{tool.name}</td>
                              <td>{tool.team_lead.name}</td>
                              <td className="text-center">
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectTool(tool)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handle_active_Show_Team}
                                  >
                                    Activate
                                  </Button>
                                </button>
                              </td>
                              <td className="text-center">
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectTool(tool)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handle_update_Show_Team}
                                  >
                                    Update
                                  </Button>
                                </button>{" "}
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectTool(tool)}
                                >
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handle_delete_Show_Team}
                                  >
                                    Delete
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
                          <th className="text-center">Id</th>
                          <th className="text-center">name</th>
                          <th className="text-center">Team Leader</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamsData.map((tool, Index) => {
                          return (
                            <tr key={Index}>
                              <th scope="row">{tool.id}</th>
                              <td>{tool.name}</td>
                              <td>{tool.team_lead.name}</td>
                              <td className="text-center">
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectTool(tool)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handle_update_Show_Team}
                                  >
                                    Update
                                  </Button>
                                </button>{" "}
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectTool(tool)}
                                >
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handle_delete_Show_Team}
                                  >
                                    Delete
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
              </Tab>

              <Tab eventKey="roles" title="Roles">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={handleShowRole}
                >
                  Add Roles
                </Button>
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rolesData.map((tool, Index) => {
                      return (
                        <tr key={Index}>
                          <th scope="row">{tool.id}</th>
                          <td>{tool.name}</td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={() => seletRole(tool)}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handle_update_Show_Role}
                              >
                                Update
                              </Button>
                            </button>{" "}
                            <button
                              size="sm"
                              className="btn"
                              onClick={() => seletRole(tool)}
                            >
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handle_delete_Show_role}
                              >
                                Delete
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

      {/* Modals */}

      {/* modal for roles*/}
      <Modal show={showAddRole} onHide={handleCloseAddRole}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Role </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRoleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={RoleFormValue.name}
                placeholder="Enter new role"
                required
              />
            </InputGroup>
            <Form.Text className="text-muted">
              please note you can't add records with same name.
            </Form.Text>
            <br />
            <Button variant="secondary" onClick={handleCloseAddRole}>
              Close
            </Button>{" "}
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">create a new role</label>
        </Modal.Footer>
      </Modal>

      {/* Modal for creating a team  */}
      <Modal show={showAddTeam} onHide={handleCloseAddTeam}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Team </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTeamSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="team_name">
                Name
              </InputGroup.Text>
              <FormControl
                aria-label="team_name"
                aria-describedby="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={toolFormValue.name}
                placeholder="Enter new team"
                required
              />
            </InputGroup>
            <Form.Group>
              <Form.Label> Team Leader : </Form.Label>
              <div className="form-group dropdown">
                <select
                  className="form-control"
                  name="team_lead_id"
                  onChange={handleChange}
                  id="team_lead_id"
                  value={toolFormValue.team_lead_id}
                  required
                >
                  <option value="">Select Team Leader:</option>
                  {UsersData.map((user, key) => {
                    return (
                      <option key={key} value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Form.Group>
            <Form.Text className="text-muted">
              please note you can't add records with same name.
            </Form.Text>
            <br />
            <Button variant="secondary" onClick={handleCloseAddTeam}>
              Close
            </Button>{" "}
            <Button variant="success" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">create a new team</label>
        </Modal.Footer>
      </Modal>

      {/* modal for updating record details  */}
      <Modal show={show_update_team} onHide={handle_update_Close_Team}>
        <Modal.Header closeButton>
          <Modal.Title>Update Team Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle_Update_Team_Submit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="Username"
                aria-describedby="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={toolFormValue.name}
                placeholder="Enter new team"
                required
              />
            </InputGroup>
            <Form.Text className="text-muted">
              please note you can't add to records with same name.
            </Form.Text>
            <Form.Group>
              <Form.Label> Team Leader : </Form.Label>
              <div className="form-group dropdown">
                <select
                  className="form-control"
                  name="team_lead_id"
                  onChange={handleChange}
                  id="team_lead_id"
                  value={toolFormValue.team_lead_id}
                  required
                >
                  <option value="">Select Team Leader:</option>
                  {UsersData.map((user, key) => {
                    return (
                      <option key={key} value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Form.Group>
            <Button variant="secondary" onClick={handle_update_Close_Team}>
              Close
            </Button>{" "}
            <Button variant="success" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">create a new team</label>
        </Modal.Footer>
      </Modal>

      {/* Activates Team */}
      <Modal
        show={show_active_team}
        onHide={handle_active_Close_Team}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Activate {toolFormValue.name}'s Status </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please confirm to activate <b>{toolFormValue.name}</b> from the
          system.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handle_active_Close_Team}>
            No
          </Button>{" "}
          <Button variant="success" onClick={handle_activate_Team_Submit}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* De activates Team */}
      <Modal
        show={show_deactive_team}
        onHide={handle_deactive_Close_Team}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deactivate {toolFormValue.name}'s Status </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please confirm to activate <b>{toolFormValue.name}</b> from the
          system. this action will remove this team from the system data
          interfaces
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handle_deactive_Close_Team}>
            No
          </Button>{" "}
          <Button variant="danger" onClick={handle_deactivate_Team_Submit}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update modal for Roles */}
      <Modal show={show_update_role} onHide={handle_update_Close_Role}>
        <Modal.Header closeButton>
          <Modal.Title>Update Role Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle_Update_Role_Submit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-describedby="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={RoleFormValue.name}
                placeholder="role name"
                required
              />
            </InputGroup>
            <Form.Text className="text-muted">
              please note you can't add to records with same name.
            </Form.Text>
            <br />
            <Button variant="secondary" onClick={handle_update_Close_Role}>
              Close
            </Button>{" "}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">update role record</label>
        </Modal.Footer>
      </Modal>

      {/* Delete Modals */}
      {/*  Teams*/}
      <Modal
        show={show_delete_team}
        onHide={handle_delete_Close_Team}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove team </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove <b>{toolFormValue.name}</b> from the
          system. this action can not be undone
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handle_delete_Close_Team}>
            No
          </Button>{" "}
          <Button variant="success" onClick={handleSubmitDeleteTeam}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Roles */}
      <Modal
        show={show_delete_role}
        onHide={handle_delete_Close_role}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove User Role </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove <b>{RoleFormValue.name}</b> from the
          system. this action can not be undone
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handle_delete_Close_role}>
            No
          </Button>{" "}
          <Button variant="success" onClick={handleSubmitDeleteRole}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

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
          <Toast.Body className="text-white"> Created Successfully</Toast.Body>
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
            Successfully De Activate{" "}
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
    </div>
  );
}
export default UserTools;
