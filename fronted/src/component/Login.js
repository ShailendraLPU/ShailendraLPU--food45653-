import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginError: "",
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
      .post("/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.isAuthenticated) {
          const { username, contactNumber, email, _id, isAdmin, address } =
            res.data.user;
          const isAuthenticated = res.data.isAuthenticated;
          window.localStorage.setItem(
            "currentUser",
            JSON.stringify({
              username,
              contactNumber,
              email,
              isAuthenticated,
              _id,
              address,
              isAdmin,
            })
          );
          this.props.handleLogin({
            username,
            contactNumber,
            email,
            isAuthenticated,
            _id,
            address,
            isAdmin,
          });
          this.props.history.push("/foods");
        } else {
          this.setState({
            loginError: res.data.msg.message,
          });
        }
      });
  };

  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col md={5} className="signUpcolor p-4 formCorner">
            {" "}
            <h1>Login</h1>
            <Form onSubmit={this.submitHandler}>
              {(!(this.state.loginError === "") ||
                this.props.loginContinueMsg) && (
                <Alert variant="danger">
                  {this.state.loginError || this.props.loginContinueMsg}
                </Alert>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={this.state.username}
                  onChange={this.changeHandler}
                  type="text"
                  placeholder="Username"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button
                type="submit"
                className="btncolor"
                variant="primary"
                type="submit"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
