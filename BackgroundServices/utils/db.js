//BackgroundServices/utils/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// DB
const DB = process.env.DB;
const dbConnection = async () => {
  try {
    await mongoose.connect(DB).then(() => {
      console.log(`Database connection is successful.`);
    });
  } catch (error) {
    console.log(error.message);
    setTimeout(dbConnection, 5000);
  }
};
export default dbConnection;