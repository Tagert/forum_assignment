import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  answer_id: { type: String, required: true },
  date: { type: Date, required: false },
  user_id: { type: String, required: true },
  text: { type: String, required: true, min: 3 },
  question_id: { type: String, required: false },
  answer_votes: { type: Number, required: false },
});

const AnswerModel = mongoose.model("answers", answerSchema);

export { AnswerModel };
