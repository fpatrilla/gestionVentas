import mongoose from "mongoose";

const TechnicalreportSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  report: {
    type: String,
  },
  price: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Technicalreport ||
  mongoose.model("Technicalreport", TechnicalreportSchema);
