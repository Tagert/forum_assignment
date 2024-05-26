import styles from "./styles/Login.module.css";
import { useState } from "react";
import { UserType } from "../../types/user.type";
import { LoginForm } from "../../components/molecules/LoginForm/LoginForm";
import { SignUpForm } from "../../components/molecules/SignUpForm/SignUpForm";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { Footer } from "../../components/organisms/Footer/Footer";

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [loggedUser, setLoggedUser] = useState<UserType | null>(null);
  const [isJwtActive, setJwtActive] = useState(false);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <main className={styles.container}>
      <Navbar isJwtActive={isJwtActive} loggedUser={loggedUser} />
      <div className={styles.userBox}>
        <div className={styles.userManagement}>
          {showLoginForm ? <LoginForm /> : <SignUpForm />}
        </div>

        <div className={styles.manageBackground}>
          <button onClick={toggleForm} className={styles.toggleButton}>
            {showLoginForm
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Login;
