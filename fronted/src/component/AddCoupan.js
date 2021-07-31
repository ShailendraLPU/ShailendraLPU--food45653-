import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default class AddCoupan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupanCode: "",
      discountAmount: 0,
      flag: false,
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
      .post("/foods/addFoodCoupan", {
        coupanCode: this.state.coupanCode,
        discountAmount: this.state.discountAmount,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          this.setState({ flag: true, coupanCode: "", discountAmount: 0 });
        }
      });
  };

  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col md={5} className="signUpcolor p-4 formCorner">
            {" "}
            <h1>Add Coupan</h1>
            <Form onSubmit={this.submitHandler}>
              {this.state.flag && (
                <Alert variant="danger">Coupan Added Successfully</Alert>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Counpan Code</Form.Label>
                <Form.Control
                  name="coupanCode"
                  value={this.state.coupanCode}
                  onChange={this.changeHandler}
                  type="text"
                  placeholder="coupanCode"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="discountAmount"
                  value={this.state.discountAmount}
                  onChange={this.changeHandler}
                  type="number"
                  placeholder="discountAmount"
                />
              </Form.Group>

              <Button
                type="submit"
                className="btncolor"
                variant="primary"
                type="submit"
              >
                Add
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
