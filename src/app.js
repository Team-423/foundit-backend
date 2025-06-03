const express = require("express");
const { getEndPoints } = require("./app/controller/app.controller.js");
const app = express();

app.use(express.json());
app.get("/api", getEndPoints);

module.exports = app;
