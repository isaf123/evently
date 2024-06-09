export const addDay = (to: string) => {
  const date = new Date(to);
  date.setDate(date.getDate() + 1);

  return date.toISOString();
};

export const minDay = (to: string) => {
  const date = new Date(to);
  date.setDate(date.getDate() - 1);

  return date.toISOString();
};
