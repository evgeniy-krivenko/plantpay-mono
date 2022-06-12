export const getExpireDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const getExpireTime = (hours: number): Date => {
  const date = new Date();
  date.setTime(date.getTime() + hours);
  return date;
};
