import mongoose from "mongoose";
import { voteSchema } from "./vote.model.js";

const questionSchema = mongoose.Schema({
  question_id: { type: String, required: true },
  date: { type: Date, required: false },
  user_id: { type: String, required: true },
  title: { type: String, required: true, min: 3 },
  text: { type: String, required: true, min: 3 },
  createdByUser: { type: String, required: false },
  category: { type: String, required: true },
  question_answers: { type: Array, required: false },
  question_votes: { type: [voteSchema], required: false },
  question_views: { type: Number, required: false, default: 0 },
  votesCounter: { type: Number, required: false, default: 0 },
});

const QuestionModel = mongoose.model("questions", questionSchema);

export { QuestionModel };
