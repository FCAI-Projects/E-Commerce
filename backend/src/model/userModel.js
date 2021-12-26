const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "buyer", "seller"],
    default: "buyer",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
