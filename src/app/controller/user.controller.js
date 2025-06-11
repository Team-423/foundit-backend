const {
  selectUserById,
  selectUserByIdToUpdate,
  selectItemsByUserId,
  incrementUserPoints
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

// GET /api/users/:userId/items

exports.getItemsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const items = await selectItemsByUserId(userId);
    res.status(200).send({ items });
  } catch (err) {
    next(err);
  }
};

//PATCH /api/users/:userId/points
exports.incrementPoints = async (req, res, next) => {
  const { userId } = req.params;
  const { pointsToAdd } = req.body;

    try {
    if (typeof pointsToAdd !== "number") {
      return res.status(400).send({ msg: "pointsToAdd must be a number" });
    }
    const updatedUser = await incrementUserPoints(userId, pointsToAdd);
    if (!updatedUser) {
      return res.status(404).send({ msg: "User not found" });
    }
    res.status(200).send({ user: updatedUser });
  } catch (err) {
    next(err);
  }
}

