const { selectAllLocations } = require("../models/location.model");

exports.getAllLocations = async (req, res, next) => {
  try {
    const locations = await selectAllLocations();
    res.status(200).send({ locations });
  } catch (err) {
    next(err);
  }
};