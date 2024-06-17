import styles from "./styles/Statistics.module.css"
import { useState } from "react"
import askQuestionIcon from "../../../public/assets/ask-question_icon.svg"
import smallBusinessIcon from "../../../public/assets/small-business_icon.svg"
import checkedBoxOIcon from "../../../public/assets/checked-checkbox_icon.svg"
import messageIcon from "../../../public/assets/message_icon.svg"
import { CategoryCard } from "../../atoms/CategoryCard/CategoryCard"

type StatisticsProps = {
  questionCount: number
  answerCount: number
  userCount: number
  onCategoryClick: (category: string) => void
}

const Statistics = ({
  questionCount,
  answerCount,
  userCount,
  onCategoryClick,
}: StatisticsProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  )

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
    onCategoryClick(category)
  }

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
            imgSrc={askQuestionIcon}
            onClick={handleCategoryClick}
            isSelected={selectedCategories.has("Ask the Community")}
          />

          <CategoryCard
            type={"MarketPlace"}
            imgSrc={smallBusinessIcon}
            onClick={handleCategoryClick}
            isSelected={selectedCategories.has("MarketPlace")}
          />

          <CategoryCard
            type={"Off-Topic"}
            imgSrc={"/assets/message_icon.svg"}
            onClick={handleCategoryClick}
            isSelected={selectedCategories.has("Off-Topic")}
          />

          <CategoryCard
            type={"Suggestion Box"}
            imgSrc={checkedBoxOIcon}
            onClick={handleCategoryClick}
            isSelected={selectedCategories.has("Suggestion Box")}
          />
        </div>
      </section>
    </>
  )
}

export { Statistics }
