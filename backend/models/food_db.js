const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  nameDish: {
    type: String,
    required: true,
  },
  dishPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
});

const Food = new mongoose.model("register", FoodSchema);
module.exports = Food;
