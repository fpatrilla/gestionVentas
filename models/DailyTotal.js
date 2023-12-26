// models/DailyTotal.js

const mongoose = require("mongoose");

const dailyTotalSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  total: {
    type: Number,
    type: Number,
    default: 0,
  },
});

const DailyTotal = mongoose.model("DailyTotal", dailyTotalSchema);

module.exports = DailyTotal;
