const express = require("express");
const cors = require("cors");
const { getEndPoints } = require("./app/controller/app.controller.js");
const {
  getItemById,
  getItems,
  updateItemById,
  postItem,
  deleteItemById,
  patchItemResolvedById,
  getResolvedItems,
} = require("./app/controller/item.controller.js");
const {
  getUserById,
  updateUserById,
  getItemsByUserId,
  incrementPoints
} = require("./app/controller/user.controller.js");
const { getColours } = require("./app/controller/colour.controller.js");
const { getAllBrands } = require("./app/controller/brand.controller.js");
const { getAllLocations } = require("./app/controller/location.controller.js");
const {
  getQandAForItem,
  postQandAForItem,
  patchAnswersForItem,
  patchQuestionsForItem,
} = require("./app/controller/qanda.controller.js");
const { getCategories } = require("./app/controller/category.controller.js");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: [
    "https://glittering-madeleine-f055b9.netlify.app",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));

app.get("/api", getEndPoints);
app.get("/api/items", getItems);
app.get("/api/items/categories", getCategories);
app.get("/api/items/brands", getAllBrands);
app.get("/api/items/locations", getAllLocations);
app.get("/api/items/colours", getColours);
app.get("/api/items/resolved", getResolvedItems);
app.get("/api/items/:item_id", getItemById);
app.get("/api/items/:item_id/QandA", getQandAForItem);
app.get("/api/users/:userId", getUserById);
app.get("/api/users/:userId/items", getItemsByUserId);

app.patch("/api/items/:item_id", updateItemById);
app.patch("/api/items/:item_id/resolved", patchItemResolvedById);
app.patch("/api/items/:item_id/QandA", patchAnswersForItem);
app.patch("/api/items/:item_id/QandA/questions", patchQuestionsForItem);
app.patch("/api/users/:userId", updateUserById);
app.patch("/api/users/:userId/points", incrementPoints);

app.post("/api/items", postItem);
app.post("/api/items/:item_id/QandA", postQandAForItem);

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
