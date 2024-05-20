import express from "express";
import auth from "../middlewares/authorization.js";
import {
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  INSERT_QUESTION,
  DELETE_QUESTION_BY_ID,
  UPVOTE_QUESTION,
  DOWNVOTE_QUESTION,
} from "../controllers/question.controller.js";

const router = express.Router();

router.get("/questions", GET_ALL_QUESTIONS);

router.get("/questions/:id", GET_QUESTION_BY_ID);

router.post("/questions", auth, INSERT_QUESTION);

router.delete("/questions/:id", auth, DELETE_QUESTION_BY_ID);

router.post("questions/:id/upvote", UPVOTE_QUESTION);

router.post("/questions/:id/downvote", DOWNVOTE_QUESTION);

export default router;
