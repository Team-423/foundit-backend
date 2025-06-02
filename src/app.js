const express = require("express");
const { getEndPoints } = require("./db/controller/app.controller");
const app = express();

app.use(express.json());
app.get("/api", getEndPoints);

module.exports = app;
