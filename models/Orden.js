import mongoose from "mongoose";

const OrdenSchema = new mongoose.Schema({
  identifier: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    required: [true, "Please provide a name for this client."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  marca: {
    type: String,

    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  model: {
    type: String,
    required: [true, "Please specify the city of your client."],
    maxlength: [40, "City specified cannot be more than 40 characters"],
  },
  password: {
    type: String,

    maxlength: [40, "City specified cannot be more than 40 characters"],
  },
  serialNumber: {
    type: String,

    maxlength: [40, "City specified cannot be more than 40 characters"],
  },
  issue: {
    type: String,
  },
  price: {
    type: Number,
  },

  comentOrden: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: [
      "Pendiente",
      "Presupuesto",
      "Repuesto",
      "Reparando",
      "Reparado",
      "Entregado",
      "No Reparado",
    ],
    default: "Pendiente",
  },

  name: {
    type: String,
    required: [true, "Please provide a name for this client."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide the client owner's name"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  city: {
    type: String,
    required: [true, "Please specify the city of your client."],
    maxlength: [40, "City specified cannot be more than 40 characters"],
  },
  number: {
    type: Number,
  },
  otherPrice: {
    type: Number,
  },
  comentInt: {
    type: String,
  },
  dni: {
    type: String,
  },
  email: {
    type: String,
  },
  exitAt: {
    type: Date,
    default: null,
  },
  other: {
    type: String,
  },
  portaSim: {
    type: Boolean,
  },
  sim: {
    type: Boolean,
  },
  sd: {
    type: Boolean,
  },
  tpu: {
    type: Boolean,
  },
});

export default mongoose.models.Orden || mongoose.model("Orden", OrdenSchema);
