import styles from "./styles/Contact.module.css";
import { useAuth } from "../../hooks/useAuth";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { ContactReason } from "../../components/atoms/ContactReason/ContactReason";
import supportImg from "../../public/assets/control.webp";

const Contact = () => {
  const { isJwtActive, loggedUser } = useAuth();

  return (
    <>
      <Navbar isJwtActive={isJwtActive} loggedUser={loggedUser} />

      <main className={styles.container}>
        <section className={styles.description}>
          <h1>Contact us</h1>

          <p>
            Looking to contact Q-station? There&#39;s a few ways to do it based
            on your inquiry—check out all your options below.
          </p>
        </section>

        <section className={styles.reasons}>
          <ContactReason
            srcImg={supportImg}
            title={"Get support"}
            text={
              "If you're having trouble with Q-station, check out the articles in Help & Learning or get assistance from other Q-station users in our discussion forums."
            }
          />
        </section>
      </main>
    </>
  );
};

export default Contact;
