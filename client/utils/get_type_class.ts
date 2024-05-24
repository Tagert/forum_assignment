import styles from "../components/atoms/CategoryCard/styles/CategoryCard.module.css";

const getTypeClass = (
  type: "Ask the Community" | "MarketPlace" | "Off-Topic" | "Suggestion Box"
) => {
  switch (type) {
    case "Ask the Community":
      return styles.ask;
    case "MarketPlace":
      return styles.marketplace;
    case "Off-Topic":
      return styles.off_topic;
    case "Suggestion Box":
      return styles.suggestion;
    default:
      return "";
  }
};

export { getTypeClass };
