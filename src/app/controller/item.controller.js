const { selectItemById } = require("../models/items");

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
