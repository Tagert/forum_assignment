const calcTimeDifference = (date: Date): string => {
  const now = new Date();
  const createdDate = new Date(date);
  const elapsedTime = now.getTime() - createdDate.getTime();

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const timeAgo =
    days > 0
      ? `${days} day${days > 1 ? "s" : ""} ago`
      : hours > 0
      ? `${hours} hour${hours > 1 ? "s" : ""} ago`
      : minutes > 0
      ? `${minutes} minute${minutes > 1 ? "s" : ""} ago`
      : `${seconds} second${seconds > 1 ? "s" : ""} ago`;

  return timeAgo;
};

export { calcTimeDifference };
