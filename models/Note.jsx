import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  note: {
    type: String,
  },
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
