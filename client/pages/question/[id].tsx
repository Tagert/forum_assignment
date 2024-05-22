import styles from "./styles/QuestionPage.module.css";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserType } from "../../types/user.type";
import { AnswerType } from "../../types/answer.type";
import { QuestionType } from "../../types/question.type";
import { Spinner } from "../../components/atoms/Spinner/Spinner";
import { AnswerWrapper } from "../../components/organisms/AnswerWrapper/AnswerWrapper";
import { Navbar } from "../../components/organisms/Navbar/Navbar";

const QuestionPage = () => {
  const router = useRouter();

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[] | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchQuestionAndUserById = async () => {
    console.log("fetchQuestion");

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const questionRes = await axios.get(
        `${process.env.SERVER_URL}/question/${router.query.id}`,
        {
          headers,
        }
      );

      setQuestion(questionRes.data);

      const userRes = await axios.get(
        `${process.env.SERVER_URL}/user/${questionRes.data.user_id}`,
        {
          headers,
        }
      );

      setUser(userRes.data);
      setLoading(true);
    } catch (err) {
      console.error("Error fetching question:", err);
      setLoading(false);
      // @ts-expect-error
      if (err.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  const fetchAnswers = async () => {
    console.log("fetchAnswers");

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const res = await axios.get(
        `${process.env.SERVER_URL}/question/${router.query.id}/answers`,
        {
          headers,
        }
      );

      setAnswers(res.data.answers);
    } catch (err) {
      console.error("Error fetching answers:", err);
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchQuestionAndUserById();
      fetchAnswers();
    }
  }, [router.query.id]);

  return (
    <main className={styles.container}>
      <Navbar />

      {isLoading ? (
        <AnswerWrapper question={question} user={user} answers={answers} />
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default QuestionPage;
