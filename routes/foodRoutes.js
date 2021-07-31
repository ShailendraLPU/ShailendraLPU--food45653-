const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const User = require("../models/user");
const Food = require("../models/food");
const Review = require("../models/Review");
const { isLoggedIn } = require("../middleware/islogged");
const uploads = require("../middleware/multer");
require("../middleware/cloudinary");

// get data for edit the particular food
router.get("/editFood/:foodId", isLoggedIn, async (req, res) => {
  try {
    const result = await Food.findById(req.params.foodId).limit(6);
    res.json({ result });
  } catch {
    res.json({ result: failed });
  }
});

// adding the food to orders in particular user
router.post("/foods/orderNow/:userId/:foodId", isLoggedIn, async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.findById(req.params.userId);
    const product = await Food.findById(req.params.foodId);
    user.orders.push(product);
    await user.save();
    res.json({ orderd: true });
  } catch {
    res.json({ orderd: false });
  }
});

// after editing making changes in database
router.post("/editFood/:foodId", isLoggedIn, async (req, res) => {
  try {
    const result = await Food.findByIdAndUpdate(req.params.foodId, req.body);
    res.json({ result });
  } catch {
    res.json({ result: failed });
  }
});

// getting a food by foodname
router.get("/foods/name/:foodname", isLoggedIn, async (req, res) => {
  try {
    const food = await Food.find({ foodName: req.params.foodname }).limit(6);
    res.send({ status: true, food: food });
  } catch (e) {
    res.json({ status: false });
  }
});

//getting a food by cateagory
router.get("/foods/cateagory/:name", isLoggedIn, async (req, res) => {
  try {
    if (req.params.name !== "all") {
      const food = await Food.find({ cateagory: req.params.name }).limit(6);
      res.json({ status: true, food: food });
    }
    const food = await Food.find({}).limit(6);
    res.json({ status: true, food: food });
  } catch (e) {
    (err) => {
      res.json({ status: false });
    };
  }
});

// getting a food by foodtype
router.get("/foods/foodtype/:name", isLoggedIn, async (req, res) => {
  try {
    if (req.params.name !== "all") {
      const food = await Food.find({ foodType: req.params.name }).limit(6);
      res.json({ status: true, food: food });
    }
    const food = await Food.find({}).limit(6);
    res.json({ status: true, food: food });
  } catch (e) {
    (err) => {
      res.json({ status: false });
    };
  }
});

// adding a new food to the database
router.post(
  "/addFood",
  isLoggedIn,
  uploads.single("foodImg"),
  async (req, res) => {
    try {
      console.log(req.body.foodImg);
      const result = await cloudinary.v2.uploader.upload(req.body.foodImg);

      await Food.create({
        foodImg: result.seacure_url,
        ...req.body,
      });
      res.json({ created: true });
    } catch (e) {
      res.json({ food: req.body, error: e });
    }
  }
);

// getting the foods which are in users cart
router.get("/user/:userid/cart", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).populate("cart");
    res.json({ isCart: true, cartProduct: user.cart });
  } catch (e) {
    res.json({ isCart: false });
  }
});

// getting the foods for which users have placed the order
router.get("/user/:userid/orders", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).populate("orders");
    res.json({ isOrder: true, orderProduct: user.orders });
  } catch (e) {
    res.json({ isCart: false });
  }
});

//adding a food to the users cart
router.get("/user/:userid/:id/add", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    const product = await Food.findById(req.params.id);
    user.cart.push(product);
    await user.save();
    res.json({ prodcutAdded: true });
  } catch (e) {
    res.json({ prodcutAdded: false });
  }
});

// getting the cart items
router.get("/user/:userId/getCart", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({ isCart: true, cart: user.cart });
  } catch (e) {
    res.json({ isCart: false });
  }
});

// removing the items from cart
router.delete("/user/:userid/:id/remove", isLoggedIn, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userid, {
      $pull: { cart: req.params.id },
    });
    const user = await User.findById(req.params.userid).populate("cart");
    res.json({ prodcutRemove: true, user: user.cart });
  } catch (e) {
    res.json({ prodcutRemove: false });
  }
});

// removing the items from the db
router.delete("/food/:foodId", isLoggedIn, async (req, res) => {
  try {
    const result = await Food.findByIdAndDelete(req.params.foodId);
    res.json({ result });
  } catch {
    res.json({ result: failed });
  }
});

// Review Routes
router.get("/food/review/:foodId", isLoggedIn, async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId).populate("reviews");
    res.json({ status: true, reviews: food.reviews });
  } catch (e) {
    res.json({ status: false });
  }
});

// adding the review for the food
router.post("/food/review/:foodId", isLoggedIn, async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    console.log(req.body);
    const review = new Review({ ...req.body });
    food.reviews.push(review);
    await review.save();
    await food.save();
    const newfood = await Food.findById(req.params.foodId).populate("reviews");
    res.json({ comment: true, reviews: newfood.reviews });
  } catch (e) {
    res.json({ comment: false });
  }
});

// Edit Profile Routes
router.get("/user/editProfile/:userId", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({ status: true, user: user });
  } catch (e) {
    res.json({ status: false });
  }
});

// saving the changes in profile
router.post("/user/editProfile/:userId", isLoggedIn, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, req.body);
    const user = await User.findById(req.params.userId);
    res.json({ status: true, user: user });
  } catch (e) {
    res.json({ status: false });
  }
});

module.exports = router;
