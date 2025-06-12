const mongoose = require("mongoose");
const {
  findQandAByItemId,
  createQandAForItem,
  updateAnswersForItem,
  updateQuestionsForItem,
} = require("../models/qanda.model.js");
const { Item } = require("../models/item.model.js");
const { User } = require("../models/user.model.js");
const { sendClaimNotification } = require("../../services/email.service.js");

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
    next(err);
  }
};

//PATCH /api/items/:item_id/QandA
exports.patchAnswersForItem = async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const { answers, claimant_id } = req.body;

    if (!answers) {
      return res.status(400).send({ msg: "Answers array is required" });
    }

    const questionAndAnswerPairs = await updateAnswersForItem(item_id, answers);

    // Send email notifcation to owner implementation
    const item = await Item.findById(item_id).populate("author");
    const claimant = await User.findById(claimant_id);

    if (item?.author?.email && claimant?.username) {
      try {
        await sendClaimNotification({
          to: item.author.email,
          claimantName: claimant.username,
          itemName: item.item_name,
          item_id,
        });
      } catch (emailError) {
        console.error("Failed to send claim email:", emailError);
      }
    }

    res.status(200).send(questionAndAnswerPairs);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).send({ msg: err.msg });
    }
    next(err);
  }
};

//PATCH /api/items/:item_id/QandA/questions
exports.patchQuestionsForItem = async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const { questions } = req.body;

    if (!questions) {
      return res.status(400).send({ msg: "Questions array is required" });
    }

    const questionAndAnswerPairs = await updateQuestionsForItem(
      item_id,
      questions
    );
    res.status(200).send(questionAndAnswerPairs);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).send({ msg: err.msg });
    }
    next(err);
  }
};
