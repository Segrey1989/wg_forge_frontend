/**
 * Return the array of order objects, where one of the fields contains
 * the inputValue
 * @param {Array} data
 * @param {String} inputValue
 */
const searchByInput = (data, inputValue) => {
  const dataCopy = data.slice();
  const filteredData = dataCopy.filter(order => {
    if (order['Transaction ID'].indexOf(inputValue) !== -1) return order;
    else if (order['User Info']['userName'].indexOf(inputValue) !== -1)
      return order;
    else if (order['Order Amount'].indexOf(inputValue) !== -1) return order;
    else if (order['Card Type'].indexOf(inputValue) !== -1) return order;
    else if (order['Location'].indexOf(inputValue) !== -1) return order;
  });
  return filteredData;
};

export default searchByInput;
