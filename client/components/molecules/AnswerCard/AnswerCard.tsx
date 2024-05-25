import styles from "./styles/AnswerCard.module.css";
import { calcTimeDifference } from "../../../utils/calc_time_difference";
import { UserType } from "../../../types/user.type";

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
}: AnswerCardProps) => {
  const timeAgo = calcTimeDifference(date);

  const handleVote = (voteType: "upvote" | "downvote") => {
    handleAnswerVote(answer_id, voteType);
  };
  console.log(className);
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.answersContainer}>
        <div className={styles.counterBox}>
          <div className={styles.removeBox}>
            <p className={styles.type}>Answer</p>

            {loggedUser && loggedUser.user_id === user_id && (
              <button onClick={() => answerDelete(answer_id)}>
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
                  <g id="comment_x5F_remove_1_">
                    <path
                      d="M26,8H8v2h18V8z M26,12H8v2h15h3V12z M30,17.35V2H2l0,28h2.414l6.002-6h3.643c0.498,4.498,4.309,7.998,8.941,8   c4.97-0.002,8.998-4.03,9-9C31.999,20.858,31.248,18.895,30,17.35z M14.059,22H9.584L4,27.583V4h24v11.518   C26.569,14.56,24.851,14,23,14c-2.143,0-4.106,0.751-5.652,2H8v2h7.517C14.735,19.169,14.221,20.531,14.059,22z M23,29.882   c-3.801-0.008-6.876-3.083-6.884-6.882c0.008-3.801,3.083-6.876,6.884-6.884c3.799,0.008,6.874,3.083,6.882,6.884   C29.874,26.799,26.799,29.874,23,29.882z"
                      fill="currentColor"
                    />
                    <g>
                      <rect height="2" width="10" x="18" y="22" />
                    </g>
                  </g>
                </svg>
              </button>
            )}
          </div>

          <div className={styles.border}></div>

          <p>{timeAgo}</p>
        </div>

        <div className={styles.answerText}>
          <div className={styles.textBox}>
            <p>{text}</p>

            <h5>
              by <span>{userName}</span>
            </h5>
          </div>

          <div className={styles.voteHolder}>
            <div className={styles.upVoteBox}>
              <button onClick={() => handleVote("upvote")}>
                <svg
                  enableBackground="new 0 0 32 32"
                  height="32px"
                  id="1"
                  version="1.1"
                  viewBox="0 0 32 32"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M15.294,0.295L15.294,0.295L15.294,0.295  l-9.991,9.97c-0.66,0.634-0.162,1.748,0.734,1.723h4.976c0,0.004-0.002,0.008-0.002,0.012v19c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1  V12c0-0.004-0.002-0.008-0.002-0.012h4.972c0.892,0.024,1.376-1.082,0.742-1.715l-9.999-9.977  C16.328-0.098,15.688-0.098,15.294,0.295z M23.574,9.983H19.01V10v1v0.988h0.002c0,0.004-0.002,0.008-0.002,0.012v1v17h-6V13v-1  c0-0.004-0.002-0.008-0.002-0.012h0.002V11v-1V9.983H8.442l7.566-7.55L23.574,9.983z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Arrow_Up"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.middleVoteBox}>
              <p>{vote}</p>
            </div>

            <div className={styles.downVoteBox}>
              <button onClick={() => handleVote("downvote")}>
                <svg
                  enableBackground="new 0 0 32 32"
                  height="32px"
                  id="1"
                  version="1.1"
                  viewBox="0 0 32 32"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.716,31.705L16.716,31.705L16.716,31.705  l9.991-9.97c0.66-0.634,0.162-1.748-0.734-1.723h-4.976C20.998,20.008,21,20.004,21,20V1c0-0.55-0.45-1-1-1l-8,0c-0.55,0-1,0.45-1,1  v19c0,0.004,0.002,0.008,0.002,0.012H6.031c-0.892-0.024-1.376,1.082-0.742,1.715l9.999,9.977  C15.682,32.098,16.322,32.098,16.716,31.705z M8.436,22.017H13V22v-1v-0.988h-0.002C12.998,20.008,13,20.004,13,20v-1V2h6v17v1  c0,0.004,0.002,0.008,0.002,0.012H19V21v1v0.017h4.568l-7.566,7.55L8.436,22.017z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Arrow_Down"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnswerCard };
