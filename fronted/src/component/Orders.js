import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import OrderItem from "./OrderItem";
import "../starRating.css";

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodId: "",
      orderProducts: [],
      comments: [],
      load: false,
      rating: 0,
      comment: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/food/review/${this.props.location.rateFood._id}`, {
        user: this.props.currentUser.username,
        rating: this.state.rating,
        comment: this.state.comment,
      })
      .then((res) => {
        // console.log(res);
        this.setState({
          comments: res.data.reviews,
        });
      });
  };
  async componentDidMount() {
    if (this.props.location.rateFoodId === undefined) {
      return this.props.history.push("/page404");
    }
    await axios
      .get(`/user/${this.props.currentUser._id}/orders`)
      .then((res) => {
        console.log(res.data.orderProduct);
        const food = res.data.orderProduct.filter(
          (food) => this.props.location.rateFoodId === food._id
        );
        {
          food.length > 0 && this.setState({ orderProducts: food });
        }
      });
    axios.get(`/food/review/${this.props.location.rateFoodId}`).then((res) =>
      this.setState({
        comments: res.data.reviews,
        comment: "",
        load: true,
      })
    );
  }

  render() {
    const orderElements = this.state.orderProducts.map((item) => {
      return (
        <OrderItem
          key={item._id}
          isAdmin={this.props.currentUser.isAdmin}
          item={item}
        />
      );
    });
    const reviewElements = this.state.comments
      .sort((a, b) => a - b)
      .filter((_temp, index) => index >= this.state.comments.length - 2)
      .map((item) => {
        return (
          <>
            <Card.Title>{item.user} </Card.Title>
            <p className="starability-result" data-rating={item.rating}></p>
            <Card.Text>{`${item.comment}`}</Card.Text>
          </>
        );
      });

    return (
      <Container className="main">
        <Row className="d-flex justify-content-evenly align-items-center pt-5 main">
          {this.state.orderProducts.length != 0 && this.state.load && (
            <Col md={5}>{orderElements[0]}</Col>
          )}

          {this.state.orderProducts.length === 0 && this.state.load && (
            <Col md={5} className="mb-4">
              <h1>This Product is not in Your Ordered List</h1>
            </Col>
          )}
          {!this.state.load && (
            <Col md={12} className="text-center mx-auto mt-2 mb-4">
              <Spinner animation="border" variant="danger" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          )}
          <Col md={3}>
            {this.state.orderProducts.length != 0 && this.state.load && (
              <>
                <h2>Rating:</h2>
                <Form onSubmit={this.submitHandler}>
                  <fieldset className="starability-basic">
                    <input
                      type="radio"
                      id="no-rate"
                      className="input-no-rate"
                      name="rating"
                      value="1"
                      checked
                      aria-label="No rating."
                    />
                    <input
                      type="radio"
                      id="first-rate1"
                      onChange={this.changeHandler}
                      name="rating"
                      value="1"
                    />
                    <label for="first-rate1" title="Terrible">
                      1 star
                    </label>
                    <input
                      type="radio"
                      onChange={this.changeHandler}
                      id="first-rate2"
                      name="rating"
                      value="2"
                    />
                    <label for="first-rate2" title="Not good">
                      2 stars
                    </label>
                    <input
                      type="radio"
                      onChange={this.changeHandler}
                      id="first-rate3"
                      name="rating"
                      value="3"
                    />
                    <label for="first-rate3" title="Average">
                      3 stars
                    </label>
                    <input
                      type="radio"
                      onChange={this.changeHandler}
                      id="first-rate4"
                      name="rating"
                      value="4"
                    />
                    <label for="first-rate4" title="Very good">
                      4 stars
                    </label>
                    <input
                      type="radio"
                      onChange={this.changeHandler}
                      id="first-rate5"
                      name="rating"
                      value="5"
                    />
                    <label for="first-rate5" title="Amazing">
                      5 stars
                    </label>
                  </fieldset>
                  <Card className="mb-5">
                    <Card.Header>
                      <h3>Reviews:</h3>
                    </Card.Header>
                    <Card.Body>{reviewElements}</Card.Body>
                    <Card.Body>
                      <Card.Title>{this.props.currentUser.username}</Card.Title>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          onChange={this.changeHandler}
                          name="comment"
                          rows={2}
                          value={this.state.comment}
                        />
                      </Form.Group>
                      <Button variant="primary" className="mt-2" type="submit">
                        Submit
                      </Button>
                    </Card.Body>
                  </Card>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
