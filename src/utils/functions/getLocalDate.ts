import padNum from "./padNum";

const getLocalDate = (date: Date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${y}-${padNum(m)}-${padNum(d)}`;
};

export default getLocalDate;
