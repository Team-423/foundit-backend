const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const colourSchema = new Schema({
  colour: { type: String },
});

const Colour = model("Colour", colourSchema);

const selectAllColours = async () => {
  try {
    const colours = await Colour.find();
    return colours;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { Colour, selectAllColours };
