import React, { useState } from "react";
import { URL } from "../../server_connections/server";
import {
  Card,
  Button,
  Form,
  Toast,
  ToastContainer,
  Nav,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../content/images/logo.png";
function ResetPassword() {
  const history = useNavigate();
  const [ResetValue, setResetValue] = useState({
    employee_code: "",
    password_reset: "",
  });

  // #################################################################

  // Toast Alerts State Controller

  // update  error toast controller
  const [error_updated, set_error_updated] = useState(false);
  const handleShowErrorUpdate = () => set_error_updated(true);
  const handleCloseErrorUpdate = () => set_error_updated(false);

  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);

  // update  error toast controller
  const [error_not_authorized, set_error_not_authorized] = useState(false);
  const handleShowErrorUnAuthorized = () => set_error_not_authorized(true);
  const handleCloseErrorUnAuthorized = () => set_error_not_authorized(false);

  // #################################################################

  const handleChange = (event) => {
    setResetValue({
      ...ResetValue,
      [event.target.name]: event.target.value,
    });
  };
  function handleSubmit(event) {
    event.preventDefault();
    fetch(`${URL}/api/user/resetkey`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_code: ResetValue.employee_code,
        user: {
          password_reset: ResetValue.password_reset,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        history("/accounts/forgot_password");
      } else if (Response.status === 401) {
        handleShowErrorUnAuthorized();
      } else if (Response.status === 422) {
        handleShowErrorUpdate();
      } else if (Response.status === 500) {
        handleShowServerError();
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
        <Card>
        <div style={{ margin: "auto" }}>
            <Nav.Link onClick={back_login}>
              <Card.Img variant="top" src={logo} />
            </Nav.Link>
          </div>

          <Card.Header>Request Reset Key</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text  className="col-4" id="employee-code">
                  Employee Code
                </InputGroup.Text>
                <FormControl
                  placeholder="Enter your employee code"
                  aria-label="employee-code"
                  aria-describedby="employee-code"
                  name="employee_code"
                  onChange={handleChange}
                  value={ResetValue.employee_code}
                  required
                />
              </InputGroup>
              <Button size="sm" variant="primary" type="submit">
                Request Key
              </Button>{" "}
              <Button size="sm" variant="info" onClick={back_login}>
                Back
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </div>

      {/* Toast Arlets */}
      <ToastContainer className="p-3" position={"top-end"}>
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
              src="holder.js/20x20?text=%20"
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

export default ResetPassword;
