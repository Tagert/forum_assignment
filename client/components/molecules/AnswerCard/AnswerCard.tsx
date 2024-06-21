import styles from "./styles/AnswerCard.module.css";
import axios from "axios";
import cookies from "js-cookie";
import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { calcTimeDifference } from "../../../utils/calc_time_difference";
import { UserType } from "../../../types/user.type";
import { AnswerDeleteIcon } from "../../atoms/svg/AnswerDeleteIcon/AnswerDeleteIcon";
import { AnswerEditIcon } from "../../atoms/svg/AnswerEditIcon/AnswerEditIcon";
import { AnswerCancelIcon } from "../../atoms/svg/AnswerCancelIcon/AnswerCancelIcon";
import { AnswerSubmitIcon } from "../../atoms/svg/AnswerSubmitIcon/AnswerSubmitIcon";
import { VoteButton } from "../../atoms/VoteButton/VoteButton";
import { useAutoSizeTextArea } from "../../../hooks/useAutoSizeTextArea";

type AnswerCardProps = {
  answer_id: string;
  text: string;
  date: Date;
  vote: number;
  userName: string;
  user_id: string;
  loggedUser: UserType | null;
  answerDelete: (answer_id: string) => void;
  handleAnswerVote: (answerId: string, voteType: "upvote" | "downvote") => void;
  className?: string;
  editedText: string;
  setEditedText: (text: string) => void;
  startEditing: () => void;
  cancelEditing: () => void;
  submitEdit: () => void;
};

const AnswerCard = ({
  answer_id,
  text,
  date,
  vote,
  userName,
  user_id,
  loggedUser,
  answerDelete,
  handleAnswerVote,
  className,
  editedText,
  setEditedText,
  startEditing,
  cancelEditing,
  submitEdit,
}: AnswerCardProps) => {
  const router = useRouter();
  const timeAgo = calcTimeDifference(date);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const [textAreaHeight, setTextAreaHeight] = useState<number | undefined>(
    undefined
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (isEditing) {
      if (textAreaRef.current) {
        resizeTextarea(textAreaRef.current);
      }
    }
  }, [isEditing, editedText]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        textAreaRef.current &&
        !textAreaRef.current.contains(e.target as Node) &&
        cancelBtnRef.current &&
        !cancelBtnRef.current.contains(e.target as Node) &&
        submitBtnRef.current &&
        !submitBtnRef.current.contains(e.target as Node)
      ) {
        handleSubmitAnswer();
        // setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, editedText]);

  const handleStartEditing = () => {
    startEditing();
    setIsEditing(true);
  };

  const handleSubmitAnswer = () => {
    submitEdit();
    setIsEditing(false);
  };

  const handleCancelEditingAnswer = () => {
    cancelEditing();
    setIsEditing(false);
  };

  const resizeTextarea = (textarea: HTMLTextAreaElement) => {
    const newHeight = `${textarea.scrollHeight}px`;
    setTextAreaHeight(textarea.scrollHeight);
    textarea.style.height = newHeight;
  };

  const handleKeyDown = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAnswer();
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.answersContainer}>
        <div className={styles.counterBox}>
          <div className={styles.editBox}>
            <div className={styles.type}>
              <h2>Answer</h2>
            </div>

            {loggedUser && loggedUser.user_id === user_id && (
              <div className={styles.modifyAnswer}>
                {!isEditing ? (
                  <div className={styles.editBtnContainer}>
                    <button
                      ref={editBtnRef}
                      className={styles.editBtn}
                      onClick={handleStartEditing}
                    >
                      <AnswerEditIcon />
                    </button>

                    <span className={styles.tooltip}>Edit</span>
                  </div>
                ) : (
                  <div className={styles.actionBox}>
                    <button
                      ref={cancelBtnRef}
                      className={styles.cancelBtn}
                      onClick={handleCancelEditingAnswer}
                    >
                      <AnswerCancelIcon />
                    </button>

                    <button
                      ref={submitBtnRef}
                      className={styles.submitBtn}
                      onClick={handleSubmitAnswer}
                    >
                      <AnswerSubmitIcon />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.border}></div>

          <div className={styles.deleteAnswer}>
            <p>{timeAgo}</p>
            {loggedUser && loggedUser.user_id === user_id && (
              <div className={styles.deleteBtnContainer}>
                <button onClick={() => answerDelete(answer_id)}>
                  <AnswerDeleteIcon />

                  <span className={styles.tooltip}>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.answerText}>
          <div className={styles.textBox}>
            {!isEditing ? (
              <p>{text}</p>
            ) : (
              <textarea
                name="text"
                rows={1}
                ref={textAreaRef}
                value={editedText}
                className={styles.textArea}
                onChange={(e) => {
                  setEditedText(e.target.value);
                  resizeTextarea(e.target);
                }}
                onKeyDown={handleKeyDown}
              />
            )}

            <h5>
              by <span>{userName}</span>
            </h5>
          </div>

          <VoteButton
            vote={vote}
            handleAnswerVote={handleAnswerVote}
            answer_id={answer_id}
          />
        </div>
      </div>
    </div>
  );
};

export { AnswerCard };
