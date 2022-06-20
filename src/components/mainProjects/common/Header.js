import React from "react";

import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../../content/images/logo4.png";
function Header() {
  function logout() {
    localStorage.clear();
  }
  return (
    <>
      <Navbar  collapseOnSelect expand="lg"  bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand href="/main_projects/">
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
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/main_projects/">Home</Nav.Link>
              <Nav.Link href="/main_projects/operational_projects">
                Operational Projects
              </Nav.Link>
              <Nav.Link href="/main_projects/strategic_projects">
                Strategic Projects
              </Nav.Link>
              <Nav.Link href="/main_projects/projects_overView">
                Projects Overview
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Hi: {localStorage.getItem("name")}
              <Link onClick={() => logout()} to="/">
                <Button size="sm" variant="warning">
                  Log out
                </Button>
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>





      
    </>
  );
}

export default Header;
