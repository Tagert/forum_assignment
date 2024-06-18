import styles from "./styles/QuestionSide.module.css";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import { UserType } from "../../../types/user.type";
import { calcTimeDifference } from "../../../utils/calc_time_difference";
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

  const titleInputRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
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
    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditing]);

  const resizeInput = (input: HTMLInputElement) => {
    input.style.width = "0px";
    input.style.width = `${input.scrollWidth}px`;
  };

  const resizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleEdit = () => {
    setIsEditing(false);
    questionEdit();

    console.log("Title:", editedTitle, "Text:", editedText);
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

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      (!target.closest(`.${styles.titleInput}`) &&
        !target.closest(`.${styles.inputContainer}`)) ||
      (!target.closest(`.${styles.textArea}`) &&
        !target.closest(`.${styles.inputContainer}`))
    ) {
      setIsEditing(true);
    } else {
      handleEdit();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionTitle}>
        <div className={styles.title}>
          <div className={styles.type}>
            <h2>Question</h2>

            {loggedUser && loggedUser.user_id === user_id && (
              <div className={styles.modifyQuestion}>
                {!isEditing && (
                  <button
                    className={styles.editBtn}
                    onClick={() => setIsEditing(true)}
                  >
                    <svg
                      enableBackground="new 0 0 32 32"
                      height="32px"
                      id="svg2"
                      version="1.1"
                      viewBox="0 0 32 32"
                      width="32px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="background">
                        <rect fill="none" height="32" width="32" />
                      </g>
                      <g id="document_x5F_sans_x5F_edit">
                        <path
                          d="M32,23c-0.002-4.634-3.501-8.444-8-8.941V5.584L18.414,0H0v32h24v-0.059C28.499,31.441,31.998,27.633,32,23z M17.998,2.413   L21.586,6h-3.588V2.413z M2,30V1.998h14v6.001h6v6.06c-4.501,0.498-8,4.308-8,8.941c0,2.829,1.308,5.351,3.349,7H2z M23,29.883   c-3.801-0.009-6.876-3.084-6.885-6.883c0.009-3.801,3.084-6.876,6.885-6.885c3.799,0.009,6.874,3.084,6.883,6.885   C29.874,26.799,26.799,29.874,23,29.883z"
                          fill="currentColor"
                        />
                        <rect
                          height="4.243"
                          transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 56.5269 20.5858)"
                          width="7.071"
                          x="20.464"
                          y="19.879"
                        />
                        <polygon points="22,27 19,27 19,24  " />
                      </g>
                    </svg>
                  </button>
                )}

                <button onClick={questionDelete}>
                  <svg
                    enableBackground="new 0 0 32 32"
                    height="32px"
                    id="svg2"
                    version="1.1"
                    viewBox="0 0 32 32"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="background">
                      <rect fill="none" height="32" width="32" />
                    </g>
                    <g id="document_x5F_text_x5F_remove">
                      <path
                        d="M24,14.059V5.584L18.414,0H0v32h24v-0.059c4.499-0.5,7.998-4.309,8-8.941C31.998,18.366,28.499,14.556,24,14.059z    M17.998,2.413L21.586,6h-3.588V2.413z M2,30V1.998h14v6.001h6v6.06c-1.752,0.194-3.352,0.89-4.652,1.941H4v2h11.517   c-0.412,0.616-0.743,1.289-0.994,2H4v2h10.059C14.022,22.329,14,22.661,14,23c0,2.829,1.308,5.351,3.349,7H2z M23,29.883   c-3.801-0.009-6.876-3.084-6.884-6.883c0.008-3.801,3.083-6.876,6.884-6.885c3.799,0.009,6.874,3.084,6.883,6.885   C29.874,26.799,26.799,29.874,23,29.883z M20,12H4v2h16V12z"
                        fill="currentColor"
                      />
                      <g>
                        <rect height="2" width="10" x="18" y="22" />
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {!isEditing ? (
            <h3>{title}</h3>
          ) : (
            <div className={styles.inputContainer}>
              <input
                ref={titleInputRef}
                className={styles.titleInput}
                value={editedTitle}
                onChange={(e) => {
                  setEditedTitle(e.target.value);
                  resizeInput(e.target);
                }}
                onKeyDown={handleKeyDown}
                autoFocus
                // onBlur={handleEdit}
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
            <div className={styles.inputContainer}>
              <textarea
                ref={textAreaRef}
                className={styles.textArea}
                value={editedText}
                onChange={(e) => {
                  setEditedText(e.target.value);
                  resizeTextarea(e.target);
                }}
                onKeyDown={handleKeyDown}
                autoFocus
                // onBlur={handleEdit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { QuestionSide };
