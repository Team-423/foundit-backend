const mongoose = require("mongoose");
const ItemQuestion = require("../models/itemQuestion.model.js");

exports.getQuestionsForItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(404).json({ msg: "Questions not found for this item" });
    }

    const itemQ = await ItemQuestion.findOne({ itemId: new mongoose.Types.ObjectId(itemId) });
    if (!itemQ) {
      return res.status(404).json({ msg: "Questions not found for this item" });
    }

    res.status(200).json({
      questions: itemQ.questions.map(q => q.question)
    });
  } catch (err) {
    next(err);
  }
};
