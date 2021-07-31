import { React, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import {
  FoodList,
  Login,
  Registration,
  Home,
  Navbaar,
  Cart,
  NewDish,
  Footer,
  Edit,
  Page404,
  AddCoupan,
  Profile,
  Orders,
  EditProfile,
  Payment,
} from "./Index";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: false,
      currentUser: {},
      cart: 0,
      orders: 0,
    };
  }

  handleLogin = (data) => {
    this.setState({
      currentUser: data,
      loggedInStatus: true,
    });
  };
  handleLogout = () => {
    this.setState({
      currentUser: {},
      loggedInStatus: false,
    });
  };

  handleCartItemCountIncrease = () => {
    this.setState({
      cart: this.state.cart + 1,
    });
  };

  handleCartItemCountDecrease = () => {
    this.setState({
      cart: this.state.cart - 1,
    });
  };

  async componentDidMount() {
    let userData = window.localStorage.getItem("currentUser");
    userData = JSON.parse(userData);
    if (userData) {
      await axios.get(`/setSession/${userData._id}`).then((res) => {
        if (res.data.sessionCreated) {
          this.setState({
            currentUser: userData,
            loggedInStatus: userData.isAuthenticated,
            cart: res.data.cart,
            orders: res.data.orders,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbaar
            loggedInStatus={this.state.loggedInStatus}
            handleLogout={this.handleLogout}
            cartCount={this.state.cart}
            currentUser={this.state.currentUser}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              exact
              path="/registration"
              render={(props) => (
                <Registration {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path="/userProfile"
              render={(props) => (
                <Profile
                  {...props}
                  orders={this.state.orders}
                  currentUser={this.state.currentUser}
                  handleLogin={this.handleLogin}
                />
              )}
            />
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/foods"
                render={(props) => (
                  <FoodList
                    {...props}
                    isAdmin={this.state.currentUser.isAdmin}
                    currentUser={this.state.currentUser}
                    handleCartItemCountIncrease={
                      this.handleCartItemCountIncrease
                    }
                    handleCartItemCountDecrease={
                      this.handleCartItemCountDecrease
                    }
                  />
                )}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/addDish"
                render={(props) => <NewDish {...props} />}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/paymentPage"
                render={(props) => <Payment {...props} />}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/editProfile"
                render={(props) => (
                  <EditProfile
                    currentUser={this.state.currentUser}
                    handleLogin={this.handleLogin}
                    {...props}
                  />
                )}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/foods/:cateagory/:name"
                render={(props) => (
                  <FoodList
                    {...props}
                    isAdmin={this.state.currentUser.isAdmin}
                    currentUser={this.state.currentUser}
                    handleCartItemCountIncrease={
                      this.handleCartItemCountIncrease
                    }
                    handleCartItemCountDecrease={
                      this.handleCartItemCountDecrease
                    }
                  />
                )}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/foods/name/:name"
                render={(props) => (
                  <FoodList
                    {...props}
                    isAdmin={this.state.currentUser.isAdmin}
                    currentUser={this.state.currentUser}
                    handleCartItemCountIncrease={
                      this.handleCartItemCountIncrease
                    }
                    handleCartItemCountDecrease={
                      this.handleCartItemCountDecrease
                    }
                  />
                )}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/editFood/:foodId"
                render={(props) => <Edit {...props} />}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/foods/foodtype/:name"
                render={(props) => (
                  <FoodList
                    {...props}
                    isAdmin={this.state.currentUser.isAdmin}
                    handleCartItemCountIncrease={
                      this.handleCartItemCountIncrease
                    }
                    handleCartItemCountDecrease={
                      this.handleCartItemCountDecrease
                    }
                  />
                )}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/addCoupan"
                render={(props) => <AddCoupan />}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/cart"
                render={(props) => (
                  <Cart
                    {...props}
                    handleCartItemCountIncrase={
                      this.handleCartItemCountIncrease
                    }
                    handleCartItemCountDecrease={
                      this.handleCartItemCountDecrease
                    }
                    currentUser={this.state.currentUser}
                  />
                )}
              />
            )}
            {this.state.loggedInStatus && (
              <Route
                exact
                path="/cart/add"
                render={(props) => <Cart {...props} />}
              />
            )}

            {this.state.loggedInStatus && (
              <Route
                exact
                path="/orders"
                render={(props) => (
                  <Orders {...props} currentUser={this.state.currentUser} />
                )}
              />
            )}
            {this.state.loggedInStatus && (
              <Route exact path="/page404" component={Page404} />
            )}
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
