const mongoose = require("mongoose");
const { Item } = require("./item.model.js");

////GET /api/items/:item_id/QandA
exports.findQandAByItemId = async (item_id) => {
  try {
    const item = await Item.findById(item_id);

    if (!item) {
      throw {
        status: 404,
        msg: "Item not found",
      };
    }

    if (
      !item.questions ||
      !item.answers ||
      item.questions.length === 0 ||
      item.answers.length === 0
    ) {
      throw {
        status: 404,
        msg: "Questions not found for this item",
      };
    }

    return {
      questionAndAnswerPairs: item.questions.map((question, index) => ({
        question,
        answer: item.answers[index] || "",
      })),
    };
  } catch (error) {
    if (error.status) throw error;
    throw {
      status: 500,
      msg: "Internal server error",
    };
  }
};

//POST /api/items/:item_id/QandA
exports.createQandAForItem = async (item_id, question) => {
  try {
    const item = await Item.findById(item_id);

    if (!item) {
      throw {
        status: 404,
        msg: "Item not found",
      };
    }

    item.questions.push(question);
    item.answers.push("");

    await item.save();

    return {
      questionAndAnswerPairs: item.questions.map((q, index) => ({
        question: q,
        answer: item.answers[index] || "",
      })),
    };
  } catch (error) {
    if (error.status) throw error;
    throw {
      status: 500,
      msg: "Internal server error",
    };
  }
};

//PATCH /api/items/:item_id/QandA
exports.updateAnswersForItem = async (item_id, answers) => {
  try {
    const item = await Item.findById(item_id);

    if (!item) {
      throw {
        status: 404,
        msg: "Item not found",
      };
    }

    if (!item.questions || item.questions.length === 0) {
      throw {
        status: 404,
        msg: "No questions found for this item",
      };
    }

    if (!Array.isArray(answers) || answers.length !== item.questions.length) {
      throw {
        status: 400,
        msg: "Answers array must match the number of questions",
      };
    }

    item.answers = answers;
    await item.save();

    return {
      questionAndAnswerPairs: item.questions.map((question, index) => ({
        question,
        answer: item.answers[index] || "",
      })),
    };
  } catch (error) {
    if (error.status) throw error;
    throw {
      status: 500,
      msg: "Internal server error",
    };
  }
};

//PATCH /api/items/:item_id/QandA/questions
exports.updateQuestionsForItem = async (item_id, questions) => {
  try {
    const item = await Item.findById(item_id);

    if (!item) {
      throw {
        status: 404,
        msg: "Item not found",
      };
    }

    if (!Array.isArray(questions)) {
      throw {
        status: 400,
        msg: "Questions must be an array",
      };
    }

    item.questions = questions;
    await item.save();

    return {
      questionAndAnswerPairs: item.questions.map((question, index) => ({
        question,
        answer: item.answers[index] || "",
      })),
    };
  } catch (error) {
    if (error.status) throw error;
    throw {
      status: 500,
      msg: "Internal server error",
    };
  }
};
