const mongoose = require("mongoose");
const passportLocal = require("passport-local-mongoose");
const Food = require("./food");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  cashBack: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      unique: true,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      unique: true,
    },
  ],
});

userSchema.plugin(passportLocal);

const User = mongoose.model("User", userSchema);

module.exports = User;
