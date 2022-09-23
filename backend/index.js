const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const ngoRoutes = require("./routes/ngoRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", ngoRoutes);

app.listen(port, () => {
  console.log("Server is running at port", port);
});
