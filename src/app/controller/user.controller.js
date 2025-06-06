const {
  selectUserById,
  selectUserByIdToUpdate,
} = require("../models/user.model.js");

// GET /api/users/:userId
exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await selectUserById(userId);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

// Patch /api/users/:userId

exports.updateUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { username, email, img_url, points } = req.body;

  // const userInfo = Object.values(req.body);
  // userInfo.forEach((value) => {
  //   if (typeof value !== "string" && typeof value !== "number" ) {
  //     throw { status: 400, msg: "Bad request: invalid format!" };
  //   }
  // });

  try {
    const fields = {
      username: "string",
      email: "string",
      img_url: "string",
      points: "number",
    };
    Object.entries(fields).forEach(([field, type]) => {
      if (req.body[field] !== undefined && typeof req.body[field] !== type) {
        throw { status: 400, msg: "Bad request: invalid format!" };
      }
    });

    const updatedUser = await selectUserByIdToUpdate(
      userId,
      username,
      email,
      img_url,
      points
    );

    res.status(200).send({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};
