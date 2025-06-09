const mongoose = require("mongoose");
const { Item } = require("./item.model.js");

////GET /api/items/:itemId/QandA
exports.findQandAByItemId = async (itemId) => {
  try {
    const item = await Item.findById(itemId);

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
