import styles from "./styles/CategoryCard.module.css";
import { getTypeClass } from "../../../utils/get_type_class";

type CategoryCardProps = {
  type: "Ask the Community" | "MarketPlace" | "Off-Topic" | "Suggestion Box";
  imgSrc: string;
};

const CategoryCard = ({ type, imgSrc }: CategoryCardProps) => {
  const typeClass = getTypeClass(type);

  return (
    <div className={`${styles.container} ${typeClass}`}>
      <img src={imgSrc} alt={`${type} category icon`} />
      <p>{type}</p>
    </div>
  );
};

export { CategoryCard };
