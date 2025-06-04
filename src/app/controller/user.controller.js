const { selectUserById } = require("../models/user.model.js");

// GET /api/users/:userId
exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await selectUserById(userId)
    if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
         res.status(200).send({ user });
    }
    catch(err) {
      next(err)
    }
  }
  
