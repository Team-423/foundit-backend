const mongoose = require("mongoose");
const {
  findQandAByItemId,
  createQandAForItem,
} = require("../models/qanda.model.js");

//GET /api/items/:item_id/QandA
exports.getQandAForItem = async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const questionAndAnswerPairs = await findQandAByItemId(item_id);
    res.status(200).send(questionAndAnswerPairs);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).send({ msg: err.msg });
    }
    next(err);
  }
};

//POST /api/items/:item_id/QandA
exports.postQandAForItem = async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const { question } = req.body;

    if (!question) {
      return res.status(400).send({ msg: "Question is required" });
    }

    const questionAndAnswerPairs = await createQandAForItem(item_id, question);
    res.status(201).send(questionAndAnswerPairs);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).send({ msg: err.msg });
    }
    console.error("Error in postQandAForItem:", err);
    next(err);
  }
};
