const mongoose = require("mongoose");

const coupanSchema = mongoose.Schema({
  coupanCode: {
    type: String,
  },
  discountAmount: {
    type: Number,
  },
});

const Coupan = mongoose.model("Coupan", coupanSchema);

module.exports = Coupan;
