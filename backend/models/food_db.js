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

const Food = new mongoose.model("Food", FoodSchema);
// const f = new Food({
//   nameDish: "Fix Thali",
//   dishPrice: 20,
//   description: "Roti, Sabji, Dal, Rice.",
//   address: "xyz/1, Abc Road",
//   city: "Gandhinagar",
//   state: "Gujarat",
//   contactNo: 9999999990,
// });
// f.save((error, food) => {
//   if (error) console.log(error);
//   console.log(food);
// });

module.exports = Food;
