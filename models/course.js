const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    reuiqred: true
  },
  zipCode: {
    type: Number,
    min: [1000000, "Zip code too short"],
    max: 9999999
  },
  adress: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    reqired: true
  }
});

module.exports = mongoose.model("Course", courseSchema);