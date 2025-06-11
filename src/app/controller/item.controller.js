const getUserId = require("../utils/getUserId");
const getCategoryId = require("../utils/getCategoryId");
const getLocationId = require("../utils/getLocationId");
const getBrandId = require("../utils/getBrandId");
const getColourId = require("../utils/getColourId");

const {
  selectItemById,
  selectItems,
  selectItemByIdToUpdate,
  insertItem,
  removeItemById,
  updateItemResolvedById,
  selectResolvedItems,

} = require("../models/item.model");

const { incrementUserPoints } = require("../models/user.model.js");

// GET /api/items/
exports.getItems = async (req, res, next) => {
  try {
    const items = await selectItems(req.query);
    if (items.length === 0) {
      throw {
        status: 404,
        msg: "No results!",
      };
    }
    res.status(200).send(items);
  } catch (err) {
    next(err);
  }
};

// GET /api/items/:item_id
exports.getItemById = async (req, res, next) => {
  const { item_id } = req.params;
  try {
    const itemById = await selectItemById(item_id);

    res.status(200).send({ itemById });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/items/:item_id
exports.updateItemById = async (req, res, next) => {
  const { item_id } = req.params;
  const {
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
  } = req.body;
  
  const validNonStringKeys = ["coordinates"];

  const itemInfo = Object.entries(req.body);
  for (const [key, value] of itemInfo) {
    if (!validNonStringKeys.includes(key) && typeof value !== "string") {
      return res.status(400).send({ msg: "Bad request: invalid format!" });
    }
  }

  try {
    const updatedItem = await selectItemByIdToUpdate(
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
    );
    res.status(200).send({ updatedItem });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/items/:item_id/resolved
exports.patchItemResolvedById = async (req, res, next) => {
  const { item_id } = req.params;
  const { resolved } = req.body;

  if (typeof resolved !== "boolean") {
    return res
      .status(400)
      .send({ msg: "Bad request: 'resolved' must be a boolean value!" });
  }
  try {
    const item = await selectItemById(item_id);
    if (!item) return res.status(404).send({ msg: "Item not found!" });

    const wasResolved = item.resolved; 
    
    const updatedItem = await updateItemResolvedById(item_id, resolved);

  
    if (!wasResolved && resolved === true) {
    
      const authorId = updatedItem.author._id ? updatedItem.author._id : updatedItem.author;
      await incrementUserPoints(authorId.toString(), 10);
    }

    res.status(200).send({ updatedItem });
  } catch (err) {
    next(err);
  }
};

// POST /api/items
exports.postItem = async (req, res, next) => {
  try {
    const postedItem = req.body;

    const requiredFields = [
      "item_name",
      "author",
      "category",
      "description",
      "location",
    ];
    for (const field of requiredFields) {
      if (!postedItem[field]) {
        return res
          .status(400)
          .send({ msg: `Missing required field: ${field}!` });
      }
    }

    const [authorId, categoryId, locationId, brandId, colourId] =
      await Promise.all([
        getUserId(postedItem.author),
        getCategoryId(postedItem.category),
        getLocationId(postedItem.location),
        getBrandId(postedItem.brand),
        getColourId(postedItem.colour),
      ]);

    const unresolved = {};
    if (!authorId) unresolved.author = postedItem.author;
    if (!categoryId) unresolved.category = postedItem.category;
    if (!locationId) unresolved.location = postedItem.location;
    if (!brandId) unresolved.brand = postedItem.brand;
    if (!colourId) unresolved.colour = postedItem.colour;

    if (Object.keys(unresolved).length > 0) {
      return res.status(400).send({
        msg: "Failed to resolve one or more reference fields",
        missingFields: unresolved,
      });
    }

    const resolvedItem = {
      ...postedItem,
      author: authorId,
      category: categoryId,
      location: locationId,
      brand: brandId,
      colour: colourId,
    };

    const newItem = await insertItem(resolvedItem);
    res.status(201).send({ newItem });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/items/:item_id
exports.deleteItemById = async (req, res, next) => {
  const { item_id } = req.params;
  try {
    const deleteItem = await removeItemById(item_id);
    if (!deleteItem) {
      return res.status(404).send({ msg: "Item not found!" });
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// GET /api/items/resolved
exports.getResolvedItems = async (req, res, next) => {
  try {
    const resolvedItemsList = await selectResolvedItems();
    res.status(200).send({ resolvedItemsList });
  } catch (err) {
    next(err);
  }


};
 