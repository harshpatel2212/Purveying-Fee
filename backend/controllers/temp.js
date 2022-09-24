const mongoose = require('mongoose');
const Ngo = require('../models/ngo_db');
const bcrypt = require('bcrypt');
exports.func = async (req, res) => {
  console.log("func called");
  res.send("func called");
};
exports.registerfunc = async (req, res) => {
  const saltPassword = await bcrypt.genSalt(12);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);
  const secureconfirm = await bcrypt.hash(req.body.confirmPassword, saltPassword);
    if (securePassword === secureconfirm) {

      req.body.password = securePassword;
      req.body.confirmPassword = secureconfirm;

      Ngo.create(req.body,
        (err, ngo) => {
          if (err) {
            res.statusCode = 500;
            // res.setHeader("Content-Type", "application/json");
            return res.status(500).json({
              data: {},
              success: false,
              error: "Interal server error"
            });
          }
          return res.status(200).json({
            data: ngo,
            success: true,
            error:""
          });
        })
    }
    else{
      return res.json({
        data: {},
        success: false,
        error: "Passwords are not same",
      })
    }
  }

exports.loginfunc = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user_email = await Ngo.findOne({ email: email });
    const isMatch = bcrypt.compare(password, user_email.password);
    if (isMatch) {
      return res.json({
        success: true,
        data: user_email,
        error:"",
      })
    }
    else {
      return res.json({
        success: false,
        error: "Invalid Login Credentials!",
        data: {},
      })
    }

  } catch (e) {
    res.status(404).send(e);
  }
}