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

const sortAlpha = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * Sort by additional parameter already sorted array by main parameter.
 * Return doubly sorted array by 2 parameters
 * @param {Array} sortedArr
 * @param {String} sortParam
 */
const sortBySecondParam = (sortedArr, sortParam) => {
  let sortedArrCopy = sortedArr.slice();
  let array = [];

  while (true) {
    const country = sortedArrCopy[0]['Location'].slice(0, 2);
    const index = sortedArrCopy.findIndex(order => {
      return order['Location'].slice(0, 2) !== country;
    });
    if (index === -1) break;

    const filteredByCountry = sortedArrCopy.splice(0, index);
    const sortedByIp = filteredByCountry.sort((a, b) => {
      const val1 = a[`${sortParam}`].slice(4, -1);
      const val2 = b[`${sortParam}`].slice(4, -1);
      return sortAlpha(val1, val2);
    });
    array = array.concat(sortedByIp);
  }
  return array;
};

/**
 * Convert number to money format
 * @param {Number} num
 */
const convertToMoney = num => {
  return `$ ${num
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
    .replace('.', ',')}`;
};

export {
  convertDate,
  transformCardNumber,
  sortAlpha,
  sortBySecondParam,
  convertToMoney,
};
