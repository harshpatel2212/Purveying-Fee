const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Food = require("./models/food_db");
const Edu = require("./models/education_db");
const Loc = require("./models/location_db");

const ngoRoutes = require("./routes/ngoRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://isha_121:1234@cluster0.tevfsyc.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connect to DB"))
  .catch((error) => console.log(error));

app.use("/api", ngoRoutes);

app.listen(port, () => {
  console.log("Server is running at port", port);
});
