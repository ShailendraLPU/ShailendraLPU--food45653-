import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "../index.css";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      contactNumber: "",
      password: "",
      address: "",
      confirmPassword: "",
      registrationErrors: "",
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("/register", {
        username: this.state.username,
        email: this.state.email,
        contactNumber: this.state.contactNumber,
        password: this.state.password,
        address: this.state.address,
      })
      .then((res) => {
        if (res.data.userRegistered) {
          console.log(res);
          this.props.history.push("/login");
        } else {
          console.log(res);
          this.setState({
            registrationErrors: res.data.msg.message,
          });
        }
      })
      .catch((res) => console.log("register error", res));
  };

  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col md={6} className="signUpcolor  p-4 formCorner">
            {" "}
            <h1>Sign Up</h1>
            <Form onSubmit={this.submitHandler}>
              {!(this.state.registrationErrors === "") && (
                <Alert variant="danger">{this.state.registrationErrors}</Alert>
              )}
              <Form.Group className="signup" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className="mb-2"
                  name="username"
                  value={this.state.username}
                  onChange={this.changeHandler}
                  type="text"
                  placeholder="Username"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="mb-2"
                  name="email"
                  value={this.state.email}
                  onChange={this.changeHandler}
                  type="email"
                  placeholder="Email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>ContactNumber</Form.Label>
                <Form.Control
                  className="mb-2"
                  name="contactNumber"
                  value={this.state.contactNumber}
                  onChange={this.changeHandler}
                  type="number"
                  placeholder="contactnumber"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className="mb-2"
                  name="address"
                  value={this.state.address}
                  onChange={this.changeHandler}
                  type="text"
                  placeholder="Address"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="mb-2"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.changeHandler}
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
              <Button className="mt-3" type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
