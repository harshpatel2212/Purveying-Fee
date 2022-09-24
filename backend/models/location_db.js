const mongoose = require("mongoose");
const data = require("./cities_india.json");

const locSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const loc = new mongoose.model("Location", locSchema);

// data.forEach((element) => {
//   const l = new loc({
//     city: element.name_of_city,
//     state: element.state_name,
//   });

//   l.save((error, loc) => {
//     if (error) console.log(error);
//     console.log(loc);
//   });
// });

console.log("Success!");
module.exports = loc;
