import styles from "./styles/Contact.module.css";
import { useAuth } from "../../hooks/useAuth";
import { Navbar } from "../../components/organisms/Navbar/Navbar";

const Contact = () => {
  const { isJwtActive, loggedUser } = useAuth();

  return (
    <>
      <Navbar isJwtActive={isJwtActive} loggedUser={loggedUser} />

      <main className={styles.container}></main>
    </>
  );
};

export default Contact;
