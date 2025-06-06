const { selectAllBrands } = require("../models/brand.model");

exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await selectAllBrands();
    res.status(200).send({ brands });
  } catch (err) {
    next(err);
  }
};
