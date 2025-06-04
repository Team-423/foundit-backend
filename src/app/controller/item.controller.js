const { selectItemById, selectItems } = require("../models/item.model");

// GET /api/items/
exports.getItems = async (req, res, next) => {
  try {
    const items = await selectItems();
    res.status(200).send(items);
  } catch (err) {
    console.error(err);
  }
};

// GET /api/items/:item_id
exports.getItemById = async (req, res, next) => {
  const { item_id } = req.params;

  try {
    const itemById = await selectItemById(item_id);
    if (!itemById) {
      return res.status(404).send({ msg: "Item not found!" });
    }

    res.status(200).send({ itemById });
  } catch (err) {
    next(err);
  }
};
