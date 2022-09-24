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
//   nameDish: "Makke di Roti, Sarso da Saak",
//   dishPrice: 50,
//   description: "Roti, Sabji, Chaas",
//   address: "xyz/1, Abc Road",
//   city: "Ahmedabad",
//   state: "Haryana",
//   contactNo: 9999999992,
// });
// f.save((error, food) => {
//   if (error) console.log(error);
//   console.log(food);
// });

module.exports = Food;
