import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-5">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            <p>&copy; 2024 Sorokin Production. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
