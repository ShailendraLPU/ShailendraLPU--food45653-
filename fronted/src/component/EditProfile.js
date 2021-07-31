import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      address: "",
      contactNumber: 0,
      email: "",
      load: false,
      changeDone: false,
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/user/editProfile/${this.props.currentUser._id}`, this.state)
      .then((res) => {
        if (res.data.status) {
          const { username, contactNumber, email, _id, isAdmin, address } =
            res.data.user;
          const isAuthenticated = true;
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
          this.setState({
            changeDone: true,
          });
        }
      });
  };

  componentDidMount() {
    axios.get(`/user/editProfile/${this.props.currentUser._id}`).then((res) => {
      // window.localStorage.removeItem("currentUser");
      this.setState({
        username: res.data.user.username,
        address: res.data.user.address,
        contactNumber: res.data.user.contactNumber,
        email: res.data.user.email,
        load: true,
      });
    });
  }

  render() {
    return (
      <Container className="main">
        <Row className="d-flex justify-content-center p-5">
          {!this.state.load && (
            <Col md={12} className="text-center mx-auto mb-4">
              <Spinner
                animation="border"
                className="display-1"
                variant="danger"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          )}
          {this.state.changeDone && (
            <Col md={4}>
              {" "}
              <Alert variant="info">Profile Updated Successfully</Alert>
            </Col>
          )}
          {this.state.load && !this.state.changeDone && (
            <Col className="addItems p-3" md={8}>
              <Form
                onSubmit={this.submitHandler}
                className="d-flex flex-column"
              >
                <Row className="d-flex justify-content-around">
                  <Col md={8}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="mb-2"
                        onChange={this.changeHandler}
                        value={this.state.username}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="mb-2"
                        onChange={this.changeHandler}
                        value={this.state.email}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        name="contactNumber"
                        type="text"
                        placeholder="Contact Number"
                        className="mb-2"
                        onChange={this.changeHandler}
                        value={this.state.contactNumber}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="address"
                        type="text"
                        className="mb-2"
                        placeholder="Address"
                        onChange={this.changeHandler}
                        value={this.state.address}
                      />
                    </Form.Group>

                    <Button
                      className="mt-3 addItemBtn "
                      variant="primary"
                      type="submit"
                      onChange={this.changeHandler}
                    >
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
