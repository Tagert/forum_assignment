import styles from "./styles/QuestionSide.module.css";
import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { UserType } from "../../../types/user.type";
import { calcTimeDifference } from "../../../utils/calc_time_difference";
import { QuestionDeleteIcon } from "../../atoms/svg/QuestionDeleteIcon/QuestionDeleteIcon";
import { QuestionEditIcon } from "../../atoms/svg/QuestionEditIcon/QuestionEditIcon";
import { QuestionSubmitIcon } from "../../atoms/svg/QuestionSubmitIcon/QuestionSubmitIcon";
import { QuestionCancelIcon } from "../../atoms/svg/QuestionCancelIcon/QuestionCancelIcon";
import { VoteButton } from "../../atoms/VoteButton/VoteButton";

type QuestionSideProps = {
  title: string;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  text: string;
  editedText: string;
  setEditedText: (text: string) => void;
  date: Date;
  vote: number;
  answersCount: number;
  viewsCount: number;
  userName: string;
  user_id: string;
  loggedUser: UserType | null;
  questionDelete: () => {};
  questionEdit: () => {};
  isEditing: boolean;
  setIsEditing: (status: boolean) => void;
  handleQuestionVote: (voteType: "upvote" | "downvote") => void;
};

const QuestionSide = ({
  title,
  editedTitle,
  setEditedTitle,
  text,
  editedText,
  setEditedText,
  date,
  vote,
  answersCount,
  viewsCount,
  userName,
  user_id,
  loggedUser,
  questionDelete,
  questionEdit,
  isEditing,
  setIsEditing,
  handleQuestionVote,
}: QuestionSideProps) => {
  const timeAgo = calcTimeDifference(date);

  const titleInputRef = useRef<HTMLTextAreaElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const [titleHeight, setTitleHeight] = useState<number | undefined>(undefined);
  const [textAreaHeight, setTextAreaHeight] = useState<number | undefined>(
    undefined
  );

  const [originalTitle, setOriginalTitle] = useState(title);
  const [originalText, setOriginalText] = useState(text);

  useEffect(() => {
    setOriginalTitle(title);
    setOriginalText(text);
    setEditedTitle(title);
    setEditedText(text);
  }, [title, text]);

  useLayoutEffect(() => {
    if (isEditing) {
      if (titleInputRef.current) {
        resizeInput(titleInputRef.current);
      }
      if (textAreaRef.current) {
        resizeTextarea(textAreaRef.current);
      }
    }
  }, [isEditing, editedTitle, editedText]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        titleInputRef.current &&
        !titleInputRef.current.contains(e.target as Node) &&
        textAreaRef.current &&
        !textAreaRef.current.contains(e.target as Node) &&
        cancelBtnRef.current &&
        !cancelBtnRef.current.contains(e.target as Node) &&
        submitBtnRef.current &&
        !submitBtnRef.current.contains(e.target as Node)
      ) {
        handleEdit();
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
  }, [isEditing, editedTitle, editedText]);

  const handleEdit = () => {
    setIsEditing(false);
    questionEdit();
  };

  const handleCancel = () => {
    setEditedTitle(originalTitle);
    setEditedText(originalText);
    setIsEditing(false);
  };

  const resizeInput = (input: HTMLTextAreaElement) => {
    const newHeight = `${input.scrollHeight}px`;
    setTitleHeight(input.scrollHeight);
    input.style.height = newHeight;
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
      handleEdit();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionTitle}>
        <div className={styles.title}>
          <div className={styles.type}>
            <div className={styles.questionBox}>
              <div className={styles.nameBox}>
                <h2>Question</h2>
              </div>

              {loggedUser && loggedUser.user_id === user_id && (
                <div className={styles.modifyQuestion}>
                  {!isEditing ? (
                    <div className={styles.editBtnContainer}>
                      <button
                        ref={editBtnRef}
                        className={styles.editBtn}
                        onClick={() => setIsEditing(true)}
                      >
                        <QuestionEditIcon />
                      </button>

                      <span className={styles.tooltip}>Edit</span>
                    </div>
                  ) : (
                    <div className={styles.actionBox}>
                      <button
                        ref={cancelBtnRef}
                        className={styles.cancelBtn}
                        onClick={handleCancel}
                      >
                        <QuestionCancelIcon />
                      </button>

                      <button
                        ref={submitBtnRef}
                        className={styles.submitBtn}
                        onClick={handleEdit}
                      >
                        <QuestionSubmitIcon />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {loggedUser && loggedUser.user_id === user_id && (
              <div className={styles.deleteQuestion}>
                <div className={styles.deleteBtnContainer}>
                  <button onClick={questionDelete}>
                    <QuestionDeleteIcon />
                  </button>

                  <span className={styles.tooltip}>Delete</span>
                </div>
              </div>
            )}
          </div>

          {!isEditing ? (
            <h3>{title}</h3>
          ) : (
            <div
              className={styles.inputContainer}
              style={{ height: titleHeight ? `${titleHeight}px` : "auto" }}
            >
              <textarea
                name="title"
                rows={1}
                ref={titleInputRef}
                className={styles.titleInput}
                value={editedTitle}
                onChange={(e) => {
                  setEditedTitle(e.target.value);
                  resizeInput(e.target);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
        </div>

        <div className={styles.counterBox}>
          <p>{timeAgo}</p>
          <p>{answersCount} answers</p>
          <p>{viewsCount} views</p>

          <div className={styles.border}></div>
        </div>
      </div>

      <div className={styles.questionText}>
        <VoteButton vote={vote} handleQuestionVote={handleQuestionVote} />

        <div className={styles.textBox}>
          <h5>
            by <span>{userName}</span>
          </h5>

          {!isEditing ? (
            <p>{text}</p>
          ) : (
            <div
              className={styles.textAreaContainer}
              style={{
                height: textAreaHeight ? `${textAreaHeight}px` : "auto",
              }}
            >
              <textarea
                name="text"
                rows={1}
                ref={textAreaRef}
                className={styles.textArea}
                value={editedText}
                onChange={(e) => {
                  setEditedText(e.target.value);
                  resizeTextarea(e.target);
                }}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { QuestionSide };
