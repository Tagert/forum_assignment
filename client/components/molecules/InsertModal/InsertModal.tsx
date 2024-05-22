import styles from "./styles/InsertModal.module.css";
import { Button } from "../../atoms/Button/Button";

type InsertModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  setTitle: (value: string) => void;
  text: string;
  setText: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
};

const InsertModal = ({
  message,
  onConfirm,
  onCancel,
  title,
  setTitle,
  text,
  setText,
  category,
  setCategory,
}: InsertModalProps) => {
  return (
    <>
      <div className={styles.container}>
        <h4>{message}</h4>

        <div className={styles.inputBox}>
          <h4>
            You can ask a new <span>Question</span> here:
          </h4>
          <label>
            Title:
            <input
              type="text"
              name="title"
              placeholder="Your title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Text:
            <textarea
              name="text"
              placeholder="Your question text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>

          <label>
            Category:
            <input
              type="text"
              name="category"
              placeholder="Category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.btnHolder}>
          <Button
            isLoading={false}
            onClick={() => onConfirm()}
            title="Add a Question"
            type="WARNING"
          />

          <Button
            isLoading={false}
            onClick={() => onCancel()}
            title="Go Back"
          />
        </div>
      </div>

      <div onClick={() => onCancel()} className={styles.background}></div>
    </>
  );
};

export { InsertModal };
