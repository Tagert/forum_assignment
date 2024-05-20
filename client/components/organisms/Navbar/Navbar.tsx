import styles from "./styles/Navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { links } from "../../../constants/links";
import { NavList } from "../../molecules/NavList/NavList";
import { MobileMenu } from "../../molecules/MobileMenu/MobileMenu";

const Navbar = () => {
  const [isDisplayMobileMenu, setDisplayMobileMenu] = useState(false);

  const onBurgerBtnClick = () => {
    setDisplayMobileMenu(!isDisplayMobileMenu);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.navbar}>
        <Link href={"/"} className={styles.linkHolder}>
          <h1>Q-station</h1>
        </Link>

        <NavList onBurgerBtnClick={onBurgerBtnClick} links={links} />

        {isDisplayMobileMenu && <MobileMenu links={links} />}
      </div>
    </nav>
  );
};

export { Navbar };
