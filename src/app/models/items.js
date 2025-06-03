const mongoose = require("mongoose");
const connectDB = require("../../db/connection");
const { Schema, SchemaTypes, model } = mongoose;

const itemSchema = new Schema({
  item_name: {
    type: String,
    required: true,
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  location: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
  },
  size: {
    type: String,
  },
  brand: {
    type: String,
  },
  material: {
    type: String,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  found: {
    type: Boolean,
    required: true,
  },
  lost: {
    type: Boolean,
    required: true,
  },
});

const Item = model("Item", itemSchema);

const selectItems = async () => {
  try {
    await connectDB();
    const items = await Item.find().populate("author", "username");
    return items;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { Item, selectItems }; //for Item we cannot use exports., mind the syntax
