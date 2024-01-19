import mongoose from "mongoose";

export const mongoConnection = async () => {
    const { MONGO_URL } = process.env ?? "";
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    });

    console.log("MongoDB connected");
};
