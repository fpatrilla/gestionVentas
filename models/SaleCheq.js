import mongoose from "mongoose";

const SalesCheqSchema = new mongoose.Schema({
  nombre: {
    type: String,
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  dador: {
    type: String,
    maxlength: [60, "Authorization code cannot be more than 60 characters"],
  },
  product: {
    type: String,
    required: [true, "Please specify the product."],
    maxlength: [40, "Product name cannot be more than 40 characters"],
  },
  price: {
    type: Number,
  },
  bank: {
    type: String,
    required: [true, "Please specify the bank."],
    maxlength: [40, "Bank name cannot be more than 40 characters"],
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
  NumCheq: {
    type: Number,
  },
  FechDep: {
    type: String,
  },
  FechEntrega: {
    type: String,
  },
  tenedor: {
    type: String,
  },
  observation: {
    type: String,
  },
  estado: {
    type: String,
    enum: ["Pendiente", "Depositado", "Endosado"],
    default: "Pendiente",
  },
  type: {
    type: String,
    default: "Cheque",
  },
});

export default mongoose.models.SalesCheq ||
  mongoose.model("SalesCheq", SalesCheqSchema);
