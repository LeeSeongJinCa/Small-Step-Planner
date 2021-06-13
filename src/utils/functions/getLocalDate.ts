import padNum from "./padNum";

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth() + 1;

export const getLastDate = () => {
  const lastDate = new Date(y, m, 0).getDate();

  return lastDate;
};

export const getLocalDateKey = (i: number) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;

  return getLocalDate(new Date(y, m - 1, i + 1));
};

export const getLocalDateUntilMonth = (date: Date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;

  return `${y}-${padNum(m)}`;
};

const getLocalDate = (date: Date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${y}-${padNum(m)}-${padNum(d)}`;
};

export default getLocalDate;
