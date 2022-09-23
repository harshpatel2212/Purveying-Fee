const express = require("express");
const { func } = require("../controllers/temp");
const router = express.Router();

router.get("/", func);

module.exports = router;
