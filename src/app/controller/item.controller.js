const {
  selectItemById,
  selectItems,
  selectItemByIdToUpdate,
  insertItem,
  removeItemById,
  updateItemResolvedById,
} = require("../models/item.model");

// GET /api/items/
exports.getItems = async (req, res, next) => {
  try {
    const items = await selectItems(req.query);
    if (items.length === 0) {
      throw {
        status: 404,
        msg: "No results!"
      }
    }
    res.status(200).send(items);
  } catch (err) {
    next(err)
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
  // rename to patchItemById for consistency in controller?
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

// PATCH /api/items/:item_id/resolved
exports.patchItemResolvedById = async (req, res, next) => {
  const { item_id } = req.params;
  const { resolved } = req.body;

  if (typeof resolved !== "boolean") {
    return res
      .status(400)
      .send({ msg: "Bad request: 'resolved' must be a boolean value!" });
  }

  try {
    const updatedItem = await updateItemResolvedById(item_id, resolved);
    res.status(200).send({ updatedItem });
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

// DELETE /api/items/:item_id
exports.deleteItemById = async (req, res, next) => {
  const { item_id } = req.params;
  try {
    const deleteItem = await removeItemById(item_id);
    if (!deleteItem) {
      return res.status(404).send({ msg: "Item not found!" });
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
