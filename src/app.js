const express = require("express");
const { getEndPoints, getUserById } = require("./app/controller/app.controller.js");
const app = express();

app.use(express.json());
app.get("/api", getEndPoints);
app.get("/api/users/:userId", getUserById)
app.use((err, req, res, next) => {
    if (err.name) {
        return res.status(400).send({msg: "Invalid user ID"})
    }
})
module.exports = app;
