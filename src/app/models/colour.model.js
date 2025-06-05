const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const colourSchema = new Schema({
  colour: { type: String, required: true}
});

const Colour = model("Colour", colourSchema);

module.exports = { Colour };