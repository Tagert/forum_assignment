import { AnswerType } from "./answer.type";
import { VoteType } from "./vote.type";

export type QuestionType = {
  question_id: string;
  date: Date;
  user_id: string;
  createdByUser: string;
  title: string;
  text: string;
  category:
    | "Ask the Community"
    | "MarketPlace"
    | "Off-Topic"
    | "Suggestion Box";
  question_answers: AnswerType[];
  question_views: number;
  question_votes: VoteType[];
  votesCounter: number;
};
