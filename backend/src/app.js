const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use("/public", express.static("public"));
app.use("/user", require("./routes/user"));
app.use("/product", require("./routes/product"));
app.use("/cart", require("./routes/cart"));

app.get("/", (req, res) => {
  res.send("The API is working!");
});

app.listen(3006, () => {
  console.log(`App listening on port 3006!`);
});
