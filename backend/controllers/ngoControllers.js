const Food = require("../models/food_db");
const Edu = require("../models/education_db");
const Loc = require("../models/location_db");
const Ngo = require("../models/ngo_db");

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
  Edu.create(req.body, function (err, data) {
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

// exports.searchClass = (req, res) => {
//   console.log(req.query);

//   // const queryObj = { ...req.query };
//   // const excludeFields = ["page", "sort", "limit", "fields"];
//   // excludeFields.forEach((eF) => delete queryObj[eF]);
//   try {
//     // const edus = Edu.find(queryObj);
//     const edus = Edu.find(req.query);

//     res.status(200).json({
//       data: edus,
//       success: true,
//       error: "",
//     });
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({
//       data: "",
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// };

exports.searchOutlet = (req, res) => {
  console.log(req.body);
};
