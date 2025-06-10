const connectDB = require("../../db/connection");
const { Colour } = require("../models/colour.model");

const getColourId = async (colour) => {
  await connectDB(); 
  const colourDoc = await Colour.findOne({ colour });
  return colourDoc?._id;
};

module.exports = getColourId;
