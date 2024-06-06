const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  money: { type: Number, required: true },
  unique_id: { type: String, required: true }
});

module.exports = mongoose.model("User", schema);