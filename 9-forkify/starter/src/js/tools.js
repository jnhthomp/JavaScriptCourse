export const logTime = () => {
  const today = new Date();
  const hours = ('0' + today.getHours()).slice(-2);
  const minutes = ('0' + today.getMinutes()).slice(-2);
  const seconds = ('0' + today.getSeconds()).slice(-2);

  const time = `${hours}:${minutes}:${seconds}`;
  return time;
};

export const titleBlock = (lessonNum, title) => {
  const mRow = `\ *      ${lessonNum}. ${title}      *`;
  const tRow = `/${'*'.repeat(mRow.length - 1)}`;
  const bRow = `\ ${'*'.repeat(mRow.length -1)}/`;
  const titleBlock = `${tRow}\n${mRow}\n${bRow}`;
  return titleBlock;
};