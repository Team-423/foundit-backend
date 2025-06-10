const connectDB = require("../../db/connection");
const { Brand } = require("../models/brand.model");

const getBrandId = async (brand_name) => {
  await connectDB();
  const brandDoc = await Brand.findOne({ brand_name });
  return brandDoc?._id;
};

module.exports = getBrandId;
