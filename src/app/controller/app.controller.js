const endpoints = require("../../../endpoints.json");
const User = require("../models/users.js")

exports.getEndPoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};

exports.getUserById = (req, res, next) => {
  const { userId } = req.params
  User.findById(userId)
  .then((user) => {
    if (!user) {
      return res.status(404).send({msg: "User not found"})
    } 
    res.status(200).send({user})
  })
  .catch(next)
}