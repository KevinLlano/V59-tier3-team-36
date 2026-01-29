import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Database connected successfully");
    }
    catch (err) { 
        console.error("Error connecting to MongoDB:", err); 
        process.exit(1);
    }
};