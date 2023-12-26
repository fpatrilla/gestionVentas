import mongoose from "mongoose";

const CurrentAccountClient2Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "Alvaro",
  },
  lastname: {
    type: String,
    default: "Gonzalez",
  },
  product: {
    type: String,
    required: [true, "Please specify the city of your client."],

  },
  price: {
    type: Number,
  },
  otherprice: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  observation: {
    type: String,
  },
});

export default mongoose.models.CurrentAccountClient2 ||
  mongoose.model("CurrentAccountClient2", CurrentAccountClient2Schema);
