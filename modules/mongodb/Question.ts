// models/Quesion.ts
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  choices: {
    type: Array<String>,
    require: true
  },
  correct: {
    type: Number,
    require: true
  }
}, {collection: 'question'});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);