import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  vote: { type: Number, required: true },
});

export { voteSchema };
