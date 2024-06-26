import styles from "./styles/QuestionWrapper.module.css";
import axios from "axios";
import cookies from "js-cookie";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { UserType } from "../../../types/user.type";
import { AnswerType } from "../../../types/answer.type";
import { QuestionType } from "../../../types/question.type";
import { Button } from "../../atoms/Button/Button";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { InsertModal } from "../../molecules/InsertModal/InsertModal";
import { QuestionCard } from "../../molecules/QuestionCard/QuestionCard";
import { TopUsers } from "../../molecules/TopUsers/TopUsers";

type QuestionWrapperProps = {
  questions: QuestionType[] | null;
  answers: AnswerType[] | null;
  users: UserType[] | null;
  fetchQuestions: () => void;
  isJwtActive: boolean;
  selectedCategories: string[];
};

const QuestionWrapper = ({
  questions,
  answers,
  users,
  fetchQuestions,
  isJwtActive,
  selectedCategories,
}: QuestionWrapperProps) => {
  const router = useRouter();

  const [sortBy, setSortBy] = useState<string>("vote");

  const [isModalUp, setModalUp] = useState(false);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<
    "Ask the Community" | "MarketPlace" | "Off-Topic" | "Suggestion Box" | ""
  >("");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const sortQuestions = (questions: QuestionType[], sortBy: string) => {
    switch (sortBy) {
      case "vote":
        return questions.sort((a, b) => b.votesCounter - a.votesCounter);
      case "answered":
        return questions.sort(
          (a, b) => b.question_answers.length - a.question_answers.length
        );
      case "unanswered":
        return questions.sort(
          (a, b) => a.question_answers.length - b.question_answers.length
        );
      default:
        return questions;
    }
  };

  const sortedQuestions = sortQuestions(questions || [], sortBy);

  const filteredQuestions =
    selectedCategories.length > 0
      ? sortedQuestions.filter((question) =>
          selectedCategories.includes(question.category)
        )
      : sortedQuestions;

  const insertQuestion = async () => {
    try {
      const newQuestion = {
        title: title,
        text: text,
        category: category,
      };

      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const res = await axios.post(
        `${process.env.SERVER_URL}/questions`,
        newQuestion,
        {
          headers,
        }
      );

      if (res.status === 201) {
        fetchQuestions();
        setModalUp(false);
        setTitle("");
        setText("");
        setCategory("");
      }
    } catch (err) {
      console.error("err:", err);
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  const handleAskQuestion = async () => {
    if (isJwtActive) {
      setModalUp(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <section id="questionWrapper" className={styles.container}>
      <div className={styles.questionsContainer}>
        <div className={styles.insertQuestion}>
          <h4>Popular Questions:</h4>
          <div className={styles.actionBox}>
            <select name="sort" value={sortBy} onChange={handleSortChange}>
              <option value="vote">Vote</option>
              <option value="answered">Answered</option>
              <option value="unanswered">Unanswered</option>
            </select>

            <Button
              isLoading={false}
              onClick={handleAskQuestion}
              title="Ask a Question"
              className={styles.insertBtn}
            />
          </div>

          {isModalUp && (
            <InsertModal
              message="Ask a question, start a discussion or share an idea."
              onCancel={() => setModalUp(false)}
              onConfirm={insertQuestion}
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              category={category}
              setCategory={setCategory}
            />
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.questionsHolder}>
            {questions ? (
              filteredQuestions.map((question) => {
                const user = users?.find(
                  (user) => user.user_id === question.user_id
                );
                const userName = user ? user.name : "Unknown";

                return (
                  <QuestionCard
                    key={question.question_id}
                    question_id={question.question_id}
                    date={question.date}
                    user_id={userName}
                    title={question.title}
                    category={question.category}
                    question_answers={question.question_answers}
                    question_votes={question.votesCounter}
                  />
                );
              })
            ) : (
              <Spinner />
            )}
          </div>

          <TopUsers users={users} answers={answers} />
        </div>
      </div>
    </section>
  );
};

export { QuestionWrapper };
