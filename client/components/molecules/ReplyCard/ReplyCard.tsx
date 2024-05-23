import styles from "./styles/ReplyCard.module.css";
import { Button } from "../../atoms/Button/Button";

type ReplyCardProps = {
  answerText: string;
  setAnswerText: (text: string) => void;
  onClick: () => void;
};

const ReplyCard = ({ answerText, setAnswerText, onClick }: ReplyCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.replyContainer}>
        <textarea
          name="reply"
          placeholder="Add as many details as possible, by providing details you'll make it easier for other to reply"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        ></textarea>
        <Button
          isLoading={false}
          onClick={onClick}
          title="Send"
          className={styles.replyBtn}
        />
      </div>
    </div>
  );
};

export { ReplyCard };
