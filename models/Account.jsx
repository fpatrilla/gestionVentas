import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gmail: {
    type: String,
  },
  gmailpass: {
    type: String,
  },
  facebook: {
    type: String,
  },
  facebookpass: {
    type: String,
  },
  icloud: {
    type: String,
  },
  icloudpass: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
