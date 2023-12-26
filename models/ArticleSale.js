import mongoose from "mongoose";

const ArticleSalesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this client."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },

  price: {
    type: Number,
  },

  code: {
    type: Number,
  },
});

export default mongoose.models.ArticleSale ||
  mongoose.model("ArticleSale", ArticleSalesSchema);
