export default class Tools {

  constructor(lessonNum, title) {
    this.lessNum = lessonNum;
    this.title = title;
  }

  // Get current time. Useful for seeing when the last time the auto webdev-dev-server reloaded was
  logTime() {
    const today = new Date();
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);

    const time = `${hours}:${minutes}:${seconds}`;
    return time;
  }

  titleBlock(lessonNum, title) {
    const mRow = `\ *      ${lessonNum}. ${title}      *`;
    const tRow = `/${'*'.repeat(mRow.length - 1)}`;
    const bRow = `\ ${'*'.repeat(mRow.length -1)}/`;
    const titleBlock = `${tRow}\n${mRow}\n${bRow}`;
    return titleBlock;
  }
}