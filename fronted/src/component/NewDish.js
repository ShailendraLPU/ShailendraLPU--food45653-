import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../index.css";
export default class NewDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: "",
      foodDesc: "",
      rating: "",
      price: "",
      restraunt: "",
      foodImg: "",
      fileUpload: "",
      cateagory: "",
      foodType: "",
      deliveryTime: "",
    };
  }
  imgHandler = (e) => {
    const file = e.target.files[0];
    this.setFile(file);
  };
  setFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        foodImg: reader.result,
      });
    };
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios.post("/addFood", this.state).then((res) => {
      this.props.history.push("/foods");
    });
  };

  render() {
    return (
      <Container className="main">
        <Row className="d-flex justify-content-center p-5">
          <Col className="addItems p-3" md={8}>
            <Form onSubmit={this.submitHandler} className="d-flex flex-column">
              <Row className="d-flex justify-content-around">
                <Col md={6}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Foodname</Form.Label>
                    <Form.Control
                      name="foodName"
                      type="text"
                      placeholder="Foodname"
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Food Description</Form.Label>
                    <Form.Control
                      name="foodDesc"
                      type="text"
                      placeholder="Description"
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      name="rating"
                      type="number"
                      placeholder="Rating"
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      name="price"
                      type="number"
                      placeholder="350"
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Delivery Time</Form.Label>
                    <Form.Control
                      name="deliveryTime"
                      type="text"
                      placeholder="Delivery Time"
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Restraunt</Form.Label>
                    <Form.Control
                      name="restraunt"
                      type="text"
                      placeholder="MC-Donal"
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Food Image</Form.Label>
                    <Form.Control
                      id="foodImg"
                      name="foodImg"
                      type="file"
                      onChange={this.imgHandler}
                      placeholder="Image"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Cateagory</Form.Label>
                    <Form.Control
                      name="cateagory"
                      type="text"
                      placeholder="Veg"
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Food Type</Form.Label>
                    <Form.Control
                      name="foodType"
                      type="text"
                      placeholder="FastFood"
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                className="mt-3 addItemBtn "
                variant="primary"
                type="submit"
                onChange={this.changeHandler}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
