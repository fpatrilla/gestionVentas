import mongoose from "mongoose";

const SalesTarjetSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  lastname: {
    type: String,
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  codigoAutorizacion: {
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
  cuotas: {
    type: Number,
    enum: ["1", "2", "3"],
  },
  formaPago: {
    type: String,
    enum: ["Debito", "Credito", "MercadoPago", "Transferencia"],
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
  cuote: {
    type: Number,
  },
  code: {
    type: Number,
  },
  type: {
    type: String,
    default: "Tarjeta",
  },
});

export default mongoose.models.SalesTarjet ||
  mongoose.model("SalesTarjet", SalesTarjetSchema);
