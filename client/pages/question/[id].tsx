import styles from "./styles/QuestionPage.module.css";
import axios from "axios";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
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
  const [answerText, setAnswerText] = useState<string>("");
  const [loggedUser, setLoggedUser] = useState<UserType | null>(null);
  const [isJwtActive, setJwtActive] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchLoggedInUser = async (userId: string) => {
    console.log("fetchLoggedInUser");

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const res = await axios.get(`${process.env.SERVER_URL}/user/${userId}`, {
        headers,
      });

      setLoggedUser(res.data);
    } catch (err) {
      console.error("Error fetching logged-in user:", err);

      // @ts-expect-error
      if (err.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  const fetchVerifyToken = async () => {
    console.log("fetchVerifyToken");

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const res = await axios.get(`${process.env.SERVER_URL}/verify_token`, {
        headers,
      });

      setJwtActive(true);
      // setLoggedUser(res.data);
    } catch (err) {
      console.error("Error fetching logged-in user:", err);

      // @ts-expect-error
      if (err.response?.status === 401) {
        setJwtActive(false);
      }
    }
  };

  const fetchQuestionById = async () => {
    console.log("fetchQuestionById");

    try {
      // const headers = {
      //   authorization: cookies.get("jwt_token"),
      // };
      fetchVerifyToken();

      const questionRes = await axios.get(
        `${process.env.SERVER_URL}/question/${router.query.id}`
        // {
        //   headers,
        // }
      );

      setQuestion(questionRes.data);
    } catch (err) {
      console.error("Error fetching question:", err);
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

      const answerRes = await axios.get(
        `${process.env.SERVER_URL}/question/${router.query.id}/answers`,
        {
          headers,
        }
      );

      setAnswers(answerRes.data.answers);
    } catch (err) {
      console.error("Error fetching answers:", err);

      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  const insertAnswer = async (answerText: string) => {
    console.log("InsertAnswer");

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const res = await axios.post(
        `${process.env.SERVER_URL}/question/${router.query.id}/answers`,
        { text: answerText },
        {
          headers,
        }
      );

      // setAnswers(res.data.answers);

      if (res.status === 201) {
        setAnswers((prevAnswers) =>
          prevAnswers ? [...prevAnswers, res.data] : [res.data]
        );
        fetchQuestionById();
        fetchAnswers();
      }
    } catch (err) {
      console.error("Error fetching answers:", err);
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  const handleInsertAnswer = () => {
    insertAnswer(answerText);
    setAnswerText("");
  };

  const handleQuestionVote = async (voteType: "upvote" | "downvote") => {
    console.log("handleQuestionVote");
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      await axios.post(
        `${process.env.SERVER_URL}/question/${router.query.id}/${voteType}`,
        {},
        {
          headers,
        }
      );

      fetchQuestionById();
    } catch (err) {
      console.error(`Error ${voteType}ing question:`, err);
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  const handleAnswerVote = async (
    answerId: string,
    voteType: "upvote" | "downvote"
  ) => {
    console.log("handleAnswerVote");

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      await axios.post(
        `${process.env.SERVER_URL}/answer/${answerId}/${voteType}`,
        {},
        {
          headers,
        }
      );

      fetchAnswers();
    } catch (err) {
      console.error(`Error ${voteType}ing answer:`, err);
      // @ts-expect-error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    if (router.query.id) {
      const token = cookies.get("jwt_token");
      if (token) {
        const decodedToken: { userId: string } = jwtDecode(token);
        fetchLoggedInUser(decodedToken.userId);
      } else {
        // router.push("/login");
        console.log("User not unauthenticated, please login");
      }

      fetchQuestionById();
      fetchAnswers();
    }
  }, [router.query.id]);

  useEffect(() => {
    if (question && answers) {
      setLoading(true);
    }
  }, [question, answers]);

  return (
    <main className={styles.container}>
      <Navbar loggedUser={loggedUser} isJwtActive={isJwtActive} />

      {isLoading ? (
        <AnswerWrapper
          key={answers ? answers.length : 0}
          question={question}
          loggedUser={loggedUser}
          answers={answers}
          setAnswers={setAnswers}
          answerText={answerText}
          setAnswerText={setAnswerText}
          handleInsertAnswer={handleInsertAnswer}
          handleQuestionVote={handleQuestionVote}
          handleAnswerVote={handleAnswerVote}
        />
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default QuestionPage;
