const connectDB = require("../../db/connection");
const { Category } = require("../models/category.model");

const getCategoryId = async (category_name) => {
  await connectDB();
  const categoryDoc = await Category.findOne({ category_name });
  return categoryDoc?._id;
};

module.exports = getCategoryId;
