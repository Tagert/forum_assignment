import styles from "./styles/QuestionCard.module.css";
import Link from "next/link";
// import { QuestionType } from "../../../types/question.type";
import { AnswerType } from "../../../types/answer.type";
import { calcTimeDifference } from "../../../utils/calc_time_difference";

type QuestionProps = {
  question_id: string;
  date: Date;
  user_id: string;
  title: string;
  category: string;
  question_answers: AnswerType[];
  question_votes: number;
};

const QuestionCard = ({
  question_id,
  date,
  user_id,
  title,
  category,
  question_answers,
  question_votes,
}: QuestionProps) => {
  const timeAgo = calcTimeDifference(date);

  return (
    <Link href={`/question/${question_id}`} className={styles.linkHolder}>
      <div className={styles.container}>
        <div>
          <p className={styles.votes}>
            Votes: <span>{question_votes}</span>
          </p>
        </div>

        <div className={styles.questionDescription}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.category}>Category: {category}</p>
        </div>

        <div className={styles.answerCounter}>
          <svg
            id="Layer_1"
            version="1.1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <polygon
                points="26.7,107 103,107 103,99 23.3,99 9,114 9,25 1,25 1,127 7.7,127  "
                fill="currentColor"
              />
              <path
                d="M21,87h79.3l20,20h6.7V1H21V87z M29,9h90v85.3L103.7,79H29V9z"
                fill="currentColor"
              />
              <rect height="8" width="58" x="45" y="31" />
              <rect height="8" width="58" x="45" y="49" />
            </g>
          </svg>
          <p>{question_answers.length}</p>
        </div>

        <div className={styles.timeUser}>
          <p className={styles.date}>{timeAgo}</p>
          <p className={styles.user}>
            by: <span>{user_id}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export { QuestionCard };
