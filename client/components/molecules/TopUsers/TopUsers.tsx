import styles from "./styles/TopUsers.module.css";
import { UserType } from "../../../types/user.type";
import { AnswerType } from "../../../types/answer.type";
import { Spinner } from "../../atoms/Spinner/Spinner";

type TopUserProps = {
  users: UserType[] | null;
  answers: AnswerType[] | null;
};

const TopUsers = ({ users, answers }: TopUserProps) => {
  if (!users || !answers) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const userAnswerCounts: { [key: string]: number } = {};
  answers.forEach((answer) => {
    if (userAnswerCounts[answer.user_id]) {
      userAnswerCounts[answer.user_id]++;
    } else {
      userAnswerCounts[answer.user_id] = 1;
    }
  });

  const usersWithAnswerCounts = users.map((user) => ({
    ...user,
    answerCount: userAnswerCounts[user.user_id] || 0,
  }));

  const topUsers = usersWithAnswerCounts
    .sort((a, b) => b.answerCount - a.answerCount)
    .slice(0, 5);

  return (
    <div className={styles.container}>
      <h2>Top 5 most active Users</h2>
      <ol>
        {topUsers.map((user) => (
          <li key={user.user_id}>
            <p className={styles.userName}>{user.name}</p>
            <span className={styles.answerCount}>
              {user.answerCount} answers
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export { TopUsers };
