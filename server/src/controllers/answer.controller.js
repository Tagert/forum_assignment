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
      text: req.body.text,
      question_id: questionId,
      answer_votes: 0,
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

    // if (!questionAnswers.length) {
    //   return res
    //     .status(204)
    //     .json({ message: "No answers found for this question" });
    // }

    return res.json({ answers: questionAnswers[0].answers });
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

    const questionId = answer.question_id;

    console.log(questionId);

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

    return res.json({
      message: `The answer with this ID (${answerId}) was successfully deleted`,
      updatedQuestionAnswers,
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

    const sortedAnswers = descendingOrder(answers, "answer_votes");

    return res.json({ sortedAnswers });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  INSERT_ANSWER_TO_QUESTION,
  GET_QUESTION_ALL_ANSWERS,
  DELETE_ANSWER_FROM_QUESTION_BY_ID,
  GET_ALL_ANSWERS,
};
