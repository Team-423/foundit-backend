const express = require("express");
const {
  getEndPoints,
  getItems,
} = require("./app/controller/app.controller.js");
const app = express();

app.use(express.json());
app.get("/api", getEndPoints);
app.get("/api/items", getItems);
app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
});

module.exports = app;
