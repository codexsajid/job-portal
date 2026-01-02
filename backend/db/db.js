import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGO_URI}`);
        if (!res) {
            console.log("Database failed to connect");
        }
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // optional: stop the app if DB fails
    }
};