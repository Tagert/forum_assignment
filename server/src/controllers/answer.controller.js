import { io } from "../../index.js";
import { descendingOrder } from "../utils/helpers/votes_desc_sorting.js";
import { QuestionModel } from "../models/question.model.js";
import { AnswerModel } from "../models/answer.model.js";

const INSERT_ANSWER_TO_QUESTION = async (req, res) => {
  try {
    const dateTime = new Date().toLocaleString();
    const questionId = req.params.id;

    const checkQuestion = await QuestionModel.findOne({
      question_id: req.params.id,
    });

    if (!checkQuestion) {
      return res.status(404).json({
        message: `Question with this ID (${questionId}) does not exist`,
      });
    }

    const answer = new AnswerModel({
      date: dateTime,
      user_id: req.body.user_id,
      createdByUser: req.body.createdByUser,
      text: req.body.text,
      question_id: questionId,
    });
    answer.answer_id = answer._id.toString();

    const response = await answer.save();

    await QuestionModel.findOneAndUpdate(
      {
        question_id: req.params.id,
      },
      {
        $push: { question_answers: answer.answer_id },
      },
      { new: true }
    );

    io.emit("new_answer", response);

    return res.status(201).json({
      status: `Answer with ID (${answer.answer_id}) was created`,
      response: response,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const GET_QUESTION_ALL_ANSWERS = async (req, res) => {
  try {
    const questionId = req.params.id;

    const questionAnswers = await QuestionModel.aggregate([
      {
        $match: { question_id: questionId },
      },
      {
        $lookup: {
          from: "answers",
          localField: "question_answers",
          foreignField: "answer_id",
          as: "answers",
        },
      },
    ]).exec();

    if (!questionAnswers.length) {
      return res
        .status(204)
        .json({ message: "No answers found for this question" });
    }

    const sortedAnswers = descendingOrder(
      questionAnswers[0].answers,
      "votesCounter"
    );

    return res.status(200).json({ answers: sortedAnswers });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const DELETE_ANSWER_FROM_QUESTION_BY_ID = async (req, res) => {
  try {
    const answerId = req.params.id;

    const answer = await AnswerModel.findOne({
      answer_id: answerId,
    });

    if (!answer) {
      return res.status(404).json({
        message: `Answer with this ID (${answerId}) does not exist`,
      });
    }

    if (answer.user_id !== req.body.user_id) {
      return res.status(403).json({
        message: "You are not authorized to take any actions on this data.",
      });
    }

    const questionId = answer.question_id;

    const question = await QuestionModel.findOne({
      question_id: questionId,
    });

    if (!question) {
      return res.status(404).json({
        message: `Question with this ID (${questionId}) does not exist`,
      });
    }

    const deletedAnswer = await AnswerModel.findOneAndDelete({
      answer_id: answerId,
    });

    const updatedQuestionAnswers = await QuestionModel.findOneAndUpdate(
      { question_id: questionId },
      { $pull: { question_answers: answerId } },
      { new: true }
    );

    if (!deletedAnswer || !updatedQuestionAnswers) {
      return res.status(404).json({
        message: `Answer with such ID (${answerId}) not found`,
      });
    }

    io.emit("delete_answer", answerId);

    return res.status(200).json({
      message: `The answer with this ID (${answerId}) was successfully deleted`,
      updatedQuestionAnswers,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const EDIT_ANSWER_FROM_QUESTION_BY_ID = async (req, res) => {
  try {
    const answerId = req.params.id;

    const answer = await AnswerModel.findOne({
      answer_id: answerId,
    });

    if (!answer) {
      return res.status(404).json({
        message: `Answer with this ID (${answerId}) does not exist`,
      });
    }

    if (answer.user_id !== req.body.user_id) {
      return res.status(403).json({
        message: "You are not authorized to take any actions on this data.",
      });
    }

    const updateAnswer = await AnswerModel.findOneAndUpdate(
      { answer_id: answerId },
      { text: req.body.text },
      { new: true }
    );

    if (!updateAnswer) {
      return res.status(404).json({
        message: `Answer with such ID (${answerId}) not found`,
      });
    }

    io.emit("update_answer", updateAnswer);

    return res.status(200).json({
      message: `The answer with this ID (${answerId}) was successfully updated`,
      updatedAnswer: updateAnswer,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const GET_ALL_ANSWERS = async (req, res) => {
  try {
    const answers = await AnswerModel.find();

    if (!answers.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    const sortedAnswers = descendingOrder(answers, "votesCounter");

    return res.json({ sortedAnswers });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const UPVOTE_ANSWER = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const answerId = req.params.id;

    const answer = await AnswerModel.findOne({ answer_id: answerId });
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const existingVote = answer.answer_votes.find(
      (vote) => vote.user_id === userId
    );
    if (existingVote) {
      if (existingVote.vote === 1) {
        return res
          .status(400)
          .json({ message: "You have already Up voted this answer" });
      } else {
        existingVote.vote = 1;
        answer.votesCounter += 2;
      }
    } else {
      answer.answer_votes.push({ user_id: userId, vote: 1 });
      answer.votesCounter += 1;
    }

    await answer.save();

    io.emit("vote_answer", answer);

    return res.status(200).json({
      message: `Answer with ID (${answerId}) successfully UP voted`,
      answer,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const DOWNVOTE_ANSWER = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const answerId = req.params.id;

    const answer = await AnswerModel.findOne({ answer_id: answerId });
    if (!answer) {
      return res.status(404).json({ message: "Question not found" });
    }

    const existingVote = answer.answer_votes.find(
      (vote) => vote.user_id === userId
    );
    if (existingVote) {
      if (existingVote.vote === -1) {
        return res
          .status(400)
          .json({ message: "You have already Down voted this answer." });
      } else {
        existingVote.vote = -1;
        answer.votesCounter -= 2;
      }
    } else {
      answer.answer_votes.push({ user_id: userId, vote: -1 });
      answer.votesCounter -= 1;
    }

    await answer.save();

    io.emit("vote_answer", answer);

    return res.status(200).json({
      message: `Answer with ID (${answerId}) successfully DOWN voted`,
      answer,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  INSERT_ANSWER_TO_QUESTION,
  GET_QUESTION_ALL_ANSWERS,
  DELETE_ANSWER_FROM_QUESTION_BY_ID,
  EDIT_ANSWER_FROM_QUESTION_BY_ID,
  GET_ALL_ANSWERS,
  UPVOTE_ANSWER,
  DOWNVOTE_ANSWER,
};
