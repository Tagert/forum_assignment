import styles from "./styles/VoteButton.module.css";

type VoteButtonProps = {
  vote: number;
  handleAnswerVote?: (
    answerId: string,
    voteType: "upvote" | "downvote"
  ) => void;
  handleQuestionVote?: (voteType: "upvote" | "downvote") => void;
  answer_id?: string;
};

const VoteButton = ({
  vote,
  handleAnswerVote,
  handleQuestionVote,
  answer_id,
}: VoteButtonProps) => {
  const handleVote = (voteType: "upvote" | "downvote") => {
    if (handleAnswerVote && answer_id) {
      handleAnswerVote(answer_id, voteType);
    } else if (handleQuestionVote) {
      handleQuestionVote(voteType);
    }
  };

  return (
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
  );
};

export { VoteButton };
