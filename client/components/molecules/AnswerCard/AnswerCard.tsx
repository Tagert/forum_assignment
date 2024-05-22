import styles from "./styles/AnswerCard.module.css";
import { calcTimeDifference } from "../../../utils/calc_time_difference";

type AnswerCardProps = {
  answer_id: string;
  text: string;
  date: Date;
  answer_votes: number;
  userName: string;
};

const AnswerCard = ({
  answer_id,
  text,
  date,
  answer_votes,
  userName,
}: AnswerCardProps) => {
  const timeAgo = calcTimeDifference(date);
  return (
    <div className={styles.container}>
      <div className={styles.answersHolder}>
        <div className={styles.counterBox}>
          <p>{timeAgo}</p>
          <p>{userName} answers</p>
        </div>

        <p>{text}</p>

        <div className={styles.border}></div>
      </div>
    </div>
  );
};

export { AnswerCard };
