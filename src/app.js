const express = require("express");
const { getEndPoints } = require("./app/controller/app.controller.js");
const {
  getItemById,
  getItems,
  updateItemById,
  postItem,
  deleteItemById,
  patchItemResolvedById,
} = require("./app/controller/item.controller.js");
const {
  getUserById,
  updateUserById,
} = require("./app/controller/user.controller.js");
const { getColours } = require("./app/controller/colour.controller.js");
const { getAllBrands } = require("./app/controller/brand.controller.js");
const { getAllLocations } = require("./app/controller/location.controller.js");
const app = express();

app.use(express.json());
app.get("/api", getEndPoints);
app.get("/api/users/:userId", getUserById);
app.get("/api/items", getItems);
app.get("/api/items/brands", getAllBrands);
app.get("/api/items/locations", getAllLocations);
app.get("/api/items/colours", getColours);
app.get("/api/items/:item_id", getItemById);

app.patch("/api/items/:item_id", updateItemById);
app.patch("/api/users/:userId", updateUserById);
app.patch("/api/items/:item_id/resolved", patchItemResolvedById);

app.post("/api/items", postItem);

app.delete("/api/items/:item_id", deleteItemById);

app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

module.exports = app;
