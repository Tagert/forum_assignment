import styles from "./styles/CategoryCard.module.css";
import Image from "next/image";
import { getTypeClass } from "../../../utils/get_type_class";

type CategoryCardProps = {
  type: "Ask the Community" | "MarketPlace" | "Off-Topic" | "Suggestion Box";
  imgSrc: string;
  onClick: (category: string) => void;
  isSelected: boolean;
};

const CategoryCard = ({
  type,
  imgSrc,
  onClick,
  isSelected,
}: CategoryCardProps) => {
  const typeClass = getTypeClass(type);

  return (
    <div
      className={`${styles.container} ${typeClass}`}
      onClick={() => onClick(type)}
    >
      <div className={styles.categoryContent}>
        <Image
          className={styles.categoryIcon}
          width={48}
          height={48}
          src={imgSrc}
          alt={`${type} category icon`}
        />

        <p>{type}</p>
      </div>
      <div className={styles.checkContainer}>
        <div className={styles.checkBoxBorder}>
          <div
            className={`${styles.checkBoxBackground} ${
              isSelected ? styles.selected : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export { CategoryCard };
