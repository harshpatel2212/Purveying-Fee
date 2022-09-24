const express = require("express");
const {
  createClass,
  createOutlet,
  searchClass,
  searchOutlet,
  registerfunc,
  loginfunc,
  searchLocations,
} = require("../controllers/ngoControllers");
const router = express.Router();

router.post("/create_class", createClass);
router.post("/create_outlet", createOutlet);
router.get("/get_locations", searchLocations);
router.get("/search_classes", searchClass);
router.get("/search_outlet", searchOutlet);
router.post("/signup", registerfunc);
router.post("/login", loginfunc);
module.exports = router;
