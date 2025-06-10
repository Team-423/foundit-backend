const connectDB = require("../../db/connection");
const { Location } = require("../models/location.model");

const getLocationId = async (location_name) => {
  await connectDB();
  const locationDoc = await Location.findOne({ location_name });
  return locationDoc?._id;
};

module.exports = getLocationId;
