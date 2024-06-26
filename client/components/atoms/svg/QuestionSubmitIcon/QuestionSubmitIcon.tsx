import styles from "./styles/QuestionSubmitIcon.module.css";

const QuestionSubmitIcon = () => {
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
      <g id="document_x5F_text_x5F_accept">
        <path
          d="M24,14.059V5.584L18.414,0H0v32h24v-0.059c4.499-0.5,7.998-4.309,8-8.941C31.998,18.366,28.499,14.556,24,14.059z    M17.998,2.413L21.586,6h-3.588V2.413z M2,30V1.998h14v6.001h6v6.06c-1.752,0.194-3.352,0.89-4.652,1.941H4v2h11.517   c-0.412,0.616-0.743,1.289-0.994,2H4v2h10.059C14.022,22.329,14,22.661,14,23c0,2.829,1.308,5.351,3.349,7H2z M23,29.883   c-3.801-0.009-6.876-3.084-6.885-6.883c0.009-3.801,3.084-6.876,6.885-6.885c3.799,0.009,6.874,3.084,6.883,6.885   C29.874,26.799,26.799,29.874,23,29.883z M20,12H4v2h16V12z"
          fill="currentColor"
        />
        <polygon points="18,23 20,21 22,23 26,19 28,21 22,27  " />
      </g>
    </svg>
  );
};

export { QuestionSubmitIcon };
