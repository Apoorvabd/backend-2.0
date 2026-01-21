import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    //mongoose .connect ki help pe hm schema ko mongodb se connect krte hai or isko try catch me hi rakhte hai taki error aaye to handle kr ske
    console.log("MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("Connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
