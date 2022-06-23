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

import { URL } from "../../server_connections/server";

import { FcApproval } from "react-icons/fc";

function OperationTools() {
  const history = useNavigate();

  const [task_status_Data, setTaskStatus] = useState([]);
  const [environmentData, setEnvironmentData] = useState([]);
  const [memberStatusData, setMemberStatusData] = useState([]);
  // task status modal controller
  const [showTaskStatus, setShowTaskStatus] = useState(false);
  const handleCloseTaskStatus = () => {
    setShowTaskStatus(false);
    setToolFormValue({
      id: 0,
      name: "",
    });
  };
  const handleShowTaskStatus = () => setShowTaskStatus(true);
  //task status update modal control
  const [show_update_task_status, set_update_Show_task_status] =
    useState(false);
  const handle_update_Show_task_status = () =>
    set_update_Show_task_status(true);
  const handle_update_Close_task_status = () => {
    set_update_Show_task_status(false);
    setToolFormValue({
      id: 0,
      name: "",
    });
  };
  //task status delete modal control
  const [show_delete_task_status, set_delete_Show_task_status] =
    useState(false);
  const handle_delete_Show_task_status = () =>
    set_delete_Show_task_status(true);
  const handle_delete_Close_task_status = () =>
    set_delete_Show_task_status(false);

  // environment  modal controller
  const [showEnvironment, setShowEnvironment] = useState(false);
  const handleCloseEnvironment = () => {
    setShowEnvironment(false);
    setToolFormValue({
      id: 0,
      name: "",
    });
  };
  const handleShowEnvironment = () => setShowEnvironment(true);
  //enviroment update modal control
  const [show_update_environment, set_update_Show_environment] =
    useState(false);
  const handle_update_Show_environment = () =>
    set_update_Show_environment(true);
  const handle_update_Close_environment = () => {
    set_update_Show_environment(false);
    setToolFormValue({
      id: 0,
      name: "",
    });
  };
  //enviroment dlete modal control
  const [show_delete_environment, set_delete_Show_environment] =
    useState(false);
  const handle_delete_Show_environment = () =>
    set_delete_Show_environment(true);
  const handle_delete_Close_environment = () => {
    set_delete_Show_environment(false);
    setToolFormValue({
      id: 0,
      name: "",
    });
  };

  // member  modal controller
  const [showMemberStatus, setShowMemberStatus] = useState(false);
  const handleCloseMemberStatus = () => {
    setShowMemberStatus(false);
    setToolFormValue({
      id: 0,
      name: "",
    });
  };
  const handleShowMemberStatus = () => setShowMemberStatus(true);
  // memeber Status update modal controller
  const [show_update_member_status, set_update_Show_update_member_status] =
    useState(false);
  const handle_update_Show_member_status = () =>
    set_update_Show_update_member_status(true);
  const handle_update_Close_member_status = () => {
    set_update_Show_update_member_status(false);
    setToolFormValue({
      id: 0,
      name: "",
    });
  };
  // memeber Status delete modal controller
  const [show_delete_member_status, set_delete_Show_member_status] =
    useState(false);
  const handle_delete_Show_member_status = () =>
    set_delete_Show_member_status(true);
  const handle_delete_Close_member_status = () =>
    set_delete_Show_member_status(false);

  const [toolFormValue, setToolFormValue] = useState({
    id: 0,
    name: "",
  });

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

  // #################################################################

  const [old_user_status_data, set_old_user_status_data] = useState([]);
  const [old_enviroment_data, set_old_enviroment_data] = useState([]);
  const [old_task_status_data, set_old_task_status_data] = useState([]);
  function OldData() {
    set_old_enviroment_data(environmentData);
    set_old_task_status_data(task_status_Data);
    set_old_user_status_data(memberStatusData);
  }

  const latest_enviroment_data = useMemo(
    () => old_enviroment_data,
    [old_enviroment_data]
  );
  const latest_task_statsus_data = useMemo(
    () => old_task_status_data,
    [old_task_status_data]
  );
  const latest_user_status_data = useMemo(
    () => old_user_status_data,
    [old_user_status_data]
  );
  // Enviroment
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // fetch all environments
    fetch(`${URL}/api/auth/environments`, requestOptions)
      .then((response) => response.json())
      .then((results) => setEnvironmentData(results.data));
  }, [latest_enviroment_data]);
  // Task Status
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch all departments
    fetch(`${URL}/api/auth/task_statuses`, requestOptions)
      .then((response) => response.json())
      .then((Result) => setTaskStatus(Result.data));
  }, [latest_task_statsus_data]);

  // Member Status
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch all member status
    fetch(`${URL}/api/auth//user_status/all`, requestOptions)
      .then((response) => response.json())
      .then((results) => setMemberStatusData(results.data));
  }, [latest_user_status_data]);

  // Create Fucntion
  function handleTaskStatusSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/create/task_status`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        task_status_attrs: {
          name: toolFormValue.name,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 201) {
        handleShowsuccessCreate();
        handleCloseTaskStatus();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorCreate();
      } else if (Response.status === 401) {
        history("/");
      }
    });
  }

  function handleEnvironmentSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/create/environment`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        environment_attrs: {
          name: toolFormValue.name,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 201) {
        handleShowsuccessCreate();
        handleCloseEnvironment();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorCreate();
        handleCloseEnvironment();
      } else if (Response.status === 401) {
        history("/");
      }
    });
  }

  function handleMemberStatusSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/create/user_status`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        user_status_attrs: {
          name: toolFormValue.name,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 201) {
        handleShowsuccessCreate();
        handleCloseEnvironment();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorCreate();
        handleCloseEnvironment();
      } else if (Response.status === 401) {
        history("/");
      }
    });
  }

  // Update Functions
  function handle_Update_Task_Status_Submit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/update/task_status`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: toolFormValue.id,
        task_status_attrs: {
          name: toolFormValue.name,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessUpdate();
        handle_update_Close_task_status();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorUpdate();
        handle_update_Close_task_status();
      }
    });
  }

  function handle_Update_Environment_Submit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/update/environment`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: toolFormValue.id,
        environment_attrs: {
          name: toolFormValue.name,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessUpdate();
        handle_update_Close_environment();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorUpdate();
        handle_update_Close_environment();
      }
    });
  }

  function handle_Update_Member_Status_Submit(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/user_status/update`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: toolFormValue.id,
        user_status_attrs: {
          name: toolFormValue.name,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessUpdate();
        handle_update_Close_member_status();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorUpdate();
        handle_update_Close_member_status();
      }
    });
  }

  // Delete Functions
  function handleSubmitDeleteTaskStatus(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/delete/task_status`, {
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
          handle_delete_Close_task_status();
          OldData();
        } else if (response.status === 422) {
          handleShowErrorDelete();
          handle_delete_Close_task_status();
        } else if (response.status === 500) {
          handleShowServerError();
          handle_delete_Close_task_status();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }
  function handleSubmitDeleteEnviroment(event) {
    event.preventDefault();
    fetch(`${URL}/api/auths/delete/environment`, {
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
          handle_delete_Close_environment();
          OldData();
        } else if (response.status === 422) {
          handleShowErrorDelete();
          handle_delete_Close_environment();
        } else if (response.status === 500) {
          handleShowServerError();
          handle_delete_Close_environment();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }
  function handleSubmitDeleteMemberStatus(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/delete/user_status`, {
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
          handle_delete_Close_member_status();
          OldData();
        } else if (response.status === 422) {
          handleShowErrorDelete();
          handle_delete_Close_member_status();
        } else if (response.status === 500) {
          handleShowServerError();
          handle_delete_Close_member_status();
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
  };
  function selectTool(tool) {
    setToolFormValue({
      ...toolFormValue,
      id: tool.id,
      name: tool.name,
    });
  }

  return (
    <div className="mt-3">
      <Container fluid>
        <Card>
          <Card.Header>operation tools</Card.Header>
          <Card.Body className="admin-operational-tool-card">
            <Tabs defaultActiveKey="task Status" className="mb-3">
              <Tab eventKey="task Status" title="Task Status">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={handleShowTaskStatus}
                >
                  Add Task Status
                </Button>
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task_status_Data.map((tool, key) => {
                      return (
                        <tr key={key}>
                          <th scope="row">{tool.id}</th>
                          <td>{tool.name}</td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={() => selectTool(tool)}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handle_update_Show_task_status}
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
                                onClick={handle_delete_Show_task_status}
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
              <Tab eventKey="environment" title="Enviroment">
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={handleShowEnvironment}
                >
                  Add new Environment
                </Button>

                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {environmentData.map((tool, key) => {
                      return (
                        <tr key={key}>
                          <th scope="row">{tool.id}</th>
                          <td>{tool.name}</td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={() => selectTool(tool)}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handle_update_Show_environment}
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
                                onClick={handle_delete_Show_environment}
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
              <Tab eventKey="member_status" title="Member Status">
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={handleShowMemberStatus}
                >
                  Add new Status
                </Button>

                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberStatusData.map((tool, key) => {
                      return (
                        <tr key={key}>
                          <th scope="row">{tool.id}</th>
                          <td>{tool.name}</td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={() => selectTool(tool)}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handle_update_Show_member_status}
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
                                onClick={handle_delete_Show_member_status}
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
      {/* modal for task status */}
      <Modal show={showTaskStatus} onHide={handleCloseTaskStatus}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task Status </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaskStatusSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="Username"
                aria-describedby="name"
                name="name"
                onChange={handleChange}
                value={toolFormValue.name}
                placeholder="Enter new task status"
                required
              />
            </InputGroup>
            <Form.Text className="text-muted">
              please note you can't add records with same name.
            </Form.Text>
            <br />
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCloseTaskStatus}
            >
              Close
            </Button>{" "}
            <Button size="sm" variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">create a new department</label>
        </Modal.Footer>
      </Modal>

      {/* Update modal for Departments */}
      <Modal
        show={show_update_task_status}
        onHide={handle_update_Close_task_status}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Status Task Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle_Update_Task_Status_Submit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="Username"
                aria-describedby="name"
                name="name"
                onChange={handleChange}
                value={toolFormValue.name}
                placeholder="task status name"
                required
              />
            </InputGroup>
            <br />
            <Button
              size="sm"
              variant="secondary"
              onClick={handle_update_Close_task_status}
            >
              Close
            </Button>
            {"  "}
            <Button size="sm" variant="primary" type="submit">
              Update record
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">update department record</label>
        </Modal.Footer>
      </Modal>

      {/* Modal for  environment control */}

      <Modal show={showEnvironment} onHide={handleCloseEnvironment}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Environment </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEnvironmentSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="Username"
                aria-describedby="name"
                name="name"
                onChange={handleChange}
                value={toolFormValue.name}
                placeholder="Enter new environment"
                required
              />
            </InputGroup>
            <Form.Text className="text-muted">
              please note you can't add records with same name.
            </Form.Text>
            <br />
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCloseEnvironment}
            >
              Close
            </Button>{" "}
            <Button size="sm" variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">create a new environment</label>
        </Modal.Footer>
      </Modal>

      {/* Update modal for Environment */}
      <Modal
        show={show_update_environment}
        onHide={handle_update_Close_environment}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Environment Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle_Update_Environment_Submit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="Username"
                aria-describedby="name"
                name="name"
                onChange={handleChange}
                value={toolFormValue.name}
                placeholder="environment name"
                required
              />
            </InputGroup>
            <br />
            <Button
              size="sm"
              variant="secondary"
              onClick={handle_update_Close_environment}
            >
              Close
            </Button>{" "}
            <Button size="sm" variant="primary" type="submit">
              Update record
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">update environment record</label>
        </Modal.Footer>
      </Modal>

      {/* Modal for  member Status control */}

      <Modal show={showMemberStatus} onHide={handleCloseMemberStatus}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Member Status </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleMemberStatusSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="Username"
                aria-describedby="name"
                name="name"
                onChange={handleChange}
                value={toolFormValue.name}
                placeholder="Enter new meber status"
                required
              />
            </InputGroup>
            <Form.Text className="text-muted">
              please note you can't add records with same name.
            </Form.Text>
            <br />
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCloseMemberStatus}
            >
              Close
            </Button>{" "}
            <Button size="sm" variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">create a new member status </label>
        </Modal.Footer>
      </Modal>

      {/* Update modal for Memeber Status  */}
      <Modal
        show={show_update_member_status}
        onHide={handle_update_Close_member_status}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Member Status Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle_Update_Member_Status_Submit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="Username"
                aria-describedby="name"
                name="name"
                onChange={handleChange}
                value={toolFormValue.name}
                placeholder="member status name"
                required
              />
            </InputGroup>
            <br />
            <Button
              size="sm"
              variant="secondary"
              onClick={handle_update_Close_member_status}
            >
              Close
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Update record
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">update environment record</label>
        </Modal.Footer>
      </Modal>

      {/* DELETE MODAL */}
      {/*  Task  Status */}
      <Modal
        show={show_delete_task_status}
        onHide={handle_delete_Close_task_status}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Task Status </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove <b>{toolFormValue.name}</b>
          this action can not be undone
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={handle_delete_Close_task_status}
          >
            No
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSubmitDeleteTaskStatus}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  Enviroment   */}
      <Modal
        show={show_delete_environment}
        onHide={handle_delete_Close_environment}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Enviroment </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove <b>{toolFormValue.name}</b>
          this action can not be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={handle_delete_Close_environment}
          >
            No
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSubmitDeleteEnviroment}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  Member Status   */}
      <Modal
        show={show_delete_member_status}
        onHide={handle_delete_Close_member_status}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Memeber Status </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove <b>{toolFormValue.name}</b>
          this action can not be undone
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={handle_delete_Close_member_status}
          >
            No
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSubmitDeleteMemberStatus}
          >
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
      </ToastContainer>
    </div>
  );
}
export default OperationTools;
