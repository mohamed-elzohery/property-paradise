import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  // mongoose.set("strictQuery", true);

  if (connected) return console.log("Already connected to database.");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = false;
    console.log("connnected to database successfully");
  } catch (error) {
    console.log("Failed to connect to database.");
  }
};

export default connectDB;
