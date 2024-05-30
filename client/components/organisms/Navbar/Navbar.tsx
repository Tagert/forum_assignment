import styles from "./styles/Navbar.module.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { UserType } from "../../../types/user.type";
import { links } from "../../../constants/links";
import { NavList } from "../../molecules/NavList/NavList";
import { MobileMenu } from "../../molecules/MobileMenu/MobileMenu";

type NavbarProps = {
  loggedUser: UserType | null;
  isJwtActive: boolean;
};

const Navbar = ({ loggedUser, isJwtActive }: NavbarProps) => {
  const [isDisplayMobileMenu, setDisplayMobileMenu] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  const onBurgerBtnClick = () => {
    setDisplayMobileMenu((prev: boolean) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(event.target as Node)
      ) {
        setDisplayMobileMenu(false);
      }
    };

    if (isDisplayMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    if (isDisplayMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDisplayMobileMenu]);

  return (
    <nav className={styles.container}>
      <div className={styles.navbar}>
        <Link href={"/"} className={styles.linkHolder}>
          <h1>Q-station</h1>
        </Link>

        <NavList
          onBurgerBtnClick={onBurgerBtnClick}
          links={links}
          isJwtActive={isJwtActive}
          loggedUser={loggedUser}
          hamburgerBtnRef={hamburgerBtnRef}
        />

        {isDisplayMobileMenu && (
          <div ref={mobileMenuRef} className={styles.mobileMenuHolder}>
            <MobileMenu
              links={links}
              loggedUser={loggedUser}
              isJwtActive={isJwtActive}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
