import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: [true, "Please provide a name for this client."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  city: {
    type: String,
    required: [true, "Please specify the city of your client."],
    maxlength: [40, "City specified cannot be more than 40 characters"],
  },
  cuit: {
    type: String,
  },
  telephone1: {
    type: String,
  },
  telephone2: {
    type: String,
  },
  celphone1: {
    type: Number,
  },
  celphone2: {
    type: Number,
  },
  owner: {
    type: String,
  },
  email: {
    type: String,
  },
  web: {
    type: String,
  },
  address: {
    type: String,
  },
  companyType: {
    type: String,
  },
});

export default mongoose.models.Company ||
  mongoose.model("Company", CompanySchema);
