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

// GET /api/items/:item_id
const selectItemById = async (item_id) => {
  if (!mongoose.Types.ObjectId.isValid(item_id)) {
    throw {
      status: 400,
      msg: "Bad request: invalid format!",
    };
  }
  try {
    const itemById = await Item.findById(item_id).populate(
      "author",
      "username"
    );
    if (!itemById) {
      throw {
        status: 404,
        msg: "Item not found!",
      };
    }
    return itemById;
  } catch (err) {
    throw err;
  }
};

// PATCH /api/items/:item_id
const selectItemByIdToUpdate = async (
  item_id,
  item_name,
  category,
  description,
  location,
  colour,
  size,
  brand,
  material
) => {
  const query = { _id: item_id };
  const update = {
    $set: {
      item_name,
      category,
      description,
      location,
      colour,
      size,
      brand,
      material,
    },
  };
  const options = { new: true };

  if (!mongoose.Types.ObjectId.isValid(item_id)) {
    throw {
      status: 400,
      msg: "Bad request: invalid format!",
    };
  }
  try {
    const updatedItem = await Item.findOneAndUpdate(query, update, options);
    if (!updatedItem) {
      throw {
        status: 404,
        msg: "Item not found!",
      };
    }
    return updatedItem;
  } catch (err) {
    throw err;
  }
};

module.exports = { Item, selectItems, selectItemById, selectItemByIdToUpdate }; //for Item we cannot use exports., mind the syntax
