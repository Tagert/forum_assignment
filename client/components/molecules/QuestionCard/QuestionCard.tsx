import styles from "./styles/QuestionCard.module.css";
import Link from "next/link";
import axios from "axios";
import cookies from "js-cookie";
import { AnswerType } from "../../../types/answer.type";
import { calcTimeDifference } from "../../../utils/calc_time_difference";
import { getTypeClass } from "../../..//utils/get_type_class";

type QuestionProps = {
  question_id: string;
  date: Date;
  user_id: string;
  title: string;
  category:
    | "Ask the Community"
    | "MarketPlace"
    | "Off-Topic"
    | "Suggestion Box";
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
  const typeClass = getTypeClass(category);

  return (
    <Link href={`/question/${question_id}`} className={styles.linkHolder}>
      <div className={styles.container}>
        <div>
          <p className={styles.votes}>
            Votes:
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.498 15.5H3.5V20.5H20.498V15.5ZM21.9445 14.4719L21.9661 14.5337L21.9892 14.6345L21.9981 14.7331V21.25C21.9981 21.6297 21.7159 21.9435 21.3499 21.9932L21.2481 22H2.75C2.3703 22 2.05651 21.7179 2.00685 21.3518L2 21.25V14.7506L2.00184 14.6977L2.01271 14.6122C2.02285 14.5584 2.03841 14.5072 2.05894 14.4587L4.81824 8.44004C4.92517 8.20681 5.14245 8.04683 5.39153 8.01048L5.5 8.00261L8.03982 8.00184L7.25089 9.37208L7.18282 9.50184L5.981 9.50201L3.918 13.9998H20.07L18.0428 9.65384L18.9052 8.15654C18.9718 8.2074 19.0301 8.26958 19.0771 8.34111L19.1297 8.43554L21.9445 14.4719ZM13.3652 2.05566L13.4566 2.10063L18.6447 5.10376C18.9729 5.29373 19.1033 5.69522 18.9636 6.0373L18.9187 6.12891L16.112 11.001L17.25 11.0016C17.6642 11.0016 18 11.3374 18 11.7516C18 12.1313 17.7178 12.4451 17.3518 12.4948L17.25 12.5016L15.248 12.501L15.2471 12.504H11.1691L11.166 12.501L6.75 12.5016C6.33579 12.5016 6 12.1658 6 11.7516C6 11.3719 6.28215 11.0581 6.64823 11.0085L6.75 11.0016L8.573 11.001L8.39145 10.8963C8.06327 10.7063 7.93285 10.3048 8.0726 9.96273L8.11747 9.87111L12.4341 2.37537C12.6235 2.04634 13.024 1.91558 13.3652 2.05566ZM13.3559 3.7753L9.78781 9.9712L11.566 11.001H14.383L17.248 6.02819L13.3559 3.7753Z"
                fill="#212121"
              />
            </svg>
            <span>{question_votes}</span>
          </p>
        </div>

        <div className={styles.questionDescription}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.category}>
            <span
              className={`${styles.categoryBackground} ${typeClass}`}
            ></span>
            <p>{category}</p>
          </div>
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
            by:
            <span>{user_id}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export { QuestionCard };
