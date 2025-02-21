import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb Connected Successfully!👏👏 ${connect.connection.host}`);
  } catch (error) {
    console.log("error connection MongoDb: ", error.message);
    // process.exit(1);failure
  }
};
