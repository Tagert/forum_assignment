import styles from "./styles/Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export { Spinner };
