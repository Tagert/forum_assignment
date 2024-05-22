import styles from "./styles/AnswerWrapper.module.css";
import { UserType } from "../../../types/user.type";
import { AnswerType } from "../../../types/answer.type";
import { QuestionType } from "../../../types/question.type";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { QuestionSide } from "../../molecules/QuestionSide/QuestionSide";
import { AnswerCard } from "../../molecules/AnswerCard/AnswerCard";

type AnswersWrapperProps = {
  question: QuestionType | null;
  user: UserType | null;
  answers: AnswerType[] | null;
};

const AnswerWrapper = ({ question, answers, user }: AnswersWrapperProps) => {
  return (
    <section className={styles.container}>
      <section className={styles.questionHolder}>
        {question ? (
          <QuestionSide
            title={question.title}
            text={question.text}
            date={question.date}
            vote={question.question_votes}
            answersCount={question.question_answers.length}
            viewsCount={question.question_views}
            userName={user ? user.name : "Unknown"}
          />
        ) : (
          <Spinner />
        )}

        {answers ? (
          answers.map((answer) => {
            return (
              <AnswerCard
                key={answer.answer_id}
                answer_id={answer.answer_id}
                text={answer.text}
                date={answer.date}
                answer_votes={answer.answer_votes}
                userName={user ? user.name : "Unknown"}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </section>
    </section>
  );
};

export { AnswerWrapper };
