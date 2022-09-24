const express = require("express");
const { func } = require("../controllers/temp");
const { registerfunc,loginfunc } = require("../controllers/temp");
const router = express.Router();

router.get("/", func);
router.post("/signup",registerfunc);
router.post("/login",loginfunc);
module.exports = router;
