import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "../index";

export default class Navbaar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchtext: "",
    };
  }

  changeHandler = (e) => {
    this.setState({
      searchtext: e.target.value,
    });
  };

  handleLogout = async () => {
    window.localStorage.removeItem("currentUser");
    await axios.get("/logout");
    console.log("logout handle1");
    this.props.handleLogout();
  };

  render() {
    const { username } = this.props.currentUser;
    return (
      <Navbar sticky="top" className="color" bg="light" expand="lg">
        <Navbar.Brand href="/" className="p-2">
          <h1 style={{ color: "white" }}>Foodies</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="nav" id="basic-navbar-nav">
          <Nav className="mr-md-auto">
            {this.props.currentUser.isAdmin && (
              <Nav.Link
                href="/addCoupan"
                style={{ color: "white" }}
                className="fs-4"
              >
                <img
                  className="icon"
                  src="https://img.icons8.com/cotton/64/000000/discount--v2.png"
                />{" "}
                AddCoupans
              </Nav.Link>
            )}

            {this.props.currentUser.isAdmin && (
              <Nav.Link
                href="/addDish"
                style={{ color: "white" }}
                className="fs-4"
              >
                <img
                  className="icon"
                  src="https://img.icons8.com/office/16/000000/french-fries.png"
                />{" "}
                Add Dish
              </Nav.Link>
            )}
            {this.props.loggedInStatus && (
              <Nav.Link
                href="/foods"
                style={{ color: "white" }}
                className="fs-4"
              >
                Foods
              </Nav.Link>
            )}
            {this.props.loggedInStatus && (
              <NavDropdown
                title="Filter"
                className="fs-4"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/foods/cateagory/veg">
                  Veg
                </NavDropdown.Item>
                <NavDropdown.Item href="/foods/category/nonveg">
                  NonVeg
                </NavDropdown.Item>
                <NavDropdown.Item href="/foods/foodType/Dish">
                  Dish
                </NavDropdown.Item>
                <NavDropdown.Item href="/foods/foodType/Beverages">
                  Beverages
                </NavDropdown.Item>
                <NavDropdown.Item href="/foods/foodType/fast-food">
                  FastFood
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <div className="d-flex">
            {this.props.loggedInStatus && (
              <DropdownButton
                id="dropdown-basic-button"
                variant="dark"
                title={username}
              >
                <Dropdown.Item href="/userProfile">Profile</Dropdown.Item>
              </DropdownButton>
            )}

            {this.props.loggedInStatus && (
              <div className="d-flex p-0">
                <Nav.Link href="/cart" className="p-0 mx-2 mt-1">
                  <img
                    className="icon"
                    src="https://img.icons8.com/fluent/48/000000/fast-cart.png"
                  />
                  <sup style={{ color: "red", fontSize: "15px" }}>
                    {this.props.cartCount}
                  </sup>
                </Nav.Link>
              </div>
            )}
            {!this.props.loggedInStatus && (
              <Nav.Link
                href="/registration"
                style={{ color: "white" }}
                className="btnshape"
              >
                Register
              </Nav.Link>
            )}

            {!this.props.loggedInStatus && (
              <Nav.Link
                href="/login"
                style={{ color: "white" }}
                className="btnshape"
              >
                Login
              </Nav.Link>
            )}

            {this.props.loggedInStatus && (
              <Form className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={this.changeHandler}
                />

                <Button
                  className="mx-2"
                  href={`/foods/name/${this.state.searchtext}`}
                  variant="primary"
                >
                  Search
                </Button>
              </Form>
            )}
            {this.props.loggedInStatus && (
              <Button
                href={`/foods/name/${this.state.searchtext}`}
                variant="danger"
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
