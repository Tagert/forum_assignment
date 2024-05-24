import mongoose from "mongoose";
import { voteSchema } from "./vote.model.js";

const answerSchema = mongoose.Schema({
  answer_id: { type: String, required: true },
  date: { type: Date, required: false },
  user_id: { type: String, required: true },
  createdByUser: { type: String, required: false },
  text: { type: String, required: true, min: 3 },
  question_id: { type: String, required: false },
  answer_votes: { type: [voteSchema], required: false },
  votesCounter: { type: Number, required: false, default: 0 },
});

const AnswerModel = mongoose.model("answers", answerSchema);

export { AnswerModel };
