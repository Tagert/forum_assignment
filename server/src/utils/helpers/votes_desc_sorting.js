const descendingOrder = (questions) => {
  const sortedQuestions = questions.sort(
    (a, b) => b.question_votes - a.question_votes
  );

  return sortedQuestions;
};

export { descendingOrder };
