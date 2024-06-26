import { VoteType } from "./vote.type";

export type AnswerType = {
  answer_id: string;
  date: Date;
  user_id: string;
  createdByUser: string;
  text: string;
  question_id: string;
  answer_votes: VoteType[];
  votesCounter: number;
};
