import styles from "./styles/AnswerCard.module.css";
import { calcTimeDifference } from "../../../utils/calc_time_difference";
import { UserType } from "../../../types/user.type";
import { VoteButton } from "../../atoms/VoteButton/VoteButton";
import { AnswerDeleteIcon } from "../../atoms/svg/AnswerDeleteIcon/AnswerDeleteIcon";

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

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.answersContainer}>
        <div className={styles.counterBox}>
          <div className={styles.removeBox}>
            <p className={styles.type}>Answer</p>

            {loggedUser && loggedUser.user_id === user_id && (
              <div className={styles.modifyAnswer}>
                <button onClick={() => answerDelete(answer_id)}>
                  <AnswerDeleteIcon />
                  {/* <svg
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
                  </svg> */}
                </button>

                <button>
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
                    <g id="comment_x5F_edit">
                      <path
                        d="M26,8H8v2h18V8z M26,12H8v2h15h3V12z M30,17.35V2H2l0,28h2.414l6.002-6h3.643c0.498,4.498,4.309,7.998,8.941,8   c4.97-0.002,8.998-4.03,9-9C31.999,20.858,31.248,18.895,30,17.35z M14.059,22H9.584L4,27.583V4h24v11.518   C26.569,14.561,24.851,14,23,14c-2.143,0-4.106,0.751-5.652,2H8v2h7.517C14.734,19.169,14.221,20.531,14.059,22z M23,29.882   c-3.801-0.008-6.876-3.083-6.885-6.882c0.009-3.801,3.084-6.876,6.885-6.885c3.799,0.009,6.874,3.084,6.882,6.885   C29.874,26.799,26.799,29.874,23,29.882z"
                        fill="currentColor"
                      />
                      <polygon points="22,27 19,27 19,24  " />
                      <rect
                        height="4.243"
                        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 56.5269 20.5858)"
                        width="7.071"
                        x="20.464"
                        y="19.879"
                      />
                    </g>
                  </svg>
                </button>
              </div>
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
