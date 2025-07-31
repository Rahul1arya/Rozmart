const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String, // for simplicity only
});

module.exports = mongoose.model("User", UserSchema);
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
