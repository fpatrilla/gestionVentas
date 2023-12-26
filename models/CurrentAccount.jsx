import mongoose from "mongoose";

const CurrentAccountSchema = new mongoose.Schema({
  name: {
    type: String,

    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  lastname: {
    type: String,

    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  product: {
    type: String,
    required: [true, "Please specify the city of your client."],
    maxlength: [40, "City specified cannot be more than 40 characters"],
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  estado: {
    type: String,
    enum: ["Pendiente", "Pagado"],
    default: "Pendiente",
  },
  observation: {
    type: String,
  },
});

export default mongoose.models.CurrentAccount ||
  mongoose.model("CurrentAccount", CurrentAccountSchema);