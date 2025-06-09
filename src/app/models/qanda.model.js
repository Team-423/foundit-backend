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

    // Add new question and initialize empty answer
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
    console.error("Error in createQandAForItem:", error);
    throw {
      status: 500,
      msg: "Internal server error",
    };
  }
};
