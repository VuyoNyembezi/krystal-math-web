import React from 'react';

import {Navbar,Nav, Button, NavDropdown, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import logo from '../../../content/images/logo4.png';
function Header(){

function logout() {
  localStorage.clear()
}
    return (
<>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
<Container fluid>

<Navbar.Brand href='/sdm/operations'>
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
      <Nav.Link href='/sdm/operations'>Home</Nav.Link>
      <NavDropdown title="Projects" >
          <NavDropdown.Item href="/sdm/operations/operational">Operational</NavDropdown.Item>
          <NavDropdown.Item href="/sdm/operations/strategic">Strategic</NavDropdown.Item>
         
        </NavDropdown>
      <Nav.Link href='/sdm/operations/live_issues' >Live Issues</Nav.Link>
      <Nav.Link href='/sdm/operations/teams_overview' >Teams Overview</Nav.Link>
    </Nav>
 
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Hi: {localStorage.getItem('name')} {' '}
        <Link onClick={() => logout()} to="/">
          <Button  size='sm' variant='warning'>
            Log out
          </Button>
        </Link>
      </Navbar.Text>
      
    </Navbar.Collapse>
    </Navbar.Collapse>
  
</Container>
  </Navbar>



 
</>
    )
}

export default Header;