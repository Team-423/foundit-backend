const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const locationSchema = new Schema({
  location_name: {
    type: String,
    required: true,
  },
});

const Location = model("Location", locationSchema);

// GET /api/items/locations
const selectAllLocations = async () => {
  try {
    const locations = await Location.find();
    return locations;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  Location,
  selectAllLocations,
};
