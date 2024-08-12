// models/Quesions.ts
import mongoose from 'mongoose';

const QuestionsSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    require: true
  },
  questions: {
    type: Array<String>,
    required: true,
  },
  rndchoices: {
    type: Array<Array<Number>>,
    require: true
  }
}, {collection: 'questions'});

export default mongoose.models.Questions || mongoose.model('Questions', QuestionsSchema);