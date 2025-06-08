const { selectAllCategories } = require("../models/category.model");

// GET /api/items/categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await selectAllCategories();
    res.status(200).send({ categories });
  } catch (err) {
    next(err);
  }
};
