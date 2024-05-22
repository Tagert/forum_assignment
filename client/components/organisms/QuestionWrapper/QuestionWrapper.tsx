import styles from "./styles/QuestionWrapper.module.css";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { UserType } from "../../../types/user.type";
import { QuestionType } from "../../../types/question.type";
import { Button } from "../../atoms/Button/Button";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { InsertModal } from "../../molecules/InsertModal/InsertModal";
import { QuestionCard } from "../../molecules/QuestionCard/QuestionCard";

type QuestionWrapperProps = {
  questions: QuestionType[] | null;
  users: UserType[] | null;
  fetchQuestions: () => void;
};

const QuestionWrapper = ({
  questions,
  users,
  fetchQuestions,
}: QuestionWrapperProps) => {
  const router = useRouter();

  const [isModalUp, setModalUp] = useState(false);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

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

  const isAuthenticated = async () => {
    const token = cookies.get("jwt_token");

    if (!token) {
      return false;
    }

    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/verify_token`,
        { jwt_token: token }
      );

      return response.status === 200;
    } catch (err) {
      console.error("Token verification failed:", err);
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
      return false;
    }
  };

  const handleAskQuestion = async () => {
    if (await isAuthenticated()) {
      setModalUp(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.questionHolder}>
        <div className={styles.insertQuestion}>
          <h4>Popular Questions:</h4>
          <Button
            isLoading={false}
            onClick={handleAskQuestion}
            title="Ask a Question"
            className={styles.insertBtn}
          />

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

        {questions ? (
          questions.map((question) => {
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
                question_votes={question.question_votes}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
};

export { QuestionWrapper };
