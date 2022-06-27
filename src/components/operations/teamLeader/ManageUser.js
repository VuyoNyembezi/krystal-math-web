import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardGroup,
  Table,
  Button,
  Badge,
  Form,
  Modal,
  Toast,
  ToastContainer,
  InputGroup,
  FormControl,
  Container,
  Nav,
} from "react-bootstrap";

import { FcApproval  } from "react-icons/fc";
import holder from "../../content/images/holder.png";
import { URL } from "../../../server_connections/server";
function ManageMembers() {
    // search state
    const [search_key, set_search_key] = useState({
      account_search: null,
    });
  // create date condition toasts
  // Kick off date less than today/now
  const [kickoff_date_less_now, set_kickoff_date_less_now] = useState(false);
  const handleShowKODateLessNow = () => set_kickoff_date_less_now(true);
  const handleCloseKODateLessNow = () => set_kickoff_date_less_now(false);
 // Kick off date less than due date
 const [kickoff_date_less_due_date, set_kickoff_date_less_due_date] = useState(false);
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
    to_date: "",
    to_time: "",
    from_date: "",
    from_time: "",
  });
  // Keeps track of changes in the database
  const [old_user_data, set_old_user_data] = useState([]);

  function OldData(){
    set_old_user_data(TeamMembers);

  };
  
  const latest_user_data = useMemo(() => old_user_data, [old_user_data]);

  useEffect(() => {

    if(search_key.account_search === null){
        fetch(`${URL}/api/auth/team/members?id=${localStorage.getItem("team")}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('key')}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((Response) => Response.json())
      .then((Result) => {
        setTeamMembers(Result.data.users);
      });
    
    }
       
 

    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('key')}`,
        "Content-Type": "application/json",
      },
    };
    // fetch all teams
    fetch(`${URL}/api/auth/teams`, requestOptions)
      .then((response) => response.json())
      .then((res) => setTeamValue(res.data));
  }, [latest_user_data, search_key]);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('key')}`,
        "Content-Type": "application/json",
      },
    };

    if(requestValue.team_id !== 0) {
       fetch(
      `${URL}/api/auth/team/members?id=${requestValue.team_id}`,
      requestOptions
    )
      .then((Response) => Response.json())
      .then((Result) => {
        setTeamMembersForm(Result.data.users);
      });
    }
   
  }, [requestValue.team_id]);

const fromDate = `${requestValue.from_date +' '+ requestValue.from_time}`
const toDate = `${requestValue.to_date +' '+ requestValue.to_time}`

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
    set_search_key({
      ...search_key,
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
        Authorization: `Bearer ${localStorage.getItem('key')}`,
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
  function handleSubmitLoanRequest(event) {
    event.preventDefault();
    const today = new Date().toISOString();
    var fromPeriodValue = new Date(fromDate).toISOString();
    var toPeriodValue = new Date(toDate).toISOString();
   
    if( fromPeriodValue < today){
     handleShowKODateLessNow();
  }
     else if(fromPeriodValue > toPeriodValue){
       handleShowKODateLessDue();
    }
    else if(toPeriodValue < today){
       handleShowDueDateLessNOW();
     }
     else if(toPeriodValue < fromPeriodValue){
      handleShowDueDateLessKO();
    }
     else {
      
    fetch(`${URL}/api/auth/user/map`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('key')}`,
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
  }
  function handle_Search_Account_Submit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    //search for Acctive Accounts
    fetch(`${URL}/api/auth/team/user/account/search?team_id=${localStorage.getItem('team')}&search=${search_key.account_search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => {
        setTeamMembers(Result.data);
      });

  }

  return (
    <>
 
<div className="mt-3">
  <Container fluid>
    <Card>
      <Card.Body className="teamlead-member-control-card">
               <CardGroup>
            <Card className="shadow" >
              <Card.Header>
                Team Leader:{" "}
                <b>
                  <i>{localStorage.getItem('name')}</i>
                </b>{" "}
              </Card.Header>
              <Nav className="justify-content-end">
              <div className="col-md-4 col-sm-7 mt-3 me-3">
                <Form
                  onSubmit={handle_Search_Account_Submit}
                  className="d-flex"
                >
                  <FormControl
                    type="search"
                    name="account_search"
                    placeholder="Search"
                    required
                    onChange={handleChange}
                    className="mr-3"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" type="submit" size="sm">
                    Search
                  </Button>
                </Form>
              </div>
            </Nav>
              <Card.Body className="teamlead-member-control-card-members-card">
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
            <Card  className="shadow"  >
            <Card.Header>Loan..</Card.Header>
              <Card.Body>
                <Card className="shadow" style={{ width: "40%" }}>
                            <Card.Img variant="top" src={holder} />
                            <Card.Body>
                            

                              <Badge className="badge rounded-pill bg-success ">
                                Request loan
                              </Badge>
                            <br />
                                <Button  variant="outline-success"  size="sm"   onClick={handleLoanRequestShow} >
                                  Request
                                </Button>
                          
                              <hr />
                            </Card.Body>
                          </Card> 
              </Card.Body>
            </Card>
          </CardGroup>
      </Card.Body>
   
    </Card>

  </Container>
  
</div>
          
     

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
            <InputGroup className="mb-3">
            <InputGroup.Text className="col-4" id="team_id">
              {" "}
              Team:{" "}
            </InputGroup.Text>
              <Form.Select
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
            </Form.Select>
            </InputGroup>
         
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
          <Form onSubmit={handleSubmitLoanRequest}>
         
            <InputGroup className="mb-3">
            <InputGroup.Text className="col-4" id="team_id">
              {" "}
              Team:{" "}
            </InputGroup.Text>
              <Form.Select
                  name="team_id"
                  id="team_id"
                  onChange={handleChange}
                  value={requestValue.team_id}
                  required
              >  <option value="">Select Team</option>
              {teamValue.map((team, key) => {
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
              Member:{" "}
            </InputGroup.Text>
              <Form.Select
                   name="user_id"
                   id="user_id"
                   onChange={handleChange}
                   value={requestValue.user_id}
                   required
              >    <option value="">Select Member</option>
              {TeamMembersForm.map((member, key) => {
                return (
                  <option key={key} value={member.id}>
                    {member.name}
                  </option>
                );
              })}
              </Form.Select>
              </InputGroup>
              <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="project-name"> Period: </InputGroup.Text>
              </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="project-name"> FROM: </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="project-name"
                name="from_date"
                onChange={handleChange}
                value={requestValue.from_date}
                placeholder="date placeholder"
                type="date"
              />
              <FormControl
                name="from_time"
                onChange={handleChange}
                value={requestValue.from_time}
                placeholder="time placeholder"
                type="time"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text  className="col-4" id="project-name"> TO: </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="project-name"
                name="to_date"
                onChange={handleChange}
                value={requestValue.to_date}
                placeholder="date placeholder"
                type="date"
              />
              <FormControl
                name="to_time"
                onChange={handleChange}
                value={requestValue.to_time}
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
          <ToastContainer className="p-3" position={'top-end'}>
{/* Date Alerts Toast */}
{/* KIck off Date less than Today */}
<Toast onClose={handleCloseKODateLessNow} show={kickoff_date_less_now} bg={"warning"} delay={5000}  autohide>
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
<Toast onClose={handleCloseKODateLessDue} show={kickoff_date_less_due_date} bg={"warning"} delay={5000}  autohide>
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
<Toast onClose={handleCloseDueDateLessNOW} show={due_date_less_now} bg={"warning"} delay={5000}  autohide>
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
  due  date can't be set to previous date
</Toast.Body>
</Toast>
{/* Due Date less Than Kick Off */}
<Toast onClose={handleCloseDueDateLessKO} show={due_date_less_kickoff} bg={"warning"} delay={5000}  autohide>
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
    </>
  );
}
export default ManageMembers;
