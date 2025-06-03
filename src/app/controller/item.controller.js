const Item = require("../models/items");
const mongoose = require("mongoose");

exports.getItemById = async (req, res, next) => {
  const { item_id } = req.params;

  try {
    const itemById = await Item.findById(item_id);

    if (!itemById) {
      return res.status(404).send({ msg: "Item not found" });
    }
    res.status(200).send({ itemById });
  } catch (error) {
    return res.status(400).send({ msg: "Bad request: invalid format" });
    next(error);
  }
};
