import axios from "axios"
import cookies from "js-cookie"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/router"
import { UserType } from "../types/user.type"

const useAuth = () => {
  const router = useRouter()

  const [isJwtActive, setJwtActive] = useState<boolean>(false)
  const [loggedUser, setLoggedUser] = useState<UserType | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchLoggedInUser = async (userId: string) => {
    console.log("fetchLoggedInUser")

    try {
      const res = await axios.get(`${process.env.SERVER_URL}/user/${userId}`)
      setLoggedUser(res.data)
    } catch (err) {
      console.error("Error fetching logged-in user:", err)
      // @ts-expect-error
      if (err.response?.status === 401) {
        router.push("/login")
      }
    }
  }

  const fetchVerifyToken = async () => {
    console.log("fetchVerifyToken")

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      }
      await axios.get(`${process.env.SERVER_URL}/verify_token`, { headers })
      setJwtActive(true)
    } catch (err) {
      console.error("Error verifying token:", err)

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setJwtActive(false)
      }
    }
  }

  useEffect(() => {
    const token = cookies.get("jwt_token")
    if (token) {
      try {
        const decodedToken: { userId: string } = jwtDecode(token)
        fetchLoggedInUser(decodedToken.userId)
        fetchVerifyToken()
      } catch (err) {
        console.error("Error decoding token:", err)
      }
    } else {
      console.log("User not authenticated, please login")
    }
  }, [])

  return { isJwtActive, loggedUser }
}

export { useAuth }
