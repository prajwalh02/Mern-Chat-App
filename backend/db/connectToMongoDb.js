import mongoose from "mongoose";

const connectToMongoDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Connected to MongoDB ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error", error.message);
    }
}

export default connectToMongoDb;