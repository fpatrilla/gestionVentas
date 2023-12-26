import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
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

    maxlength: [40, "City specified cannot be more than 40 characters"],
  },
  number: {
    type: Number,
  },
  dni: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },

  coment: {
    type: Array,
  },
});

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
