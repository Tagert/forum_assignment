import Link from "next/link";
import styles from "./styles/NavList.module.css";
import { LinksType } from "../../../types/links.type";
import { UserType } from "../../../types/user.type";
import { Spinner } from "../../atoms/Spinner/Spinner";

type NavListProps = {
  onBurgerBtnClick: () => void;
  links: LinksType[];
  isJwtActive: boolean;
  loggedUser: UserType | null;
};

const NavList = ({
  onBurgerBtnClick,
  links,
  isJwtActive,
  loggedUser,
}: NavListProps) => {
  return (
    <div className={styles.outerContainer}>
      <nav className={styles.container}>
        {links.map((n) => (
          <Link key={n.id} href={n.href}>
            {n.title}
          </Link>
        ))}

        {isJwtActive && loggedUser ? (
          <Link className={styles.user} href={"/login"}>
            {loggedUser.name}
          </Link>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}

        <button onClick={() => onBurgerBtnClick()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 50 50"
          >
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        </button>
      </nav>

      <Link href={"/"} className={styles.linkHolder}>
        <svg
          enableBackground="new 0 0 32 32"
          height="32px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 32 32"
          width="32px"
        >
          <g>
            <path
              d="M13,2C6.935,2,2,6.935,2,13s4.935,11,11,11s11-4.935,11-11S19.065,2,13,2z M13,22c-4.962,0-9-4.037-9-9   c0-4.962,4.038-9,9-9c4.963,0,9,4.038,9,9C22,17.963,17.963,22,13,22z"
              fill="currentColor"
            />
            <path
              d="M29.707,28.293l-6.001-6c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l6.001,6C28.488,29.902,28.744,30,29,30   s0.512-0.098,0.707-0.293C30.098,29.316,30.098,28.684,29.707,28.293z"
              fill="currentColor"
            />
          </g>
        </svg>
      </Link>
    </div>
  );
};

export { NavList };
