import mongoose from "mongoose";

const CurrentAccountClient1Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "Gabriel",
  },
  lastname: {
    type: String,
    default: "Alvarez",
  },
  product: {
    type: String,
    required: [true, "Please specify the city of your client."],
    maxlength: [40, "City specified cannot be more than 40 characters"],
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

export default mongoose.models.CurrentAccountClient1 ||
  mongoose.model("CurrentAccountClient1", CurrentAccountClient1Schema);
