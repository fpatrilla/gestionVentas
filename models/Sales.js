import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
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
  morningTotal: {
    type: Number,
    default: 0,
  },
  eveningTotal: {
    type: Number,
    default: 0,
  },
  code: {
    type: Number,
  },
  type: {
    type: String,
    default: "Efectivo",
  },
});

export default mongoose.models.Sales || mongoose.model("Sales", SalesSchema);
