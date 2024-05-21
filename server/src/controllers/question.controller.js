import { descendingOrder } from "../utils/helpers/votes_desc_sorting.js";
import { QuestionModel } from "../models/question.model.js";

const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();

    if (!questions.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    const sortedQuestions = descendingOrder(questions, "question_votes");

    return res.json({ sortedQuestions });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const INSERT_QUESTION = async (req, res) => {
  try {
    const dateTime = new Date().toLocaleString();

    const question = new QuestionModel({
      date: dateTime,
      title: req.body.title,
      user_id: req.body.user_id,
      text: req.body.text,
      category: req.body.category,
      question_answers: [],
    });
    question.question_id = question._id.toString();

    const response = await question.save();

    return res.status(201).json({
      response: response,
      message: `This (${req.body.title}) Question was added successfully`,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({
      question_id: req.params.id,
    });

    if (!question) {
      return res.status(400).json({
        message: `The entered ID (${req.params.id}) does not exist. Please try entering a different ID.`,
      });
    }

    return res.json(question);
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({
      question_id: req.params.id,
    });

    if (!question) {
      return res.status(401).json({
        message: `Question with this ID (${req.params.id}) does not exist`,
      });
    }

    if (question.user_id !== req.body.user_id) {
      return res.status(403).json({
        message: "You are not authorized to take any actions on this data.",
      });
    }

    const response = await QuestionModel.deleteOne({
      question_id: req.params.id,
    });

    return res.status(200).json({
      message: `Question with ID (${req.params.id}) was deleted`,
      response: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const UPVOTE_QUESTION = async (req, res) => {
  try {
    const userId = req.user.id;
    const questionId = req.params.id;

    const question = await QuestionModel.findOne({ question_id: questionId });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const existingVote = question.votes.find((vote) => vote.user_id === userId);
    if (existingVote) {
      if (existingVote.vote === 1) {
        return res
          .status(400)
          .json({ message: "User has already UP voted this question" });
      } else {
        existingVote.vote = 1;
        question.question_votes += 2;
      }
    } else {
      question.votes.push({ user_id: userId, vote: 1 });
      question.question_votes += 1;
    }

    await question.save();

    return res.json({
      message: `Question with ID (${questionId}) suscefullly UP voted`,
      question,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const DOWNVOTE_QUESTION = async (req, res) => {
  try {
    const userId = req.user.id;
    const questionId = req.params.id;

    const question = await QuestionModel.findOne({ question_id: questionId });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const existingVote = question.votes.find((vote) => vote.user_id === userId);
    if (existingVote) {
      if (existingVote.vote === -1) {
        return res
          .status(400)
          .json({ message: "User has already downvoted this question" });
      } else {
        existingVote.vote = -1;
        question.question_votes -= 2;
      }
    } else {
      question.votes.push({ user_id: userId, vote: -1 });
      question.question_votes -= 1;
    }

    await question.save();

    return res.json({
      message: `Question with ID (${questionId}) suscefullly DOWN voted`,
      question,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  INSERT_QUESTION,
  DELETE_QUESTION_BY_ID,
  UPVOTE_QUESTION,
  DOWNVOTE_QUESTION,
};
