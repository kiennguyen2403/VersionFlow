import mongoose from "mongoose";

export const mongoConnection = async () => {
    const { MONGO_URL } = process.env ?? "";
    if (!MONGO_URL) {
        throw new Error("MONGO_URL is not defined");
    }
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.log(e);
        throw new Error("Mongo connection error");
    }
};
