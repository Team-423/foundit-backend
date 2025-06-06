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

// GET /api/users/:userId

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

// Patch /api/users/:userId

const selectUserByIdToUpdate = async (
  userId,
  username,
  email,
  img_url,
  points
) => {
  const query = { _id: userId };
  const update = {
    $set: {
      username,
      email,
      img_url,
      points,
    },
  };
  const options = { new: true };

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw {
      status: 400,
      msg: "Invalid user ID",
    };
  }
  try {
    const updatedUser = await User.findOneAndUpdate(query, update, options);
    if (!updatedUser) {
      throw {
        status: 404,
        msg: "User not found!",
      };
    }
    return updatedUser;
  } catch (err) {
    throw err;
  }
};

module.exports = { User, selectUserById, selectUserByIdToUpdate };
