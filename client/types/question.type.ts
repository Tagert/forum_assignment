import { AnswerType } from "./answer.type";

export type QuestionType = {
  question_id: string;
  date: Date;
  user_id: string;
  title: string;
  text: string;
  category: string;
  question_answers: AnswerType[];
  question_views: number;
  question_votes: number;
};
