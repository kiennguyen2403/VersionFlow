import mongoose from "mongoose";

//create a schema of history with id, date action, message, author, state, and params
const historySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      required: true,
      // maxlength: 32,
    },
    date: {
      type: String,
      trim: true,
      required: true,
      // maxlength: 32,
    },
    action: {
      type: String,
      required: true,
      // maxlength: 32,
    },
    message: {
      type: String,
      required: true,
      // maxlength: 32,
    },
});

export default mongoose.model("History", historySchema);