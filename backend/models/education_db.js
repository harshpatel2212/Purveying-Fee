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
//   description: "Intro to ReactJS",
//   tagField: "Web Development",
//   startDate: "2022-09-26",
//   endDate: "2022-10-25",
//   day: "Tuesday",
//   time: "14:00 - 16:00",
//   address: "xyz/1, Abc Road",
//   city: "Ahmedabad",
//   state: "Gujarat",
//   contactNo: 9999999991,
// });

// e.save((error, edu) => {
//   if (error) console.log(error);
//   console.log(edu);
// });

module.exports = Edu;
