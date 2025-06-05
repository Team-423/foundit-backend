const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `../../.env.${ENV}`) });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI not set in .env file");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB connected [${ENV}]`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    if (ENV !== "test") {
      process.exit(1);
    } else {
      throw err;
    }
  }
};

module.exports = connectDB;