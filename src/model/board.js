import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    id : {
        type: String,
        trim: true,
        required: true,
        // maxlength: 32,
    },
    users : {
        type: Array,
        required: true,
        // maxlength: 32,
    },
    commits : {
        type: Array,
        required: true,
        // maxlength: 32,
    }
});

module.exports = mongoose.models.Board || mongoose.model("Board", boardSchema);