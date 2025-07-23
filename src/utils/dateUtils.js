export const isMoreThan3Days = (dateString) => {
  const today = new Date();
  const inputDate = new Date(dateString);
  const diffTime = today - inputDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays > 3;
};
