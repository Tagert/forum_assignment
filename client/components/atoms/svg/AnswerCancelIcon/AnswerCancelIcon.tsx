import styles from "./styles/AnswerCancelIcon.module.css";

const AnswerCancelIcon = () => {
  return (
    <svg
      className={styles.container}
      enableBackground="new 0 0 32 32"
      height="32px"
      id="svg2"
      version="1.1"
      viewBox="0 0 32 32"
      width="32px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="background">
        <rect fill="none" height="32" width="32" />
      </g>
      <g id="comment_x5F_cancel">
        <path
          d="M26,8H8v2h18V8z M26,12H8v2h15h3V12z M30,17.35V2H2l0,28h2.414l6.002-6h3.643c0.498,4.498,4.309,7.998,8.941,8   c4.97-0.002,8.998-4.03,9-9C31.999,20.858,31.248,18.895,30,17.35z M14.059,22H9.584L4,27.583V4h24v11.518   C26.569,14.56,24.851,14,23,14c-2.143,0-4.106,0.751-5.652,2H8v2h7.517C14.734,19.169,14.221,20.531,14.059,22z M23,29.882   c-3.801-0.008-6.876-3.083-6.885-6.882c0.009-3.801,3.084-6.876,6.885-6.885c3.799,0.009,6.874,3.084,6.882,6.885   C29.874,26.799,26.799,29.874,23,29.882z"
          fill="currentColor"
        />
        <polygon points="19,25 21,27 23,25 25,27 27,25 25,23 27,21 25,19 23,21 21,19 19,21 21,23  " />
      </g>
    </svg>
  );
};

export { AnswerCancelIcon };
