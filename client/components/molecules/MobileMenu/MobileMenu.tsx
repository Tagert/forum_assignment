import styles from "./styles/MobileMenu.module.css";
import Link from "next/link";
import { LinksType } from "../../../types/links.type";
import { UserType } from "../../../types/user.type";

type MobileMenuProps = {
  links: LinksType[];
  loggedUser: UserType | null;
  isJwtActive: boolean;
};

const MobileMenu = ({ links, loggedUser, isJwtActive }: MobileMenuProps) => {
  return (
    <nav className={styles.container}>
      <ul>
        {links.map((n) => (
          <li key={n.id}>
            <a href={n.href}>{n.title}</a>
          </li>
        ))}

        {isJwtActive && loggedUser ? (
          <Link
            className={`${styles.linkHolder} ${styles.user}`}
            href={"/login"}
          >
            {loggedUser.name}
          </Link>
        ) : (
          <Link className={styles.linkHolder} href={"/login"}>
            Login
          </Link>
        )}
      </ul>
    </nav>
  );
};

export { MobileMenu };
