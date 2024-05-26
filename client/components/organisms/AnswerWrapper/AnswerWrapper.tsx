import styles from "./styles/AnswerWrapper.module.css";
import axios from "axios";
import cookies from "js-cookie";
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

  const answerDelete = async (answer_id: string) => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const res = await axios.delete(
        `${process.env.SERVER_URL}/answer/${answer_id}`,
        { headers }
      );

      if (res.status === 200) {
        if (answers) {
          const updatedAnswers = answers.filter(
            (answer) => answer.answer_id !== answer_id
          );

          setAnswers(updatedAnswers);
        }
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

  return (
    <section className={styles.container}>
      <section className={styles.communicationWrapper}>
        <div className={styles.questionHolder}>
          {question ? (
            <QuestionSide
              title={question.title}
              text={question.text}
              date={question.date}
              vote={question.votesCounter}
              answersCount={question.question_answers.length}
              viewsCount={question.question_views}
              userName={question ? question.createdByUser : "Unknown"}
              user_id={question.user_id}
              loggedUser={loggedUser}
              questionDelete={questionDelete}
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
