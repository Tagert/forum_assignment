import express from "express";
import {
  INSERT_ANSWER_TO_QUESTION,
  GET_QUESTION_ALL_ANSWERS,
  DELETE_ANSWER_FROM_QUESTION_BY_ID,
  GET_ALL_ANSWERS,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.get("/question/:id/answers", GET_QUESTION_ALL_ANSWERS);

router.post("/question/:id/answers", INSERT_ANSWER_TO_QUESTION);

router.delete("/answer/:id", DELETE_ANSWER_FROM_QUESTION_BY_ID);

router.get("/answers", GET_ALL_ANSWERS);

export default router;
