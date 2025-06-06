const { Colour, selectAllColours } = require("../models/colour.model.js");

exports.getColours = async (req, res, next) => {
  try {
    const colours = await selectAllColours();

    res.status(200).json({ colours });
  } catch (err) {
    next(err);
  }
};
