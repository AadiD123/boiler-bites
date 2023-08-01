const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    nameOfFood: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    diningCourt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
