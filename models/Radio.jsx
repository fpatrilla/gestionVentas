import mongoose from "mongoose";

const RadioSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  frecuencias: {
    type: String,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Radio ||
  mongoose.model("Radio", RadioSchema);
