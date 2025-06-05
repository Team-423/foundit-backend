const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
  },
  points: Number,
});

const User = model("User", userSchema);
const selectUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw {
      status: 400,
      msg: "Invalid user ID",
    };
  }
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { User, selectUserById };
