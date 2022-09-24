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
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    timestamps: true,
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

const Edu = new mongoose.model("register", EduSchema);
module.exports = Edu;
