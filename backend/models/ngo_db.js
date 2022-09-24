const mongoose = require("mongoose");
const NgoSchema = new mongoose.Schema({
  ngoName: {
    type: String,
    required: true,
  },
  headName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  websiteLink: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});
const Admin = new mongoose.model("register", NgoSchema);
module.exports = Admin;


// const user = new Admin({
//   ngoName:"xyz ngo",
//   headName:"Isha",
//   email:"hello@abc.com",
//   contact:"3456765435",
//   websiteLink:"http:://hello",
//   password:"abc",
//   confirmPassword:"abc",
//   address:"lorem epsum...",
//   city:"gandhinagar",
//   state:"gujarat"
// });
// user.save((error, user) => {
//   if(error)
//   console.log(error);
//   console.log(user)
// });

// console.log(user);