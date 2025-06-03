const endpoints = require("../../../endpoints.json");
const { selectItems } = require("../models/items");

exports.getEndPoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};

exports.getItems = async (req, res, next) => {
  try {
    const items = await selectItems();
    res.status(200).send(items);
  } catch (err) {
    console.error(err);
  }
};
