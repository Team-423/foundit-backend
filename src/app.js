const express = require("express");
const { getEndPoints } = require("./app/controller/app.controller.js");
const {
  getItemById,
  getItems,
  updateItemById,
} = require("./app/controller/item.controller.js");
const { getUserById } = require("./app/controller/user.controller.js");
const app = express();

app.use(express.json());
app.get("/api", getEndPoints);
app.get("/api/users/:userId", getUserById);
app.get("/api/items", getItems);
app.get("/api/items/:item_id", getItemById);

app.patch("/api/items/:item_id", updateItemById);

app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
});

app.use((err, req, res, next) => {
  if (err.name) {
    return res.status(400).send({ msg: "Invalid user ID" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

module.exports = app;
