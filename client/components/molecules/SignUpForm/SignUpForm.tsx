import styles from "./styles/SignUpForm.module.css";
// import Link from "next/link";
import axios from "axios";
import cookies from "js-cookie";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../../atoms/Button/Button";

const SignUpForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isMatch, setMatch] = useState(false);
  const [isBadData, setBadData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSignUp = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError(true);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMatch(true);
      setLoading(false);
      return;
    }

    setError(false);
    setMatch(false);

    const signUpBody = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        `${process.env.SERVER_URL}/users/sign_up`,
        signUpBody
      );

      if (res.status === 201) {
        setBadData(false);
        cookies.set("jwt_token", res.data.jwt_token);
        localStorage.setItem("jwt_refresh_token", res.data.jwt_refresh_token);
        router.push("/");
      }

      setLoading(false);

      console.log("response:", res);
    } catch (err) {
      setBadData(true);
      // @ts-expect-error
      if (err.response.data.message) {
        // @ts-expect-error
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      console.log("err:", err);
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSignUp();
    }
  };

  return (
    <div className={styles.login_card}>
      <div className={styles.login_modal} id="loginModal">
        <div className={styles.active_login}>
          <h4>Create Account</h4>
          <p>Please sign-up to continue!</p>

          <div className={styles.input}>
            <div className={styles.name_box}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="on"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.username_info_error}>
              <p className={styles.username_info}></p>
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.username_box}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="on"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.username_info_error}>
              <p className={styles.username_info}></p>
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.password_box}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="Password"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.password_info_error}>
              <p className={styles.password_info}></p>
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.password_box}>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={styles.password_info_error}>
              <p className={styles.password_info}></p>
            </div>
          </div>
        </div>

        <div className={styles.btn_info}>
          <Button isLoading={isLoading} onClick={onSignUp} title="Sign up" />
          {isError && (
            <p className={styles.error}>Please fill all the inputs</p>
          )}
          {isMatch && <p className={styles.error}>Passwords don&#39;t match</p>}
          {isBadData && <p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export { SignUpForm };
