import styles from "./styles/UserManage.module.css";
import Link from "next/link";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UserType } from "../../../types/user.type";
import { Spinner } from "../../atoms/Spinner/Spinner";

type UserManageProps = {
  isJwtActive: boolean;
  loggedUser: UserType | null;
};

const UserManage = ({ isJwtActive, loggedUser }: UserManageProps) => {
  const router = useRouter();

  const [isUserBoxVisible, setUserBoxVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isJwtActive !== undefined && loggedUser !== null) {
      setLoading(false);
    }
  }, [isJwtActive, loggedUser]);

  const getInitials = (name: string) => {
    if (!name) return "";
    const firstLetter = name.charAt(0).toUpperCase();
    const secondLetter = name.charAt(1).toLowerCase();
    return `${firstLetter}${secondLetter}`;
  };

  const toggleUserBox = () => {
    setUserBoxVisible(!isUserBoxVisible);
  };

  const handleSignOut = () => {
    cookies.remove("jwt_token");
    router.push("/login");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.userManage}>
        {isJwtActive && loggedUser ? (
          <div className={styles.user}>
            <div className={styles.avatar} onClick={toggleUserBox}>
              <p className={styles.initials}>{getInitials(loggedUser.name)}</p>

              <div
                className={
                  isUserBoxVisible ? styles.userNameBox : styles.userNameBoxHide
                }
              >
                <div className={styles.signOutHolder}>
                  <p>{loggedUser.name}</p>

                  <button className={styles.signOut} onClick={handleSignOut}>
                    <p>Sign Out</p>

                    <svg
                      fill="none"
                      height="20"
                      viewBox="0 0 20 20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.5 11.25C8.91421 11.25 9.25 10.9142 9.25 10.5C9.25 10.0858 8.91421 9.75 8.5 9.75C8.08579 9.75 7.75 10.0858 7.75 10.5C7.75 10.9142 8.08579 11.25 8.5 11.25Z"
                        fill="currentColor"
                      />
                      <path
                        d="M11 3.5C11 3.3542 10.9364 3.21567 10.8257 3.12068C10.7151 3.02569 10.5686 2.98371 10.4244 3.00574L3.42445 4.07574C3.18032 4.11306 3 4.32303 3 4.57V15.43C3 15.6769 3.18028 15.8869 3.42438 15.9243L10.4244 16.9953C10.5685 17.0173 10.7151 16.9754 10.8257 16.8804C10.9363 16.7854 11 16.6468 11 16.501V10L16.1722 10L15.1753 10.8737C14.9679 11.0556 14.9468 11.3714 15.1284 11.5793C15.3099 11.7871 15.6253 11.8081 15.8328 11.6263L17.8295 9.8763C17.9379 9.78135 18 9.64419 18 9.50001C18 9.35583 17.9379 9.21867 17.8295 9.12372L15.8328 7.37372C15.6253 7.19188 15.3099 7.21294 15.1284 7.42076C14.9468 7.62858 14.9679 7.94446 15.1753 8.1263L16.1723 9.00002L11 9.00002V3.5ZM10 4.08224V15.9187L4 15.0007V4.99938L10 4.08224Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12.5 16H12V11H13V15.5C13 15.7761 12.7761 16 12.5 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 8V4H12.5C12.7761 4 13 4.22386 13 4.5V8H12Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link href={"/login"} className={styles.login}>
            Login
          </Link>
        )}

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
    </>
  );
};

export { UserManage };
