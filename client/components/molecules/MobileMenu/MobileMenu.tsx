import styles from "./styles/MobileMenu.module.css";
import { LinksType } from "@/types/links.type";

type MobileMenuProps = {
  links: LinksType[];
};

const MobileMenu = ({ links }: MobileMenuProps) => {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          {links.map((n) => (
            <li key={n.id}>
              <a href={n.href}>{n.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export { MobileMenu };
