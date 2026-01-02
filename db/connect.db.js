import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionStatement = await mongoose.connect(`${process.env.MONGODB_URI}}`)
        console.log(`MongoDB connected To : ${connectionStatement.connection.host}`)
    } catch (error) {
        console.log(`DB connection error: ${error}`)
        process.exit(1)
    }
}

export default connectDB