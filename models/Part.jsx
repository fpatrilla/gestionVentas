import mongoose from "mongoose";

const PartSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  observation: {
    type: String,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Part ||
  mongoose.model("Part", PartSchema);
