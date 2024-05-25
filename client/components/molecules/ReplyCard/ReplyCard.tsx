import styles from "./styles/ReplyCard.module.css";
import React from "react";
import { useRouter } from "next/router";
import { Button } from "../../atoms/Button/Button";
import { UserType } from "../../../types/user.type";

type ReplyCardProps = {
  answerText: string;
  setAnswerText: (text: string) => void;
  onClick: () => void;
  loggedUser: UserType | null;
};

const ReplyCard = ({
  answerText,
  setAnswerText,
  onClick,
  loggedUser,
}: ReplyCardProps) => {
  const router = useRouter();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!loggedUser) {
      router.push("/login");
    } else {
      setAnswerText(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <h5>Your answer</h5>
      <div className={styles.replyContainer}>
        <textarea
          name="reply"
          placeholder="Post your answer here. Include enough information to make the answer self-contained. Answers are not for asking new questions, commenting or saying thanks (cast a vote instead)."
          value={answerText}
          onChange={handleTextChange}
        />
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
