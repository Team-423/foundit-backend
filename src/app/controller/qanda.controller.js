const mongoose = require("mongoose");
const { findQandAByItemId } = require("../models/qanda.model.js");

//GET /api/items/:itemId/QandA
exports.getQandAForItem = async (req, res, next) => {
  try {
    const { item_Id } = req.params;
    const questionAndAnswerPairs = await findQandAByItemId(item_Id);
    res.status(200).send(questionAndAnswerPairs);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).send({ msg: err.msg });
    }
    next(err);
  }
};
