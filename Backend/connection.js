import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
