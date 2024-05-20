import express from "express";
import {
  INSERT_ANSWER_TO_QUESTION,
  GET_QUESTION_ALL_ANSWERS,
  DELETE_ANSWER_FROM_QUESTION_BY_ID,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.get("/question/:id/answers", GET_QUESTION_ALL_ANSWERS);

router.post("/question/:id/answers", INSERT_ANSWER_TO_QUESTION);

router.delete(
  "/question/:id/answers/:answerId",
  DELETE_ANSWER_FROM_QUESTION_BY_ID
);

export default router;
