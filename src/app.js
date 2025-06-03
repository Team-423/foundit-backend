const express = require("express");
const { getEndPoints } = require("./app/controller/app.controller.js");
const { getItemById } = require("./app/controller/item.controller.js");
const app = express();

app.use(express.json());
app.get("/api", getEndPoints);
app.get("/api/items/:item_id", getItemById);

module.exports = app;
