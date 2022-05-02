import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col className="mx-auto text-center">
          <h1>Home</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className="mx-auto text-center">
          <Button  as={Link} to="/home/social" variant="primary">
            Social
          </Button>
        </Col>
        <Col xs={6} className="mx-auto text-center">
          <Button as={Link} to="/home/profile" variant="primary">
            Profile
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
