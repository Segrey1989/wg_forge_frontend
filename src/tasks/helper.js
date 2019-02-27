/**
 * Add 0 before time period if it less then 10
 * @param {Integer} time
 */
const addZero = time => {
  if (time < 10) return `0${time}`;
  return time;
};

/**
 * Convert timestamp to format dd/mm/yyyy, hh:mm:ss
 * @param {String} timestamp
 */
const convertDate = timestamp => {
  const time = new Date(timestamp * 1000);

  const day = addZero(time.getDay() + 1);
  const month = addZero(time.getMonth() + 1);
  const year = time.getFullYear();
  const hours = addZero(time.getHours());
  const minutes = addZero(time.getMinutes());
  const seconds = addZero(time.getSeconds());

  const date = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  return date;
};

/**
 * Replace digits by *
 * @param {String} bank card number
 */
const transformCardNumber = card => {
  let number = card;
  const secretPart = number.slice(2, -4);
  const replacer = secretPart.replace(/[0-9]/g, '*');
  return number.replace(secretPart, replacer);
};
export { convertDate, transformCardNumber };
