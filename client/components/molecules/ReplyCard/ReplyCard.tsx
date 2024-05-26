import styles from "./styles/ReplyCard.module.css";
import React, { useState } from "react";
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

  const [errorMessage, setErrorMessage] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!loggedUser) {
      router.push("/login");
    } else {
      setAnswerText(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (answerText.length >= 15) {
      onClick();
    } else {
      setErrorMessage("Your answer must be at least 15 characters long.");
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

        <div className={styles.submitBox}>
          <Button
            isLoading={false}
            onClick={handleSubmit}
            title="Send"
            className={styles.replyBtn}
          />

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { ReplyCard };
