import styles from "./styles/InsertModal.module.css";
import { useState } from "react";
import { Button } from "../../atoms/Button/Button";

type InsertModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  setTitle: (value: string) => void;
  text: string;
  setText: (value: string) => void;
  category:
    | "Ask the Community"
    | "MarketPlace"
    | "Off-Topic"
    | "Suggestion Box"
    | "";
  setCategory: (
    value: "Ask the Community" | "MarketPlace" | "Off-Topic" | "Suggestion Box"
  ) => void;
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (title.length < 3) {
      setErrorMessage(
        "Your question title must be at least 3 characters long."
      );
      return;
    }

    if (text.length < 10) {
      setErrorMessage(
        "Your question text must be at least 10 characters long."
      );
      return;
    }

    if (category === "") {
      setErrorMessage("Please choose a category.");
      return;
    }

    setErrorMessage("");
    onConfirm();
  };

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
            <select
              name="category"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as
                    | "Ask the Community"
                    | "MarketPlace"
                    | "Off-Topic"
                    | "Suggestion Box"
                )
              }
            >
              <option value="">Select a category...</option>
              <option value="Ask the Community">Ask the Community</option>
              <option value="MarketPlace">MarketPlace</option>
              <option value="Off-Topic">Off-Topic</option>
              <option value="Suggestion Box">Suggestion Box</option>
            </select>
          </label>
        </div>

        <div className={styles.submitBox}>
          <div className={styles.btnHolder}>
            <Button
              isLoading={false}
              onClick={handleSubmit}
              title="Add a Question"
              type="WARNING"
            />

            <Button
              isLoading={false}
              onClick={() => onCancel()}
              title="Go Back"
            />
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      </div>

      <div onClick={() => onCancel()} className={styles.background}></div>
    </>
  );
};

export { InsertModal };
