import { CategoryCard } from "../../atoms/CategoryCard/CategoryCard";
import styles from "./styles/Statistics.module.css";

type StatisticsProps = {
  questionCount: number;
  answerCount: number;
  userCount: number;
};

const Statistics = ({
  questionCount,
  answerCount,
  userCount,
}: StatisticsProps) => {
  return (
    <>
      <section className={styles.dataContainer}>
        <h3>
          Collaborate with a community of creators who are building the future
          of online conversations
        </h3>

        <div className={styles.statistic}>
          <p>
            <span>{questionCount}</span> Questions
          </p>

          <p>
            <span>{answerCount}</span> Answers
          </p>

          <p>
            <span>{userCount}</span>Users
          </p>
        </div>
      </section>

      <section className={styles.categoriesContainer}>
        <h4>Categories</h4>

        <div className={styles.categoryWrapper}>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </section>
    </>
  );
};

export { Statistics };
