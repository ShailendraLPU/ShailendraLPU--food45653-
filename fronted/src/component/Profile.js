import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";

export default class Profile extends Component {
  render() {
    const { username, email, contactNumber, address } = this.props.currentUser;
    return (
      <Jumbotron className="d-flex justify-content-center py-3">
        {this.props.currentUser && (
          <div className="text-center shadow p-5 mt-2">
            {" "}
            <img
              src="https://res.cloudinary.com/shailendraweb/image/upload/v1624789496/pudswmfxrqkw1j3aihlh.jpg"
              width="150px"
              height="150px"
              style={{ borderRadius: "100px" }}
              alt="userProfile"
            ></img>
            <h2>{username}</h2>
            <p>{email}</p>
            <p>{contactNumber}</p>
            <p>{address}</p>
            <p className="d-flex justify-content-center">
              <Button href="/orders" variant="dark" className="mx-2">
                CashBack : 50
              </Button>
              <Button href="editProfile" variant="dark" className="mx-2">
                Edit
                <img
                  src="https://img.icons8.com/material-outlined/24/ffffff/edit.png"
                  className="mx-1"
                />
              </Button>
            </p>
          </div>
        )}
      </Jumbotron>
    );
  }
}
