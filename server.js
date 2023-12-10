const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Himan:1234@sit314.f2imupu.mongodb.net/SIT725_Week5",
    {}
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const messageRoutes = require("./controller/routes");
app.use("/messages", messageRoutes);

app.listen(port, () => {
  console.log("App listening to: " + port);
});
