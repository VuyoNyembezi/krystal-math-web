import React, {useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Navbar,Nav, Button, OverlayTrigger, Popover, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FcCalendar } from "react-icons/fc";
import logo from '../../../content/images/logo4.png';
function Header(){
// Calendar Tool
const [date,setDate] = useState(new Date());
const popover = (
  <Popover  >
    <Popover.Header as="h3">{localStorage.getItem('name')} Calender</Popover.Header>
    <Popover.Body>
    <div className='calendar-container'>
        <Calendar onChange={setDate} selectRange={true} value={date} />
      </div>
    </Popover.Body>
  </Popover>
);
function logout() {
  localStorage.clear()
}
    return (
<>
<header >
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >  
<Container fluid>
  <Navbar.Brand href='/dev'>
      <img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="cry_math_logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href='/dev'>Home</Nav.Link>   
      <Nav.Link href='/dev/tasks' >Tasks</Nav.Link>
      <Nav.Link href='/dev/projects' >Projects</Nav.Link>
      <Nav.Link href='/dev/my_overview' >My Overview</Nav.Link>
      <>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Nav.Link ><FcCalendar/> My Calendar</Nav.Link>
  </OverlayTrigger>
      </>
    </Nav>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Hi: {localStorage.getItem('name')}
      </Navbar.Text>
    </Navbar.Collapse>
    <Link onClick={() => logout()} to="/">
      <Button  size='sm' variant='warning'>
        Log out
      </Button>
    </Link></Navbar.Collapse>
</Container>

  </Navbar>

</header>
</>
    )
}

export default Header;