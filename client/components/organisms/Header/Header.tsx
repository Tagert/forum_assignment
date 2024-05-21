import styles from "./styles/Header.module.css";
import { Navbar } from "../Navbar/Navbar";

const Header = () => {
  return (
    <header className={styles.container}>
      <Navbar />

      <div className={styles.searchContainer}>
        <h2>Welcome to our community</h2>
        <p>
          We&apos;re happy to have you here. If you need help, please search
          before you ask.
        </p>
        <input
          type="search"
          name="search_bar"
          placeholder="Search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          data-track-type="click keydown"
        />
      </div>
    </header>
  );
};

export { Header };
