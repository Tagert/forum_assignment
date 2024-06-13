import styles from "./styles/Statistics.module.css";
import { useState } from "react";
import { CategoryCard } from "../../atoms/CategoryCard/CategoryCard";

type StatisticsProps = {
  questionCount: number;
  answerCount: number;
  userCount: number;
  onCategoryClick: (category: string) => void;
};

const Statistics = ({
  questionCount,
  answerCount,
  userCount,
  onCategoryClick,
}: StatisticsProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
    onCategoryClick(category);
  };

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
          <CategoryCard
            type={"Ask the Community"}
            imgSrc={"https://cdn.coda.io/icons/svg/color/ask-question.svg"}
            onClick={handleCategoryClick}
            isSelected={selectedCategories.has("Ask the Community")}
          />

          <CategoryCard
            type={"MarketPlace"}
            imgSrc={"https://cdn.coda.io/icons/svg/color/small-business.svg"}
            onClick={handleCategoryClick}
            isSelected={selectedCategories.has("MarketPlace")}
          />

          <CategoryCard
            type={"Suggestion Box"}
            imgSrc={"https://cdn.coda.io/icons/svg/color/checked-checkbox.svg"}
            onClick={handleCategoryClick}
            isSelected={selectedCategories.has("Suggestion Box")}
          />

          <CategoryCard
            type={"Off-Topic"}
            imgSrc={"https://cdn.coda.io/icons/svg/color/sms.svg"}
            onClick={handleCategoryClick}
            isSelected={selectedCategories.has("Off-Topic")}
          />
        </div>
      </section>
    </>
  );
};

export { Statistics };
