const {
  selectItemById,
  selectItems,
  selectItemByIdToUpdate,
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

// PATCH /api/items/:item_id
exports.updateItemById = async (req, res, next) => {
  const { item_id } = req.params;
  const {
    item_name,
    category,
    description,
    location,
    colour,
    size,
    brand,
    material,
  } = req.body;

  try {
    const updatedItem = await selectItemByIdToUpdate(
      item_id,
      item_name,
      category,
      description,
      location,
      colour,
      size,
      brand,
      material
    );
    if (!updatedItem) {
      return res.status(404).send({ msg: "Item not found!" });
    }
    res.status(200).send({ updatedItem });
  } catch (err) {
    next(err);
  }
};
