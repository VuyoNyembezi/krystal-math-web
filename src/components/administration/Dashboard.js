import React from "react";
import { Card, Row, Nav, Container, Col } from "react-bootstrap";

import user_image from "../content/images/user.jpg";
import operations_image from "../content/images/operations.jpg";
import main_operation_image from "../content/images/mainOperation.jpg";

function DashBoard() {
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col className="mb-3 mb-sm-0" sm={4}>
            <Card>
              <Nav.Link href="/admin/user_tools">
                {" "}
                <Card.Img style={{height:"215px"}}
                  className="img-fluid"
                  variant="top"
                  src={user_image}
                />
              </Nav.Link>
              <Card.Body className="">
                <Card.Title>User Tools</Card.Title>
                <Card.Text>
                  User Teams and Roles management Removing Deactivate/Suspending the team Creating the and assigning Team leader.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3 mb-sm-0" sm={4}>
            <Card>
              <Nav.Link href="/admin/operational_tools">
                {" "}
                <Card.Img
                  className="img-fluid"
                  variant="top"
                  src={operations_image}
                />
              </Nav.Link>
              <Card.Body className="">
                <Card.Title>Operational Tools</Card.Title>
                <Card.Text>
                  System Operational Tools i.e Member Status on Project Assignments , Environment and main
                  sections of the tasks statuses
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3 mb-sm-0" sm={4}>
            <Card>
              <Nav.Link href="/admin/main_project_tools">
                <Card.Img style={{height:"215px"}}
                  className="img-fluid"
                  variant="top"
                  src={main_operation_image}
                />
              </Nav.Link>
              <Card.Body className="">
                <Card.Title>Main Project Tools</Card.Title>
                <Card.Text>
                  Newly Added Feature for main projects management i.e status, Types,Priority 
                  and categories of the main system operations all project properties.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashBoard;
