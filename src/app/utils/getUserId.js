const connectDB = require("../../db/connection");
const { User } = require("../models/user.model");

const getUserId = async (username) => {
  await connectDB();
  const userDoc = await User.findOne({ username });
  return userDoc?._id;
};

module.exports = getUserId;
