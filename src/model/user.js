import mongoose from "mongoose";

//create a schema of  user with name and email and password and auto generate id
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      // maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      // maxlength: 32,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // maxlength: 32,
    },
    // role: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User ||mongoose.model("User", userSchema);