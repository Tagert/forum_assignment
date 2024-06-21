import styles from "./styles/AnswerWrapper.module.css";
import axios from "axios";
import cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { UserType } from "../../../types/user.type";
import { AnswerType } from "../../../types/answer.type";
import { QuestionType } from "../../../types/question.type";
import { getCardClassName } from "../../../utils/get_card_class_name";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { QuestionSide } from "../../molecules/QuestionSide/QuestionSide";
import { AnswerCard } from "../../molecules/AnswerCard/AnswerCard";
import { ReplyCard } from "../../molecules/ReplyCard/ReplyCard";

type AnswersWrapperProps = {
  loggedUser: UserType | null;
  question: QuestionType | null;
  setQuestion: (question: QuestionType) => void;
  answers: AnswerType[] | null;
  setAnswers: (answers: AnswerType[]) => void;
  answerText: string;
  setAnswerText: (text: string) => void;
  handleInsertAnswer: () => void;
  handleQuestionVote: (voteType: "upvote" | "downvote") => void;
  handleAnswerVote: (answerId: string, voteType: "upvote" | "downvote") => void;
};

const AnswerWrapper = ({
  question,
  setQuestion,
  loggedUser,
  answers,
  setAnswers,
  answerText,
  setAnswerText,
  handleInsertAnswer,
  handleQuestionVote,
  handleAnswerVote,
}: AnswersWrapperProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState(question?.title || "");
  const [editedText, setEditedText] = useState(question?.text || "");

  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [answerEditedText, setAnswerEditedText] = useState<string>("");

  const questionDelete = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const res = await axios.delete(
        `${process.env.SERVER_URL}/question/${router.query.id}`,
        { headers }
      );

      if (res.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
      // @ts-expect-error
      if (err.response.status === 403) {
        // @ts-expect-error
        alert(err.response.data.message);
      }
    }
  };

  const questionEdit = async () => {
    try {
      const headers = { authorization: cookies.get("jwt_token") };

      const res = await axios.put(
        `${process.env.SERVER_URL}/question/${router.query.id}`,
        { text: editedText, title: editedTitle },
        { headers }
      );

      if (res.status === 200) {
        setQuestion(res.data.updatedQuestion);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating question:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  const answerDelete = async (answer_id: string) => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const res = await axios.delete(
        `${process.env.SERVER_URL}/answer/${answer_id}`,
        { headers }
      );

      if (res.status === 200 && answers) {
        const updatedAnswers = answers.filter(
          (answer) => answer.answer_id !== answer_id
        );

        setAnswers(updatedAnswers);
      }
    } catch (err) {
      console.error("Error deleting question:", err);
      // @ts-expect-error
      if (err.response.status === 403) {
        // @ts-expect-error
        alert(err.response.data.message);
      }
    }
  };

  const answerEdit = async (answer_id: string) => {
    try {
      const headers = { authorization: cookies.get("jwt_token") };

      const res = await axios.put(
        `${process.env.SERVER_URL}/answer/${answer_id}`,
        { text: answerEditedText },
        { headers }
      );

      if (res.status === 200 && answers) {
        const updatedAnswers = answers.map((answer) =>
          answer.answer_id === answer_id ? res.data.updatedAnswer : answer
        );

        setAnswers(updatedAnswers);
        setEditingAnswerId(null);
        setAnswerEditedText("");
      }
    } catch (err) {
      console.error("Error updating question:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  const startEditingAnswer = (answer_id: string, text: string) => {
    setEditingAnswerId(answer_id);
    setAnswerEditedText(text);
  };

  const cancelEditingAnswer = () => {
    setEditingAnswerId(null);
    setAnswerEditedText("");
  };

  return (
    <section className={styles.container}>
      <section className={styles.communicationWrapper}>
        <div className={styles.questionHolder}>
          {question ? (
            <QuestionSide
              title={question.title}
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
              text={question.text}
              editedText={editedText}
              setEditedText={setEditedText}
              date={question.date}
              vote={question.votesCounter}
              answersCount={question.question_answers.length}
              viewsCount={question.question_views}
              userName={question ? question.createdByUser : "Unknown"}
              user_id={question.user_id}
              loggedUser={loggedUser}
              questionDelete={questionDelete}
              questionEdit={questionEdit}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleQuestionVote={handleQuestionVote}
            />
          ) : (
            <Spinner />
          )}
        </div>

        <div className={styles.answersHolder}>
          {question &&
            (question.question_answers.length !== 0 ? (
              <h4>Answers</h4>
            ) : (
              <h4>There is no Answers be first to Reply!</h4>
            ))}

          {answers ? (
            answers.map((answer, index) => {
              const cardClassName = getCardClassName(index);

              return (
                <AnswerCard
                  key={`${answer.answer_id}-${index}`}
                  answer_id={answer.answer_id}
                  text={answer.text}
                  date={answer.date}
                  vote={answer.votesCounter}
                  userName={answer ? answer.createdByUser : "Unknown"}
                  user_id={answer.user_id}
                  loggedUser={loggedUser}
                  answerDelete={answerDelete}
                  handleAnswerVote={handleAnswerVote}
                  className={cardClassName}
                  editedText={answerEditedText}
                  setEditedText={setAnswerEditedText}
                  startEditing={() =>
                    startEditingAnswer(answer.answer_id, answer.text)
                  }
                  cancelEditing={cancelEditingAnswer}
                  submitEdit={() => answerEdit(answer.answer_id)}
                />
              );
            })
          ) : (
            <Spinner />
          )}
        </div>

        <div className={styles.replyHolder}>
          <h4>Reply</h4>

          <ReplyCard
            answerText={answerText}
            setAnswerText={setAnswerText}
            onClick={handleInsertAnswer}
            loggedUser={loggedUser}
          />
        </div>
      </section>
    </section>
  );
};

export { AnswerWrapper };
