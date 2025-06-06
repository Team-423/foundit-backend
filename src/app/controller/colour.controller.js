const { Colour } = require("../models/colour.model.js");

exports.getColours = async (req, res, next) => {
  try {
    const colours = await Colour.find().select("colour -_id");
    res.status(200).json({ colours: colours.map(c => c.colour) });
  } catch (err) {
    next(err);
  }
};