const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      address: req.body.address,
    });
    await User.register(user, req.body.password);
    res.json({ userRegistered: true });
  } catch (e) {
    res.json({ userRegistered: false, msg: e });
  }
});

router.get("/setSession/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    req.session.currentUser = true;
    res.json({
      sessionCreated: true,
      cart: user.cart.length,
      orders: user.orders.length,
    });
  } else {
    res.json({ sessionCreated: false });
  }
});

router.post("/login", async function (req, res, next) {
  await passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // console.log(info);
      return res.json({ isAuthenticated: false, msg: info });
    }
    const { username, email, contactNumber, _id, isAdmin, address } = user;
    req.session.currentUser = true;
    return res.json({
      isAuthenticated: true,
      user: { username, email, contactNumber, _id, isAdmin, address },
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.session.currentUser = false;
  req.logout();
  res.send(req.user);
});

module.exports = router;
