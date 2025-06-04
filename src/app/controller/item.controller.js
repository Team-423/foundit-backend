const {
  selectItemById,
  selectItems,
  insertItem,
} = require("../models/item.model");

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

// POST /api/items
exports.postItem = async (req, res, next) => {
  const postedItem = req.body;
  
  try {
    const newItem = await insertItem(postedItem);
    res.status(201).send({ newItem });
  } catch (err) {
    next(err);
  }
};
