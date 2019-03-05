import dataStorage from './dataStorage';
import { convertToMoney } from './helper';

/**
 * Return amount of orders
 * @param {Array} data
 */
const getOrderAmount = data => {
  const dataCopy = data.slice();
  return dataCopy.length;
};

/**
 * Return common cost of all orders
 * @param {Array} data
 */
const getOrdersCost = data => {
  const dataCopy = data.slice();
  const commonCost = dataCopy.reduce((ac, val) => {
    const cost = parseFloat(val['Order Amount']);
    return ac + cost;
  }, 0);
  return commonCost;
};

/**
 * Return mediana value of orders
 * @param {Array} data
 */
const getMediumValue = data => {
  const dataCopy = data.slice();
  let mediumCost;

  const sortedData = dataCopy.sort((a, b) => {
    const amount1 = parseFloat(a['Order Amount']);
    const amount2 = parseFloat(b['Order Amount']);
    return amount1 - amount2;
  });

  if (sortedData.length % 2 === 0) {
    const mediumIndex = sortedData.length / 2;
    const medium1 = parseFloat(sortedData[mediumIndex]['Order Amount']);
    const medium2 = parseFloat(sortedData[mediumIndex - 1]['Order Amount']);
    mediumCost = (medium1 + medium2) / 2;
  } else {
    const mediumIndex = Math.floor(sortedData.length / 2);
    mediumCost = parseFloat(sortedData[mediumIndex]['Order Amount']);
  }
  return mediumCost;
};

/**
 * Return the average bill
 * @param {Array} data
 */
const getAverageBill = data => {
  const commonCost = getOrdersCost(data);
  const ordersNumber = getOrderAmount(data);
  if (ordersNumber) {
    const average = commonCost / ordersNumber;
    return average;
  }
  return 0;
};

/**
 * Return the average bill, depends of gender
 * @param {Array} data
 * @param {String} gender
 */
const getGenderAverage = (data, gender) => {
  const genderPointer = gender.toLowerCase();
  if (genderPointer !== 'male' && genderPointer !== 'female') {
    throw new Error('Wrong gender');
  }
  const dataCopy = data.slice();
  const genderArr = dataCopy.filter(
    order => order['User Info']['gender'].toLowerCase() === genderPointer,
  );
  const genderCommonCost = getAverageBill(genderArr);
  return genderCommonCost;
};

const getStatisticData = data => {
  const statistic = {
    'Orders Count': 'n/a',
    'Orders Total': 'n/a',
    'Median Value': 'n/a',
    'Average Check': 'n/a',
    'Average Check (Female)': 'n/a',
    'Average Check (Male)': 'n/a',
  };

  const { currentCurrensyCode } = dataStorage;
  if (data.length) {
    statistic['Orders Count'] = getOrderAmount(data);
    statistic['Orders Total'] = convertToMoney(
      getOrdersCost(data),
      currentCurrensyCode,
    );
    statistic['Median Value'] = convertToMoney(
      getMediumValue(data),
      currentCurrensyCode,
    );
    statistic['Average Check'] = convertToMoney(
      getAverageBill(data),
      currentCurrensyCode,
    );
    statistic['Average Check (Female)'] = convertToMoney(
      getGenderAverage(data, 'female'),
      currentCurrensyCode,
    );
    statistic['Average Check (Male)'] = convertToMoney(
      getGenderAverage(data, 'male'),
      currentCurrensyCode,
    );
  }
  return statistic;
};

export default getStatisticData;
