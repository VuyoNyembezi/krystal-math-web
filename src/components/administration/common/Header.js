import React from 'react';

import {Navbar,Nav, Button, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../../content/images/logo4.png';
function Header(){

function logout() {
  localStorage.clear()
}
    return (
        <>
        <header >
        
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
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
              <Nav.Link href='/admin/'>Home</Nav.Link> 
              <Nav.Link href='/admin/user_tools'>User Tools</Nav.Link>
              <Nav.Link href='/admin/operational_tools'>Operation Tools</Nav.Link>
              <Nav.Link href='/admin/main_project_tools'>Main Project Tools</Nav.Link>
              <Nav.Link href='/admin/users'>Users</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Welcome to administration: {localStorage.getItem('user_admin')}
              </Navbar.Text>  
            </Navbar.Collapse>
            <Link onClick={() => logout()} to="/">
              <Button size='sm'  variant='warning'>
                Log out
              </Button>
            </Link>
            </Navbar.Collapse>
          </Container>
 
          </Navbar>
 
        </header>





        </>
    )
}

export default Header;