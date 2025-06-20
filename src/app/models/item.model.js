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
    type: SchemaTypes.ObjectId,
    ref: "Category",
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
    type: SchemaTypes.ObjectId,
    ref: "Colour",
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
  address: {
    type: String,
  },
  coordinates: {
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
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
  questions: {
    type: [String],
    default: [],
  },
  answers: {
    type: [String],
    default: [],
  },
});

const Item = model("Item", itemSchema);

// GET /api/items?
const selectItems = async (filters = {}) => {
  try {
    await connectDB();
    const orConditions = [];
    const exactMatchFields = ["colour", "brand", "location", "category"];
    const regexFields = ["size", "material"];
    const mainQuery = {
      item_name: { $regex: filters.item_name, $options: "i" },
    };
    if (!filters.item_name || !filters.location || !filters.category) {
      throw {
        status: 400,
        msg: "Missing required fields",
      };
    }

    for (const field of exactMatchFields) {
      if (filters[field]) {
        orConditions.push({ [field]: filters[field] });
      }
    }
    for (const field of regexFields) {
      if (filters[field]) {
        orConditions.push({
          [field]: { $regex: filters[field], $options: "i" },
        });
      }
    }

    const finalQuery = { $and: [mainQuery, { $or: orConditions }] };

    const items = await Item.find(finalQuery)
      .sort({ created_at: -1 })
      .populate("author", "username")
      .populate("brand", "brand_name")
      .populate("location", "location_name")
      .populate("colour", "colour")
      .populate("category", "category_name");

    return items;
  } catch (err) {
    throw err;
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
      .populate("location", "location_name")
      .populate("colour", "colour")
      .populate("category", "category_name");

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
  material,
  address,
  coordinates
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
      address,
      coordinates,
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

// PATCH /api/items/:item_id
const updateItemResolvedById = async (item_id, resolved) => {
  const query = { _id: item_id };
  const update = {
    $set: {
      resolved,
    },
  };
  const options = { new: true };

  if (!mongoose.Types.ObjectId.isValid(item_id)) {
    throw {
      status: 400,
      msg: "Bad request: invalid ID format!",
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
const insertItem = async (resolvedItem) => {
  // Assumes all IDs have already been resolved in controller
  const itemDoc = await Item.create(resolvedItem);
  return itemDoc;
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

// GET /api/items/resolved
const selectResolvedItems = async () => {
  try {
    const resolvedItemsList = await Item.find({ resolved: true }).sort({
      created_at: -1,
    });
    return resolvedItemsList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// marked resolved 
const markItemAsResolved = async (itemId) => {
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw { status: 400, msg: "Invalid item ID" };
  }
  // Find item and set resolved to true
  const updatedItem = await Item.findByIdAndUpdate(
    itemId,
    { $set: { resolved: true } },
    { new: true }
  );
  return updatedItem;
};

module.exports = {
  Item,
  selectItems,
  selectItemById,
  insertItem,
  removeItemById,
  selectItemByIdToUpdate,
  updateItemResolvedById,
  selectResolvedItems,
   markItemAsResolved
};
