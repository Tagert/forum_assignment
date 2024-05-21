const descendingOrder = (items, attribute) => {
  const sortedQuestions = items.sort((a, b) => b[attribute] - a[attribute]);

  return sortedQuestions;
};

export { descendingOrder };
