import styles from "./styles/Login.module.css";
import { useState } from "react";
import { LoginForm } from "../../components/molecules/LoginForm/LoginForm";
import { SignUpForm } from "../../components/molecules/SignUpForm/SignUpForm";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { Footer } from "../../components/organisms/Footer/Footer";

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <main className={styles.container}>
      <Navbar />
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
