import styles from "./styles/QuestionPage.module.css"
import axios from "axios"
import cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { ErrorModal } from "../../components/atoms/ErrorModal/ErrorModal"
import { AnswerType } from "../../types/answer.type"
import { QuestionType } from "../../types/question.type"
import { Spinner } from "../../components/atoms/Spinner/Spinner"
import { AnswerWrapper } from "../../components/organisms/AnswerWrapper/AnswerWrapper"
import { Navbar } from "../../components/organisms/Navbar/Navbar"

const QuestionPage = () => {
  const router = useRouter()

  const { isJwtActive, loggedUser } = useAuth()

  const [question, setQuestion] = useState<QuestionType | null>(null)
  const [answers, setAnswers] = useState<AnswerType[] | null>(null)
  const [answerText, setAnswerText] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isShowError, setShowError] = useState(false)

  const fetchQuestionById = async () => {
    console.log("fetchQuestionById")

    try {
      const questionRes = await axios.get(
        `${process.env.SERVER_URL}/question/${router.query.id}`
      )

      setQuestion(questionRes.data)
    } catch (err) {
      console.error("Error fetching question:", err)

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login")
      }
    }
  }

  const fetchAnswers = async () => {
    console.log("fetchAnswers")

    try {
      const answerRes = await axios.get(
        `${process.env.SERVER_URL}/question/${router.query.id}/answers`
      )

      setAnswers(answerRes.data.answers)
    } catch (err) {
      console.error("Error fetching answers:", err)

      // @ts-expect-error
      if (axios.isAxiosError(err) && err.response.status === 401) {
        router.push("/login")
      }
    }
  }

  const insertAnswer = async (answerText: string) => {
    console.log("InsertAnswer")

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      }

      const res = await axios.post(
        `${process.env.SERVER_URL}/question/${router.query.id}/answers`,
        { text: answerText },
        {
          headers,
        }
      )

      if (res.status === 201) {
        setAnswers((prevAnswers) =>
          prevAnswers
            ? [...prevAnswers, res.data.response]
            : [res.data.response]
        )

        fetchQuestionById()
      }
    } catch (err) {
      console.error("Error fetching answers:", err)
      // @ts-expect-error
      if (axios.isAxiosError(err) && err.response.status === 401) {
        router.push("/login")
      }
    }
  }

  const handleInsertAnswer = () => {
    insertAnswer(answerText)
    setAnswerText("")
  }

  const handleQuestionVote = async (voteType: "upvote" | "downvote") => {
    console.log("handleQuestionVote")

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      }

      await axios.post(
        `${process.env.SERVER_URL}/question/${router.query.id}/${voteType}`,
        {},
        {
          headers,
        }
      )

      fetchQuestionById()
      setShowError(false)
    } catch (err) {
      console.error(`Error ${voteType}ing question:`, err)
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login")
      } else if (axios.isAxiosError(err) && err.response?.status === 400) {
        setErrorMessage(err.response.data.message)
        setShowError(true)
      }
    }
  }

  const handleAnswerVote = async (
    answerId: string,
    voteType: "upvote" | "downvote"
  ) => {
    console.log("handleAnswerVote")

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      }

      await axios.post(
        `${process.env.SERVER_URL}/answer/${answerId}/${voteType}`,
        {},
        {
          headers,
        }
      )

      fetchAnswers()
      setShowError(false)
    } catch (err) {
      console.error(`Error ${voteType}ing answer:`, err)
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login")
      } else if (axios.isAxiosError(err) && err.response?.status === 400) {
        setErrorMessage(err.response.data.message)
        setShowError(true)
      }
    }
  }

  useEffect(() => {
    if (router.query.id) {
      fetchQuestionById()
      fetchAnswers()
    }
  }, [router.query.id])

  useEffect(() => {
    if (question && answers) {
      setLoading(true)
    }
  }, [question, answers])

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

      {isShowError && (
        <ErrorModal
          message={errorMessage}
          onCancel={() => setShowError(false)}
        />
      )}
    </main>
  )
}

export default QuestionPage
