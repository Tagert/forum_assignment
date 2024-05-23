import styles from "./styles/QuestionSide.module.css";
import { calcTimeDifference } from "../../../utils/calc_time_difference";

type QuestionSideProps = {
  title: string;
  text: string;
  date: Date;
  vote: number;
  answersCount: number;
  viewsCount: number;
  userName: string;
  questionDelete: () => {};
};

const QuestionSide = ({
  title,
  text,
  date,
  vote,
  answersCount,
  viewsCount,
  userName,
  questionDelete,
}: QuestionSideProps) => {
  const timeAgo = calcTimeDifference(date);

  return (
    <div className={styles.container}>
      <div className={styles.questionTitle}>
        <div className={styles.title}>
          <div className={styles.type}>
            <h2>Question</h2>

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
          <h3>{title}</h3>
        </div>

        <div className={styles.counterBox}>
          <p>{timeAgo}</p>
          <p>{answersCount} answers</p>
          <p>{viewsCount} views</p>

          <div className={styles.border}></div>
        </div>
      </div>

      <div className={styles.questionText}>
        <div className={styles.voteHolder}>
          <div className={styles.upVoteBox}>
            <button>
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
            <button>
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

        <div className={styles.textBox}>
          <h5>
            by <span>{userName}</span>
          </h5>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export { QuestionSide };
