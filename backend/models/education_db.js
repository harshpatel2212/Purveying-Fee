const mongoose = require("mongoose");

const EduSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  tagField: [
    {
      type: String,
    },
  ],
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
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

const Edu = mongoose.model("Edu", EduSchema);

// const e = new Edu({
//   description: "Intro to Data Visualization",
//   tagField: "Data Science",
//   startDate: "2022-09-25",
//   endDate: "2022-10-25",
//   day: "Monday",
//   time: "14:00 - 16:00",
//   address: "xyz/1, Abc Road",
//   city: "Gandhinagar",
//   state: "Gujarat",
//   contactNo: 9999999990,
// });

// e.save((error, edu) => {
//   if (error) console.log(error);
//   console.log(edu);
// });

module.exports = Edu;
