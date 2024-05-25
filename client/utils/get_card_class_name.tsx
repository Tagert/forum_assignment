import styles from "../components/molecules/AnswerCard/styles/AnswerCard.module.css";

const getCardClassName = (index: number) => {
  return index % 2 === 0 ? styles.cardRightSide : styles.cardLeftSide;
};

export { getCardClassName };
