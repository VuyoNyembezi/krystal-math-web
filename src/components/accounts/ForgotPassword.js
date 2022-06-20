import React,{useEffect, useState} from 'react';
import { URL } from '../../server_connections/server';
import {Card,Button,Form, Toast, ToastContainer, InputGroup, FormControl, Nav} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

import logo from "../content/images/logo.png";

import { FcApproval } from "react-icons/fc";

function ForgotPassword() {
  
  const history = useNavigate();
    const [Forgot_Pass_Value, setForgot_Pass_Value] = useState({
        employee_code:"",
        password_reset:"",
        pass:""     
    })

// Toaster States
// Update Toaster
const [success_key,set_success_key] = useState(false);
const handleShowsuccessKey = () => set_success_key(true);
const handleCloseSuccessKey = () => set_success_key(false);

// Update Toaster
const [success_updated,set_success_updated] = useState(false);
const handleShowsuccessUpdate = () => set_success_updated(true);
const handleCloseSuccessUpdate = () => {set_success_updated(false);
  history('/');
};
// update  error toast controller
const [error_updated,set_error_updated] = useState(false); 
const handleShowErrorUpdate = () => set_error_updated(true);
const handleCloseErrorUpdate = () => set_error_updated(false);

// server error toast controller
const [server_error,set_server_error] = useState(false); 
const handleShowServerError = () => set_server_error(true);
const handleCloseServerError = () => set_server_error(false);

    const handleChange = (event) => {
        setForgot_Pass_Value({
            ...Forgot_Pass_Value,
            [event.target.name] : event.target.value,
        })
    };
useEffect(() =>{
  handleShowsuccessKey();
},[])
  
    function handleResetPasswordSubmit(event) {
        event.preventDefault()
            fetch(`${URL}/api/user/passwordreset`,{
            method: 'put',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employee_code: Forgot_Pass_Value.employee_code,
                password_reset:Forgot_Pass_Value.password_reset,
                user:{
                    pass: Forgot_Pass_Value.pass
                },
            })      
        }).then((Response) => {Response.json() 
          if(Response.status === 200){
            handleShowsuccessUpdate();
          }
          else if(Response.status === 401){
            handleShowErrorUpdate();
          }
          else if(Response.status === 422){
            handleShowErrorUpdate();
           
          }
          else if(Response.status === 500){
            handleShowServerError();
          }
        })  
    }

    function back_login(){
      history('/')
    }

    return (
        <>
      <br/>
      <div style={{width: "500px", margin: "auto"}} >
      <Card style={{maxWidth:'35rem'} }>
      <div style={{ margin: "auto" }}>
            <Nav.Link onClick={back_login}>
              <Card.Img variant="top" src={logo} />
            </Nav.Link>
          </div>
  <Card.Header>RESET PASSWORD</Card.Header>
  <Card.Body>
    
    <Form onSubmit={handleResetPasswordSubmit}>
  <InputGroup className="mb-3 ">
    <InputGroup.Text id="employee-code" className="col-4">Employee Code :</InputGroup.Text>
    <FormControl
      placeholder="Enter your employee code"
      aria-label="employee-code"
      aria-describedby="employee-code"
      name="employee_code" onChange={handleChange} value={Forgot_Pass_Value.employee_code} required
    />
  </InputGroup>
  <InputGroup className="mb-3 ">
    <InputGroup.Text id="reset-key" className="col-4">Reset Key:</InputGroup.Text>
    <FormControl
      placeholder="Enter / Paste your reset code"
      aria-label="reset-key"
      aria-describedby="reset-key"
      name="password_reset" onChange={handleChange} value={Forgot_Pass_Value.password_reset} required
    />
    </InputGroup>
    <InputGroup className="mb-3 ">
    <InputGroup.Text id="new-password" className="col-4">New Password:</InputGroup.Text>
    <FormControl
      placeholder="Enter your new password"
      aria-label="new-password"
      aria-describedby="new-password"
      type="password" 
      name="pass" onChange={handleChange} value={Forgot_Pass_Value.pass} required
    />
  </InputGroup>

  
  <Button size='sm' variant="primary" type="submit">
    Update Password
  </Button>
  {' '}{' '}
  <Button size='sm' variant="info" onClick={back_login}>
    Back
  </Button>
</Form>
  </Card.Body>
  <Card.Footer className="text-end"></Card.Footer>
</Card>
</div>
                   
              {/* Toast Arlets */}
              <ToastContainer className="p-3" position={'top-end'}>
        {/* Successfully Updated */}
        <Toast onClose={handleCloseSuccessKey} show={success_key} bg={'success'} delay={5000} autohide>
                        <Toast.Header>
                          
                          
                          
                          <strong className="me-auto"> {<FcApproval/>}{' '}Successfully</strong>
                        
                        </Toast.Header>
                        <Toast.Body className='text-white'> reset key sent please check you email</Toast.Body>
                      </Toast>
              {/* Successfully Updated */}
                        <Toast onClose={handleCloseSuccessUpdate} show={success_updated} bg={'success'} delay={3000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">{<FcApproval/>}{' '}Successfully</strong>
                        
                        </Toast.Header>
                        <Toast.Body className='text-white'>  Password Successfully Changed</Toast.Body>
                      </Toast>

                {/*  Error Update  */}
                <Toast onClose={handleCloseErrorUpdate} show={error_updated} bg={'warning'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">Error</strong>
                        
                        </Toast.Header>
                        <Toast.Body className='text-white'>please check input </Toast.Body>
                      </Toast>

                

                      {/*  Server Error  */}
                <Toast onClose={handleCloseServerError} show={server_error} bg={'danger'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">Server Error</strong>
                        
                        </Toast.Header>
                        <Toast.Body className='text-white'>server error occured</Toast.Body>
                      </Toast>


              
           
                  </ToastContainer>       

        </>
        
    );
}

export default ForgotPassword;