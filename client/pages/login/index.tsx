// import styles from "./styles/Login.module.css";
import { LoginForm } from "../../components/molecules/LoginForm/LoginForm";
import { SignUpForm } from "../../components/molecules/SignUpForm/SignUpForm";
import { Navbar } from "../../components/organisms/Navbar/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <SignUpForm />
    </>
  );
};

export default Login;
