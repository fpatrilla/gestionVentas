import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this articles."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },

  stock: {
    type: Number,
  },
  code: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
