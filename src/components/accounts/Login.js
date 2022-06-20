import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Card,
  Modal,
  Nav,
  Toast,
  ToastContainer,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { URL } from "../../server_connections/server";

import logo from "../content/images/logo.png";
import { FcManager,FcApproval,FcBadDecision } from "react-icons/fc";

function Login() {
  // Authentication state
  const [TeamLeader, setTeamLeader] = useState(null);
  const [SDM, setSDM] = useState(null);
  const [Dev, setDev] = useState(null);
  const [manager, setManager] = useState(null);

  const [admin, setAdmin] = useState(null);
  const [Role, setRole] = useState(null);
  const [UID, setUID] = useState(null);
  const [myTeam, setTeam] = useState(null);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // default admin profile modal
  const [show_default, setShow_default] = useState(false);
  const handleClose_default = () => {
    setShow_default(false);
    handleShowDefaultsuccessLogin();
  };
  const handleShow_default = () => setShow_default(true);

  const [LoginValue, setLoginValue] = useState({
    employee_code: "",
    pass: "",
  });
  const [AdminLoginValue, setAdminLoginValue] = useState({
    employee_code: "",
    pass: "",
    password_reset: "",
  });
  // #################################################################
  // Defaualt Successful Toast
  const [default_success_login, set_default_success_login] = useState(false);
  const handleShowDefaultsuccessLogin = () => set_default_success_login(true);
  const handleCloseDefaultSuccessLogin = () => set_default_success_login(false);

  // Update Toaster
  const [success_login, set_success_login] = useState(false);
  const handleShowsuccessLogin = () => set_success_login(true);
  const handleCloseSuccessLogin = () => set_success_login(false);

  const [success_admin_login, set_success_admin_login] = useState(false);
  const handleShowsuccessAdminLogin = () => set_success_admin_login(true);
  const handleCloseSuccessAdminLogin = () => set_success_admin_login(false);

  // update  error toast controller
  const [error_login, set_error_login] = useState(false);
  const handleShowErrorLogin = () => set_error_login(true);
  const handleCloseErrorLogin = () => set_error_login(false);

  // update  error toast controller
  const [error_404_role, set_error_error_404_role] = useState(false);
  const handleShow404Role = () => set_error_error_404_role(true);
  const handleClose404Role = () => set_error_error_404_role(false);

  // update  error toast controller
  const [error_adimn_login, set_error_admin_login] = useState(false);
  const handleShowErrorAdminLogin = () => set_error_admin_login(true);
  const handleCloseErrorAdminLogin = () => set_error_admin_login(false);

  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);

  // update  error toast controller
  const [error_not_authorized, set_error_not_authorized] = useState(false);
  const handleShowErrorUnAuthorized = () => set_error_not_authorized(true);
  const handleCloseErrorUnAuthorized = () => set_error_not_authorized(false);

  // #################################################################
  const history = useNavigate();
  const handleChange = (event) => {
    setLoginValue({
      ...LoginValue,
      [event.target.name]: event.target.value,
    });
    setAdminLoginValue({
      ...AdminLoginValue,
      [event.target.name]: event.target.value,
    });
  };
  //checks for default profile
  useEffect(() => {
    let default_admin = "admin";
    let default_pass = "@Administrator";
    fetch(`${URL}/api/user/admin/new?employee_code=${default_admin}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((Result) => {
        setAdmin(Result.data);
        if (Result.data.password === default_pass) {
          handleShow_default();
        } 
      });
  }, [AdminLoginValue.employee_code]);
  // Developer State
  useEffect(() => {
    if (Dev === true) {
      localStorage.setItem("dev", Dev);
      localStorage.setItem("team", myTeam);
      localStorage.setItem("SUID", UID);
      localStorage.setItem("name", user);
    } else {
      localStorage.removeItem("dev");
      localStorage.removeItem("team");
      localStorage.removeItem("SUID");
      localStorage.removeItem("name");
    }
  }, [Dev, UID, myTeam, user]);
  // team leader stated
  useEffect(() => {
    if (TeamLeader === true) {
      localStorage.setItem("team_leader", TeamLeader);
      localStorage.setItem("team", myTeam);
      localStorage.setItem("SUID", UID);
      localStorage.setItem("name", user);
    } else {
      localStorage.removeItem("team_leader");
      localStorage.removeItem("team");
      localStorage.removeItem("SUID");
      localStorage.removeItem("name");
    }
  }, [TeamLeader, SDM, myTeam, UID, user]);
  // SD State
  useEffect(() => {
    if (SDM === true) {
      localStorage.setItem("sdm", SDM);
      localStorage.setItem("SUID", UID);
      localStorage.setItem("name", user);
    } else {
      localStorage.removeItem("team_leader");
      localStorage.removeItem("sdm");
      localStorage.removeItem("team");
      localStorage.removeItem("SUID");
      localStorage.removeItem("name");
    }
  }, [SDM, UID, user]);
  // manager state
  useEffect(() => {
    if (manager === true) {
      localStorage.setItem("manager", manager);
      localStorage.setItem("name", user);
    } else if (manager === false) {
      localStorage.removeItem("manager");
    }
  }, [manager,user]);
  // admin state
  useEffect(() => {
    if (admin === true) {
      localStorage.setItem("admin_state", admin);
    } else if (admin === false) {
      localStorage.removeItem("admin_state");
    }
  }, [admin]);

  useEffect(() => {
    //to check for role
    fetch(`${URL}/api/user/role?employee_code=${LoginValue.employee_code}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((Result) => {
        if (Result.data) {
          setRole(Result.data.user_role.id);
          setTeam(Result.data.team.id);
          setUser(Result.data.name);
          setUID(Result.data.id);
        } else if (!Result.data) {
          setRole(null);
          setTeam(null);
          setUID(null);
        }
      });
    localStorage.getItem("role", Role);
    localStorage.getItem("name", user);
  }, [Role, LoginValue.employee_code, user]);

  //Log in

  function handleLoginSubmit(event) {
    event.preventDefault();
    let manager_key = 3;
    let team_leader_key = 4;
    let sdm_key = 5;
    let dev_key = 2;
    fetch(`${URL}/api/user/signin`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_code: LoginValue.employee_code,
        pass: LoginValue.pass,
      }),
    })
      .then((Response) => Response.json(Response))
      .then((Result) => {
        // condition for managers navigation
        if (Result.status === 201 && Role === manager_key) {
          handleShowsuccessLogin();
          setManager(true);
          localStorage.setItem("key", Result.access_token);
          localStorage.setItem("employee_code", LoginValue.employee_code);
          history("/main_projects/");
        }
        // condition for team lead navigation
        else if (Result.status === 201 && Role === team_leader_key) {
          handleShowsuccessLogin();
          setTeamLeader(true);
          localStorage.setItem("key", Result.access_token);
          localStorage.setItem("employee_code", LoginValue.employee_code);
          history("/team_leader/operations");
        }
        // condition for sdm navigation
        else if (Result.status === 201 && Role === sdm_key) {
          handleShowsuccessLogin();
          setSDM(true);
          localStorage.setItem("key", Result.access_token);
          localStorage.setItem("employee_code", LoginValue.employee_code);
          history("/sdm/operations");
        }
        // condition for General User Or Developer navigation
        else if (Result.status === 201 && Role === dev_key) {
          handleShowsuccessLogin();
          setDev(true);
          localStorage.setItem("key", Result.access_token);
          localStorage.setItem("employee_code", LoginValue.employee_code);
          history("/dev");
        }
        // if above role is not valid
        else if (
          Result.status === 201 &&
          Role !== manager_key &&
          Role !== team_leader_key &&
          Role !== sdm_key &&
          Role !== dev_key
        ) {
          handleShow404Role();
          setTeamLeader(null);
          setAdmin(null);
          setSDM(null);
        } else if (Result.status === 401) {
          handleShowErrorLogin();
        } else if (Result.status === 500) {
          handleShowServerError();
        }
      });
  }

  // handles admin login function
  function handleAdminLoginSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/user/admin`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_code: AdminLoginValue.employee_code,
        pass: AdminLoginValue.pass,
      }),
    })
      .then((Response) => Response.json(Response))
      .then((Result) => {
        if (Result.status === 201) {
          handleShowsuccessAdminLogin();
          localStorage.setItem("key", Result.access_token);
          setAdmin(true);
          localStorage.setItem("user_admin", user);
          history("/admin/");
        } else if (Result.status === 401) {
          handleShowErrorAdminLogin();
        } else if (Result.status === 500) {
          handleShowServerError();
        }
      });
  }

  // Default admin password update
  function handle_Default_Admin_Update_Password_Submit(event) {
    event.preventDefault();
    fetch(`${URL}/api/user/admin/new_user_update`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_code: AdminLoginValue.employee_code,
        password_reset: AdminLoginValue.password_reset,
        user: {
          pass: AdminLoginValue.pass,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowDefaultsuccessLogin();
        handleClose_default();
        history("/");
      } else if (Response.status === 401) {
        handleShowErrorUnAuthorized();
      }
    });
  }
  function back_login() {
    history("/");
  }




  return (
    <>
      <br />
      <div className="login-container">
        <Card className="shadow">
            <Nav.Link className="mx-auto" onClick={back_login}>
              <Card.Img src={logo} />
            </Nav.Link>

          <Card.Header>
            {/* <div style={{ height: "32px"}}>  
          Login 
            </div> */}
            <Nav className="justify-content-end">
              <div className="col-md-51col-sm-9">
                As Admin :{" "}
                <button onClick={handleShow}>
                  <FcManager />
                </button>
              </div>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleLoginSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="empCode" className="col-4">Employee Code:</InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Enter your employee code"
                  aria-label="Username"
                  aria-describedby="empCode"
                  name="employee_code"
                  onChange={handleChange}
                  value={LoginValue.employee_code}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="password" className="col-4">Password:</InputGroup.Text>
                <FormControl
                  type="password"
                  placeholder="Password"
                  aria-label="Username"
                  aria-describedby="password"
                  name="pass"
                  onChange={handleChange}
                  value={LoginValue.pass}
                  required
                />
              </InputGroup>

              <Button size="sm" variant="primary" type="submit">
                Login
              </Button>
              {" "}
              <Link className="btn btn-sm btn-secondary" to="/accounts/reset_key"> Forgot password</Link>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            
          </Card.Footer>
          <Card.Footer className="text-muted text-end small">
            Don't have an Account? <Link to="/accounts/register">Register</Link>
          </Card.Footer>
        </Card>
      </div>

      {/* Modal for admin login form */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>Admin Login</Modal.Header>
        <div style={{ margin: "auto" }}>
            <Nav.Link onClick={handleClose}>
              <Card.Img variant="top" src={logo} />
            </Nav.Link>
          </div>
        <Modal.Body>
          <Card className="shadow" style={{ maxWidth: "35rem" }}>
            <Card.Body>
              <Form onSubmit={handleAdminLoginSubmit}>
                <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" className="col-4">Employee Code</InputGroup.Text>
                <FormControl
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="text"
                  placeholder="Enter your employee code"
                  name="employee_code"
                  onChange={handleChange}
                  value={AdminLoginValue.employee_code}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="password" className="col-4">Password :</InputGroup.Text>
                <FormControl
                  aria-label="passowrd"
                  aria-describedby="password"
                  type="password"
                  placeholder="Enter your employee code"
                  name="pass"
                  onChange={handleChange}
                  value={AdminLoginValue.pass}
                  required
                />
                </InputGroup>
                <Button size="sm" variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Link to="/accounts/reset_key"> forgot password ?</Link>
            </Card.Footer>
          </Card>
        </Modal.Body>

        {/* Toast Arlets */}
        <ToastContainer className="p-3" position={"top-end"}>
          {/* Successfully Admin Login */}
          <Toast
            onClose={handleCloseSuccessAdminLogin}
            show={success_admin_login}
            bg={"success"}
            delay={5000}
            autohide
          >
            <Toast.Header>
             
              <strong className="me-auto">{<FcApproval/>}{' '}Logged In</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              Welcome To Admin side of Krystal Maths{" "}
            </Toast.Body>
          </Toast>

          {/*  Error Update  */}
          <Toast
            onClose={handleCloseErrorAdminLogin}
            show={error_adimn_login}
            bg={"warning"}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              Incorrect Admin Employee Code or Password
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
      {/* Modal for 1st render of the application to update admin profile */}
      <Modal show={show_default} onHide={handleClose_default}>
        <Modal.Header closeButton>
          Welcome to Crystal Math please Update Admin your Password
        </Modal.Header>
        <Modal.Body>
          <Card style={{ maxWidth: "35rem" }}>
            <Card.Body>
              <Form onSubmit={handle_Default_Admin_Update_Password_Submit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="empCode" className="col-4">
                    Admin UserName :
                  </InputGroup.Text>
                  <FormControl
                    aria-label="EmpCode"
                    type="text"
                    placeholder="Enter your employee code"
                    name="employee_code"
                    onChange={handleChange}
                    value={AdminLoginValue.employee_code}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3 ">
                  <InputGroup.Text id="empCode"  className="col-4">Reset Key :</InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Enter / Paste your reset code"
                    name="password_reset"
                    onChange={handleChange}
                    value={AdminLoginValue.password_reset}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3 ">
                  <InputGroup.Text id="empCode"  className="col-4">New Password :</InputGroup.Text>
                  <FormControl
                    type="password"
                    minLength={6}
                    placeholder="Enter your new password"
                    name="pass"
                    onChange={handleChange}
                    value={AdminLoginValue.pass}
                    required
                  />
                </InputGroup>
                <Form.Text id="passwordCheck" muted>
                  Your password must be minimum 6 characters long
                </Form.Text>
                <Button size="sm" variant="primary" type="submit">
                  Update Password
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
              reset key can be found on your system documentation
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>

      {/* Toast Arlets */}
      <ToastContainer className="p-3" position={"top-end"}>
        <Toast
          onClose={handleCloseDefaultSuccessLogin}
          show={default_success_login}
          bg={"success"}
          delay={9000}
          autohide
        >
          <Toast.Header>
         
            <strong className="me-auto">Welcome To Crystal Math</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            Your Admin Account Is Set up Now you can Login Using the Admin Icon
            on top of your Login Form.
            <br /> Enjoy your Full Control Of the System{" "}
          </Toast.Body>
        </Toast>

        {/* Successfully Login */}
        <Toast
          onClose={handleCloseSuccessLogin}
          show={success_login}
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
            <strong className="me-auto"> {<FcApproval/>}{' '}Logged In</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            Welcome To Krystal Maths{" "}
          </Toast.Body>
        </Toast>

        {/*  Error Update  */}
        <Toast
          onClose={handleCloseErrorLogin}
          show={error_login}
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
            Incorrect Employee Code or Password
          </Toast.Body>
        </Toast>

        {/*  Error Update  */}
        <Toast
          onClose={handleClose404Role}
          show={error_404_role}
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
            <strong className="me-auto">Role Not Found</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            account role undefined please contact administrator
          </Toast.Body>
        </Toast>

        {/* Successfully Admin Login */}
        <Toast
          onClose={handleCloseSuccessAdminLogin}
          show={success_admin_login}
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
            <strong className="me-auto"> {<FcApproval/>}{' '}Logged In</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            Welcome To Admin side of Krystal Maths{" "}
          </Toast.Body>
        </Toast>

        {/*  Error Update  */}
        <Toast
          onClose={handleCloseErrorUnAuthorized}
          show={error_not_authorized}
          bg={"warning"}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <img
              src={<FcBadDecision/>}
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Un Authorized</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            this account is not authorized in our system
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
            <strong className="me-auto">Server Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">server error occured</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}


export default Login;
