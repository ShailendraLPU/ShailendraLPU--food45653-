import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";
import axios from "axios";
export default class Food extends Component {
  constructor(props) {
    super(props);
  }

  fvrtHandler = async (id) => {
    if (!this.props.isFvrt) {
      await axios.get(`/user/${this.props.currentUserId}/${id}/add`);
      this.props.isFvrtHandler(this.props.food._id);
      this.props.handleCartItemCountIncrease();
    } else {
      await axios.delete(`/user/${this.props.currentUserId}/${id}/remove`);
      this.props.isFvrtHandler(this.props.food._id);
      this.props.handleCartItemCountDecrease();
    }
  };

  proceedToPayment = async (id) => {
    await axios
      .post(`/foods/orderNow/${this.props.currentUserId}/${id}`)
      .then((res) => console.log(res));
  };

  deleteHandler = async (foodId) => {
    await axios
      .delete(`/food/${foodId}`)
      .then((res) => this.props.deleteHandler());
  };

  render() {
    const { _id, foodName, foodImg, rating, foodDesc, price } = this.props.food;
    return (
      <Col className="glass shadow p-4 p-4" md={6}>
        <img className="imgsize" src={foodImg} />
        <h2>{foodName}</h2>
        <p>{foodDesc}</p>
        <div className="d-flex justify-content-between">
          {" "}
          <p className="starability-result" data-rating={rating}></p>
          <p>
            <img
              src="https://img.icons8.com/material-sharp/24/000000/rupee.png"
              className="mr-0"
            />{" "}
            {price}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <Button
            onClick={() => this.proceedToPayment(_id)}
            variant="light btncolor p-2"
          >
            Order Now
          </Button>

          <Button
            onClick={() => this.fvrtHandler(_id)}
            variant="light"
            className="mx-2"
          >
            {" "}
            <img
              src={
                this.props.isFvrt
                  ? "https://img.icons8.com/color/24/000000/hearts.png"
                  : "https://img.icons8.com/material-outlined/24/000000/like--v1.png"
              }
            />
          </Button>
          {this.props.isAdmin && (
            <Button
              onClick={() => this.deleteHandler(_id)}
              variant="secondary  p-2"
            >
              Delete
            </Button>
          )}
          {this.props.isAdmin && (
            <Button
              onClick={() => this.props.editHandler(_id)}
              variant="primary p-2 mx-1"
            >
              Edit
            </Button>
          )}
        </div>
      </Col>
    );
  }
}
