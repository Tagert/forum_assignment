import express from "express";
import auth from "../middlewares/authorization.js";

import {
  INSERT_ANSWER_TO_QUESTION,
  GET_QUESTION_ALL_ANSWERS,
  DELETE_ANSWER_FROM_QUESTION_BY_ID,
  EDIT_ANSWER_FROM_QUESTION_BY_ID,
  GET_ALL_ANSWERS,
  UPVOTE_ANSWER,
  DOWNVOTE_ANSWER,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.get("/question/:id/answers", GET_QUESTION_ALL_ANSWERS);

router.post("/question/:id/answers", auth, INSERT_ANSWER_TO_QUESTION);

router.delete("/answer/:id", auth, DELETE_ANSWER_FROM_QUESTION_BY_ID);

router.put("/answer/:id", auth, EDIT_ANSWER_FROM_QUESTION_BY_ID);

router.get("/answers", GET_ALL_ANSWERS);

router.post("/answer/:id/upvote", auth, UPVOTE_ANSWER);

router.post("/answer/:id/downvote", auth, DOWNVOTE_ANSWER);

export default router;
