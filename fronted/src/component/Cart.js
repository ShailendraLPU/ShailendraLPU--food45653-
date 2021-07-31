import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import CartItem from "./CartItem";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
      searchtext: "",
      discountAmount: 0,
      couponValid: false,
      load: false,
    };
  }
  changeHandler = (e) => {
    this.setState({
      searchtext: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.searchtext);
    axios
      .post("/foods/applyFoodCoupan", { foodCoupan: this.state.searchtext })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          this.setState({
            discountAmount: res.data.value,
            couponValid: true,
            searchtext: "",
          });
        }
      });
  };

  removeItemFromCart = async (itemId) => {
    await axios
      .delete(`/user/${this.props.currentUser._id}/${itemId}/remove`)
      .then((res) => {
        this.setState({
          cartProducts: res.data.user,
        });
        this.props.handleCartItemCountDecrease();
      });
  };

  ratingHandler = async (itemId) => {
    // const Product = this.state.cartProducts.filter(
    //   (food) => food._id === itemId
    // );
    this.props.history.push({
      pathname: "/orders",
      rateFoodId: itemId,
    });
  };
  async componentDidMount() {
    await axios.get(`/user/${this.props.currentUser._id}/cart`).then((res) => {
      this.setState({ cartProducts: res.data.cartProduct, load: true });
    });
  }

  render() {
    const cartElements = this.state.cartProducts.map((item) => {
      return (
        <CartItem
          key={item._id}
          removeItemFromCart={this.removeItemFromCart}
          ratingHandler={this.ratingHandler}
          item={item}
        />
      );
    });

    const cartBill = this.state.cartProducts.map((item) => {
      return (
        <li class="d-flex justify-content-between align-items-center list-group-item">
          <h3>{item.foodName}</h3>
          <h3>{item.price}</h3>
        </li>
      );
    });
    let totalAmount = 0;
    const totalBill = this.state.cartProducts.map((item) => {
      return (totalAmount += item.price);
    });
    return (
      <Container className="main">
        <Row className="d-flex justify-content-evenly pt-5 main">
          {!this.state.load && (
            <Col md={12} className="text-center mx-auto mb-4">
              <Spinner animation="border" variant="danger" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          )}
          {this.state.load && this.state.cartProducts.length === 0 && (
            <Col md={12} className="text-center mx-auto mb-4">
              <h1 className="display-4">There is No Product in Your Cart</h1>
            </Col>
          )}
          {this.state.cartProducts.length != 0 && this.state.load && (
            <Col md={5}>{cartElements}</Col>
          )}
          {this.state.cartProducts.length != 0 && this.state.load && (
            <Col md={3}>
              <ul class="list-group mb-3">
                {cartBill}
                <li class="d-flex justify-content-between align-items-center list-group-item">
                  <h3>Total Amount:</h3>
                  <h3>
                    {this.state.couponValid
                      ? totalAmount > this.state.discountAmount
                        ? totalAmount - this.state.discountAmount
                        : totalAmount
                      : totalAmount}
                  </h3>
                </li>
                <Button href="/paymentPage" variant="light btnPayment fs-4 p-2">
                  Proceed To Pay
                </Button>
              </ul>
              <h5 style={{ color: "white" }}>
                Apply Coupan{" "}
                <img
                  className="icon"
                  src="https://img.icons8.com/cotton/64/000000/discount--v2.png"
                />
              </h5>
              <Form className="d-flex mb-3" onSubmit={this.submitHandler}>
                <FormControl
                  name="coupanCode"
                  type="text"
                  value={this.state.searchtext}
                  placeholder="Coupan Code"
                  className="mr-sm-2"
                  onChange={this.changeHandler}
                />

                <Button type="submit" variant="secondary">
                  Apply
                </Button>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
