const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
  },
});

const Category = model("Category", categorySchema);

// GET /api/items/categories
const selectAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { Category, selectAllCategories };
