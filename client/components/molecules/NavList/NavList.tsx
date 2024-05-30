import styles from "./styles/NavList.module.css";
import Link from "next/link";
import { RefObject } from "react";
import { UserManage } from "../UserManage/UserManage";
import { LinksType } from "../../../types/links.type";
import { UserType } from "../../../types/user.type";

type NavListProps = {
  onBurgerBtnClick: () => void;
  links: LinksType[];
  isJwtActive: boolean;
  loggedUser: UserType | null;
  hamburgerBtnRef: RefObject<HTMLButtonElement>;
};

const NavList = ({
  onBurgerBtnClick,
  links,
  isJwtActive,
  loggedUser,
  hamburgerBtnRef,
}: NavListProps) => {
  return (
    <div className={styles.outerContainer}>
      <nav className={styles.container}>
        {links.map((n) => (
          <Link key={n.id} href={n.href}>
            {n.title}
          </Link>
        ))}

        <UserManage isJwtActive={isJwtActive} loggedUser={loggedUser} />

        <button
          className={styles.hamburgerMenu}
          ref={hamburgerBtnRef}
          onClick={onBurgerBtnClick}
        >
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
    </div>
  );
};

export { NavList };
