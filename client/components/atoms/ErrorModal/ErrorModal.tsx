import styles from "./styles/ErrorModal.module.css";
import { Button } from "../Button/Button";

type ModalProps = {
  message: string;
  onCancel: () => void;
};

const ErrorModal = ({ message, onCancel }: ModalProps) => {
  return (
    <>
      <div className={styles.container}>
        <h4>{message}</h4>

        <div className={styles.btnHolder}>
          <Button
            className={styles.okBtn}
            isLoading={false}
            onClick={() => onCancel()}
            title="OK"
          />
        </div>
      </div>

      <div onClick={() => onCancel()} className={styles.background}></div>
    </>
  );
};

export { ErrorModal };
