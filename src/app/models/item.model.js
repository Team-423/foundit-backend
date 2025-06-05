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
    type: SchemaTypes.ObjectId,
    ref: "Location",
    required: true,
  },
  colour: {
    type: String,
  },
  size: {
    type: String,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  material: {
    type: String,
  },
  img_url: {
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

// GET /api/items
const selectItems = async () => {
  try {
    await connectDB();
    const items = await Item.find()
      .populate("author", "username")
      .populate("brand", "brand_name")
      .populate("location", "location_name");
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
    const itemById = await Item.findById(item_id)
      .populate("author", "username")
      .populate("brand", "brand_name")
      .populate("location", "location_name");
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

// POST /api/items
const insertItem = async (postedItem) => {
  const { item_name, author, description, category, location, found, lost } =
    postedItem;

  if (
    !item_name ||
    !author ||
    !description ||
    !category ||
    !location ||
    typeof found !== "boolean" ||
    typeof lost !== "boolean"
  ) {
    throw {
      status: 400,
      msg: "Missing required fields!",
    };
  }
  try {
    return Item.create(postedItem);
  } catch (err) {
    throw err;
  }
};

// DELETE /api/items/:item_id
const removeItemById = async (item_id) => {
  if (!mongoose.Types.ObjectId.isValid(item_id)) {
    throw {
      status: 400,
      msg: "Bad request: invalid format!",
    };
  }
  try {
    const deleteItem = await Item.findByIdAndDelete(item_id);
    return deleteItem;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  Item,
  selectItems,
  selectItemById,
  insertItem,
  removeItemById,
  selectItemByIdToUpdate,
}; //for Item we cannot use exports., mind the syntax
