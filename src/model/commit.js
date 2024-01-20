import mongoose from "mongoose";

const commitSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true,
    // maxlength: 32,
  },
  boardId: {
    type: String,
    trim: true,
    required: true,
    // maxlength: 32,
  },
  branch: {
    type: String,
    trim: true,
    required: true,
    // maxlength: 32,
  },
  previousCommitId: {
    type: String,
    trim: true,
    required: true,
    // maxlength: 32,
  },
  message: {
    type: String,
    required: true,
    // maxlength: 32,
  },
  date: {
    type: Date,
    value: Date.now(),
    trim: true,
    required: true,
    // maxlength: 32,
  },
  action: {
    type: String,
    required: true,
    // maxlength: 32,
  },
  content: {
    type: Array,
    required: true,
    // maxlength: 32,
  },
});

module.exports =
  mongoose.models.Commit || mongoose.model("Commit", commitSchema);
