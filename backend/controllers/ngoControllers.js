const express = require("express");

const Food = require("../models/food_db");
const Edu = require("../models/education_db");
const Loc = require("../models/location_db");
const Ngo = require("../models/ngo_db");
const bcrypt = require("bcrypt");

exports.registerfunc = async (req, res) => {
  const saltPassword = await bcrypt.genSalt(12);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);
  const secureconfirm = await bcrypt.hash(
    req.body.confirmPassword,
    saltPassword
  );
  if (securePassword === secureconfirm) {
    req.body.password = securePassword;
    req.body.confirmPassword = secureconfirm;


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
            error: "Internal server error"
          });
        }
        return res.status(200).json({
          data: ngo,
          success: true,
          error: ""
        });
      })
  }
  else {
    return res.json({
      data: {},
      success: false,
      error: "Passwords are not same",
    })
  }

  Ngo.create(req.body, (err, ngo) => {
    if (err) {
      res.statusCode = 500;
      // res.setHeader("Content-Type", "application/json");
      return res.status(500).json({
        data: {},
        success: false,
        error: "Interal server error",
      });
    }
    return res.status(200).json({
      data: ngo,
      success: true,
      error: "",
    });
  });
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
        error: "",
      });
    } else {
      return res.json({
        success: false,
        error: "Invalid Login Credentials!",
        data: {},
      });
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

exports.createClass = (req, res) => {
  console.log(req.body);
  Edu.create(req.body, function (err, data) {
    if (err) {
      // console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Error in creating class",
      });
    }

    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};

exports.createOutlet = (req, res) => {
  console.log(req.body);
  Food.create(req.body, function (err, data) {
    if (err) {
      // console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Error in creating outlet",
      });
    }

    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};

exports.searchClass = (req, res) => {
  console.log(req.query);

  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((eF) => delete queryObj[eF]);
  Edu.find(queryObj).exec((err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Internal Server Error",
      });
    }

    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};

exports.searchLocations = (req, res) => {
  // console.log(req.query);
  Loc.find().exec((err, data) => {
    if (err) {
      // console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Internal Server Error",
      });
    }
    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};

exports.searchOutlet = (req, res) => {
  console.log(req.query);

  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((eF) => delete queryObj[eF]);
  Food.find(queryObj).exec((err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        data: {},
        success: false,
        error: "Internal Server Error",
      });
    }

    return res.json({
      data: data,
      success: true,
      error: "",
    });
  });
};
