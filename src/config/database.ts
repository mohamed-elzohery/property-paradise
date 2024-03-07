import mongoose from "mongoose";

if (!process.env.MONGODB_URI) throw new Error("no mongodb uri provided");

const connectDB = async () => {
  if (mongoose.connections[0].readyState)
    return console.log("Already connected to database.");

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connnected to database successfully");
  } catch (error) {
    console.log("Failed to connect to database.", error);
  }
};

export default connectDB;
