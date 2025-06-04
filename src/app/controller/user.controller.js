const User = require("../models/user.model.js");

// GET /api/users/:userId
exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};
