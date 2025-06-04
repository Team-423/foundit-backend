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

  const itemInfo = Object.values(req.body);
  itemInfo.forEach((value) => {
    if (typeof value !== "string") {
      return res.status(400).send({ msg: "Bad request: invalid format!" });
    }
  });

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
    res.status(200).send({ updatedItem });
  } catch (err) {
    next(err);
  }
};
