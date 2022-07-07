import React, { useState } from "react";
import { URL } from "../../server_connections/server";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  Toast,
  ToastContainer,
  InputGroup,
  FormControl,
  Nav,
} from "react-bootstrap";
import { FcApproval } from "react-icons/fc";
import default_user from "../content/images/default.jpg";
function Register(props) {
  const history = useNavigate();
  const [RegFormValue, setRegFormValue] = useState({
    employee_code: "",
    name: "",
    email: "",
    pass: "",
    last_name: "",
    team_id: 1,
    user_role_id: 2,
  });

  const handleChange = (event) => {
    setRegFormValue({
      ...RegFormValue,
      [event.target.name]: event.target.value,
    });
  };

  // #################################################################

  // Toast Alerts State Controller
  const [success_create, set_success_create] = useState(false);
  const handleShowsuccessCreate = () => set_success_create(true);
  const handleCloseSuccessCreate = () => {
    set_success_create(false);
    history("/");
  };
  // Create Toaster Error
  const [error_create, set_error_create] = useState(false);
  const handleShowErrorCreate = () => set_error_create(true);
  const handleCloseErrorCreate = () => set_error_create(false);

  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);
  //Error Toaster
  const [error_occured, set_error] = useState(false);
  const handleShowError = () => set_error(true);
  const handleCloseError = () => set_error(false);

  function handleSignUpUserSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/user/register`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          employee_code: RegFormValue.employee_code,
          name: RegFormValue.name,
          last_name: RegFormValue.last_name,
          email: RegFormValue.email,
          pass: RegFormValue.pass,
          team_id: RegFormValue.team_id,
          user_role_id: RegFormValue.user_role_id,
        },
      }),
    }).then((Response) => {
      Response.json(Response);
      if (Response.status === 201) {
        handleShowsuccessCreate();
      } else if (Response.status === 422) {
        handleShowErrorCreate();
      } else if (Response.status === 500) {
        handleShowServerError();
      } else if (!Response.status === 201 || !Response.status === 422) {
        handleShowError();
      }
    });
  }
  function back_login() {
    history("/");
  }

  return (
    <>
      <br />
      <div style={{ width: "500px", margin: "auto" }}>
        <Card className="shadow" style={{ maxWidth: "35rem" }}>
          <div style={{ margin: "auto" }}>
            <Nav.Link onClick={back_login}>
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src={default_user}
              />
            </Nav.Link>
          </div>

          <Card.Header> Sign Up </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSignUpUserSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="empCode" className="col-4">
                  Employee Code :
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Enter your employee code"
                  aria-label="Username"
                  aria-describedby="empCode"
                  maxLength={6}
                  name="employee_code"
                  onChange={handleChange}
                  value={RegFormValue.employee_code}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="name" className="col-4">
                  Name :
                </InputGroup.Text>
                <FormControl
                  type="text"
                  aria-describedby="name"
                  placeholder="enter your name"
                  name="name"
                  onChange={handleChange}
                  value={RegFormValue.name}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="last_name" className="col-4">
                  Last Name :
                </InputGroup.Text>
                <FormControl
                  type="text"
                  aria-describedby="last_name"
                  placeholder="enter your last name"
                  name="last_name"
                  onChange={handleChange}
                  value={RegFormValue.last_name}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="email" className="col-4">
                  Email :
                </InputGroup.Text>
                <FormControl
                  type="email"
                  aria-describedby="email"
                  placeholder="enter your email"
                  name="email"
                  onChange={handleChange}
                  value={RegFormValue.email}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="password" className="col-4">
                  Password :
                </InputGroup.Text>
                <FormControl
                  type="password"
                  aria-describedby="password"
                  minLength={6}
                  placeholder="Password"
                  name="pass"
                  onChange={handleChange}
                  value={RegFormValue.pass}
                  required
                />
              </InputGroup>
              <Form.Text id="passwordCheck" muted>
                Your password must have minimum of 6 characters
              </Form.Text>
              <br />
              <Button variant="primary" size="sm" type="submit">
                Create Account
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            i have acccount <Link to="/"> login</Link>
          </Card.Footer>
        </Card>
      </div>

      {/* Toast Arlets */}

      <ToastContainer className="p-3" position={"top-end"}>
        {/* Successfully Create */}
        <Toast
          onClose={handleCloseSuccessCreate}
          show={success_create}
          bg={"success"}
          delay={3000}
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
            Account Successfully Created{" "}
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
            please check input or Account Already Exists
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

export default Register;
