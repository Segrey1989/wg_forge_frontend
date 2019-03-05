import { sortAlpha, sortBySecondParam, convertToMoney } from '../helper';
import dataStorage from '../dataStorage';

/**
 * Sort table data in dependence of data type and criterion of sort
 * @param {Object} data
 * @param {String} sortParam
 */
const sortData = sortParam => {
  const dataCopy = dataStorage.ordersData.slice();
  let sortedData;
  if (sortParam === 'Order Amount') {
    sortedData = dataCopy.sort((a, b) => {
      const val1 = parseFloat(a[`${sortParam}`]);
      const val2 = parseFloat(b[`${sortParam}`]);
      return val1 - val2;
    });
  } else if (
    sortParam === 'Transaction ID' ||
    sortParam === 'Card Type' ||
    sortParam === 'Order Date'
  ) {
    sortedData = dataCopy.sort((a, b) => {
      const val1 = a[`${sortParam}`];
      const val2 = b[`${sortParam}`];
      return sortAlpha(val1, val2);
    });
  } else if (sortParam === 'User Info') {
    sortedData = dataCopy.sort((a, b) => {
      const val1 = a[`${sortParam}`]['userName'].slice(4);
      const val2 = b[`${sortParam}`]['userName'].slice(4);
      return sortAlpha(val1, val2);
    });
  } else if (sortParam === 'Location') {
    sortedData = dataCopy.sort((a, b) => {
      const val1 = a[`${sortParam}`].slice(0, 2);
      const val2 = b[`${sortParam}`].slice(0, 2);
      return sortAlpha(val1, val2);
    });
    sortedData = sortBySecondParam(sortedData, sortParam);
  }
  if (sortParam !== 'Card Number') {
    dataStorage.ordersData = sortedData;
  }
  return sortedData;
};

/**
 * Calculate the order ammount in new currency and change this data
 * in dataStorage
 * @param {Number} previousRate
 * @param {Number} currentRate
 */
const changeOrderAmountCurrency = (previousRate, currentRate) => {
  const orders = dataStorage.ordersData;
  const currensyCode = dataStorage.currentCurrensyCode;
  orders.map(order => {
    const ammount = parseFloat(
      order['Order Amount'].replace(/[A-Za-z$-]/g, ''),
    );
    const newValue = (ammount / previousRate) * currentRate;

    const currentCol = document.querySelector(
      `#${order['row_id']} td:nth-child(4)`,
    );
    if (currentCol) {
      currentCol.innerText = convertToMoney(newValue, `${currensyCode}`);
    }
    order['Order Amount'] = `${newValue}`;
  });
};

/**
 * Calculate the statistic money fields in new currency and change this data
 * in table
 * @param {Number} previousRate
 * @param {Number} currentRate
 */
const changeStatisticCurrency = (previousRate, currentRate) => {
  const currensyCode = dataStorage.currentCurrensyCode;
  const statisticElements = document.querySelectorAll('.statistic-row');
  const changeStatisticEls = Array.from(statisticElements).slice(1);

  changeStatisticEls.map(el => {
    const currentCol = el.querySelector('td:last-child');
    const ammount = parseFloat(
      currentCol.innerText.replace(/[A-Za-z$-\s]/g, ''),
    );
    const newValue = (ammount / previousRate) * currentRate;
    if (currentCol) {
      currentCol.innerText = convertToMoney(newValue, `${currensyCode}`);
    }
  });
};

export { sortData, changeOrderAmountCurrency, changeStatisticCurrency };
