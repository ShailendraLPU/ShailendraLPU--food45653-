const mongoose = require("mongoose");
const Review = require("./Review");
const foodSchema = mongoose.Schema({
  foodName: {
    type: String,
  },
  foodDesc: {
    type: String,
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
  },
  deliveryTime: {
    type: String,
  },
  restraunt: {
    type: String,
  },
  foodImg: {
    type: String,
  },
  cateagory: {
    type: String,
  },
  foodType: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
