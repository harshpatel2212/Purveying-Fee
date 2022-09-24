const express = require("express");
const {
  createClass,
  createOutlet,
  searchClass,
  searchOutlet,
} = require("../controllers/ngoControllers");
const router = express.Router();

router.post("/create_class", createClass);
router.post("/create_outlet", createOutlet);
// router.get("/search_classes", searchClass);
// router.get("/search_outlet", searchOutlet);
module.exports = router;
