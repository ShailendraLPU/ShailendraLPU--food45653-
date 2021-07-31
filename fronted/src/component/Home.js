import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
export default class Home extends Component {
  render() {
    return (
      <>
        <Jumbotron className="imglanding d-flex justify-content-center align-items-center">
          <div className="mb-5 text-center">
            {" "}
            <h1 className="display-3 mb-4">
              Order Healthy and Delicious Food..
            </h1>
            <p>
              <Button
                className="btncolor fs-3 "
                href="/foods"
                variant="primary"
              >
                Get Started
              </Button>
            </p>
          </div>
        </Jumbotron>
      </>
    );
  }
}
