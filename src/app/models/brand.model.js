const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const brandSchema = new Schema({
  brand_name: {
    type: String,
  },
});

const Brand = model("Brand", brandSchema);

// GET /api/items/brands
const selectAllBrands = async () => {
  try {
    const brands = await Brand.find();
    return brands;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  Brand,
  selectAllBrands,
};
