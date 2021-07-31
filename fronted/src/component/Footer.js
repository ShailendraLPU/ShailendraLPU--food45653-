import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid className="footer px-4 py-4">
      <Row>
        <Col className="text-center">
          <h4>
            Developed By - Shailendra Srivastava{" "}
            <img src="https://img.icons8.com/material-outlined/40/000000/copyright.png" />
            All Rights reserved
          </h4>
        </Col>
      </Row>
    </Container>
  );
}
