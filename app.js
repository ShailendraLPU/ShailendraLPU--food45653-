// if (process.env.NODE_ENV !== "production") {
require("dotenv").config();
// }

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const passportLocalStrategy = require("passport-local");
const path = require("path");
const seed = require("./seed");
const User = require("./models/user");
const authroute = require("./routes/auth");
const foodRoutes = require("./routes/foodRoutes");
const coupanRoutes = require("./routes/coupanRoutes");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => {
    console.log("DB connected Succesfully");
  })
  .catch((e) => {
    console.log(e.message);
  });
// seed();

const sessionConfig = {
  secret: "weneedsomebettersecret",
  resave: true,
  saveUninitialized: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(authroute);
app.use(foodRoutes);
app.use(coupanRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(process.cwd(), "fronted", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "fronted", "build", "index.html"));
  });
}
app.listen(process.env.PORT || 8080, () => {
  console.log("Server Listening");
});
