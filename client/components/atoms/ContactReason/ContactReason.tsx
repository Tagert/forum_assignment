import styles from "./styles/ContactReason.module.css";
import Image, { ImageProps } from "next/image";

type ContactReasonProps = {
  srcImg: ImageProps["src"];
  title: string;
  text: string;
};

const ContactReason = ({ srcImg, title, text }: ContactReasonProps) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.categoryIcon}
        width={48}
        height={48}
        src={srcImg}
        alt={` category icon`}
      />

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
};

export { ContactReason };
