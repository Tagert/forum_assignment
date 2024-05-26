import styles from "./styles/Header.module.css";
import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { UserType } from "../../../types/user.type";

type HeaderProps = {
  loggedUser: UserType | null;
  isJwtActive: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header = ({ loggedUser, isJwtActive, onSearchChange }: HeaderProps) => {
  return (
    <header className={styles.container}>
      <Navbar loggedUser={loggedUser} isJwtActive={isJwtActive} />

      <div className={styles.searchContainer}>
        <h2>Welcome to our community</h2>
        <p>
          We&apos;re happy to have you here. If you need help, please search
          before you ask.
        </p>
        <input
          type="search"
          name="search_bar"
          placeholder="Search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          data-track-type="click keydown"
          onChange={onSearchChange}
        />

        <div className={styles.reference}>
          <a href="#questionWrapper" className={styles.scroll}>
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8284 12.0259L16.2426 13.4402L12 17.6828L7.75733 13.4402L9.17155 12.0259L11 13.8544V6.31724H13V13.8544L14.8284 12.0259Z"
                fill="currentColor"
              />
              <path
                clipRule="evenodd"
                d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export { Header };
