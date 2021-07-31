import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import Food from "./Food";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      fvrtes: [],
      load: false,
    };
  }

  isFvrt = (foodId) => {
    return this.state.fvrtes.includes(`${foodId}`);
  };

  deleteHandler = async () => {
    await axios.get("/foods/cateagory/all").then((res) => {
      this.setState({
        foods: res.data.food,
      });
    });
  };

  isFvrtHandler = async (foodId) => {
    await axios
      .get(`/user/${this.props.currentUser._id}/getCart`)
      .then((res) => {
        this.setState({
          fvrtes: res.data.cart,
        });
      });
  };

  editHandler = (foodId) => {
    this.props.history.push(`/editFood/${foodId}`);
  };

  async componentDidMount() {
    if (this.props.match.params.cateagory) {
      await axios
        .get(
          `/foods/${this.props.match.params.cateagory}/${this.props.match.params.name}`
        )
        .then((res) => {
          this.setState({
            foods: res.data.food,
          });
        });

      await axios
        .get(`/user/${this.props.currentUser._id}/getCart`)
        .then((res) => {
          this.setState({
            fvrtes: res.data.cart,
            load: true,
          });
        });
    } else {
      await axios.get("/foods/cateagory/all").then((res) => {
        if (res.data.status) {
          this.setState({
            foods: res.data.food,
          });
        } else {
          this.props.history.push("/page404");
        }
      });
      await axios
        .get(`/user/${this.props.currentUser._id}/getCart`)
        .then((res) => {
          this.setState({
            fvrtes: res.data.cart,
            load: true,
          });
        });
    }
  }
  render() {
    const foods = this.state.foods.map((food) => {
      return (
        <Food
          key={food._id}
          food={food}
          isFvrt={this.isFvrt(food._id)}
          handleCartItemCountIncrease={this.props.handleCartItemCountIncrease}
          handleCartItemCountDecrease={this.props.handleCartItemCountDecrease}
          isFvrtHandler={this.isFvrtHandler}
          deleteHandler={this.deleteHandler}
          editHandler={this.editHandler}
          isAdmin={this.props.isAdmin}
          currentUserId={this.props.currentUser._id}
        />
      );
    });
    return (
      <Container className="main">
        <Row className="d-flex justify-content-evenly align-items-center main">
          {!this.state.load && (
            <Col md={12} className="text-center mx-auto my-4">
              <Spinner animation="border" variant="danger" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          )}
          {this.state.load && foods}
        </Row>
      </Container>
    );
  }
}
