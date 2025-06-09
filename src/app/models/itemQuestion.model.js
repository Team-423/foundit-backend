const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemQuestionSchema = new Schema({
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true},
  questions: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('ItemQuestion', ItemQuestionSchema);