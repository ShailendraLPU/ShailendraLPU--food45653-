import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default function CartItem(props) {
  const { foodName, _id, deliveryTime, foodImg, price } = props.item;
  return (
    <Row
      md={6}
      className="d-flex justify-content-between shadow mb-3 p-3 cartColor"
    >
      <Col className="text-center">
        {" "}
        <img className="cartImage" src={foodImg} />
      </Col>

      <Col md={5} className="d-flex flex-column justify-content-center">
        <div>
          {" "}
          <h2 className="text-center">{foodName}</h2>{" "}
          <h5 className="text-center">{deliveryTime}</h5>
        </div>
        <div className="text-center">
          <span className="fa fa-star checked "></span>
          <span className="fa fa-star checked "></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
        </div>
        <p className="d-flex justify-content-center align-items-center">
          <h3>
            <img src="https://img.icons8.com/material-sharp/24/000000/rupee.png" />
          </h3>
          <h3 className="text-center">{price}</h3>
        </p>
        <p className="d-flex justify-content-around">
          {" "}
          <Button
            onClick={() => props.ratingHandler(_id)}
            variant="primary  p-2"
          >
            Rating
          </Button>
          <Button
            onClick={() => props.removeItemFromCart(_id)}
            variant="light btncolor p-2"
          >
            Remove
          </Button>
        </p>
      </Col>
    </Row>
  );
}
