import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Vercel par process.exit(1) nahi lagana chahiye kyunki yeh serverless function ko crash kar deta hai
    }
};

export default connectDB;