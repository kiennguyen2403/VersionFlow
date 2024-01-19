import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true,
        required: true,
        // maxlength: 32,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        // maxlength: 32,
    },
});

module.exports = mongoose.models.Branch || mongoose.model("Branch", branchSchema);