const endpoints = require("../../../endpoints.json");
const User = require("../models/users.js")
const { selectItems } = require("../models/items");

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

exports.getItems = async (req, res, next) => {
  try {
    const items = await selectItems();
    res.status(200).send(items);
  } catch (err) {
    console.error(err);
  }
};

