import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  vote: { type: Number, required: true }, // 1 for upvote, -1 for downvote
});

const questionSchema = mongoose.Schema({
  question_id: { type: String, required: true },
  date: { type: Date, required: false },
  user_id: { type: String, required: true },
  title: { type: String, required: true, min: 3 },
  text: { type: String, required: true, min: 3 },
  createdByUser: { type: String, required: false },
  category: { type: String, required: true },
  question_answers: { type: Array, required: false },
  question_votes: { type: Number, required: false, default: 0 },
  question_views: { type: Number, required: false, default: 0 },
  votes: { type: [voteSchema], required: false },
});

const QuestionModel = mongoose.model("questions", questionSchema);

export { QuestionModel };
