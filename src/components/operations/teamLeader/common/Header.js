import React from "react";

import { Navbar, Nav, Button, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../../../content/images/logo4.png';
function Header() {
  function logout() {
    localStorage.clear();
  }

  return (
    <>
      <header>
        
  <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">  
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
            <Nav.Link href="/team_leader/operations">Home</Nav.Link>
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              <NavDropdown.Item href="/team_leader/operations/operational">
                Operational Projects
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/team_leader/operations/strategic">
                Strategic Projects
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/team_leader/operations/task_manager">
              {" "}
              Management
            </Nav.Link>
            <Nav.Link href="/team_leader/operations/overview">
              {" "}
              Overview
            </Nav.Link>
            <Nav.Link href="/team_leader/operations/members_manager">
              Members Control
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Hi: {localStorage.getItem("name")}</Navbar.Text>
          </Navbar.Collapse>

          <Link onClick={() => logout()} to="/">
            <Button size="sm" variant="warning">
              Log out
            </Button>
          </Link></Navbar.Collapse>
</Container>
      



    
        </Navbar>
      </header>
    </>
  );
}

export default Header;
