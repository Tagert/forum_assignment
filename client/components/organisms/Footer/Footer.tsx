import { ContactUs } from "../../molecules/ContactUs/ContactUs";
import { Social } from "../../molecules/Social/Social";
import styles from "./styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.info}>
        <h4>Q-station</h4>

        <ContactUs />

        <Social />
      </div>

      <div className={styles.copyright}>
        <p>©2024 Q-STATION. ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export { Footer };
