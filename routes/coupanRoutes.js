const express = require("express");
const router = express.Router();
const Coupan = require("../models/coupan");
const { isLoggedIn } = require("../middleware/islogged");

router.post("/foods/applyFoodCoupan", isLoggedIn, async (req, res) => {
  try {
    const coupan = await Coupan.find({
      coupanCode: req.body.foodCoupan,
    });
    res.send({ status: true, value: coupan[0].discountAmount });
  } catch (e) {
    res.json({ status: false });
  }
});

router.post("/foods/addFoodCoupan", isLoggedIn, async (req, res) => {
  try {
    const coupan = await Coupan.create(req.body);
    res.send({ status: true });
  } catch (e) {
    res.json({ status: false });
  }
});

module.exports = router;
