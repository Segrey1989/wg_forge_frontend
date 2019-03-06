import { changeCurrencyEvent } from './events/events';
import dataStorage from './dataStorage';

/**
 * Get data about current rates from api, and
 * append select element into the page
 * @param {HTML container} htmlEl
 */
const createSelectRateEl = htmlEl => {
  return fetch('https://api.exchangeratesapi.io/latest')
    .then(result => {
      if (result.ok) {
        const data = result.json();
        return data;
      }
    })
    .then(data => {
      const rates = data.rates;
      const select = createSelectElement(rates);
      htmlEl.appendChild(select);
    })
    .catch(err => console.log(`Get rates data error: ${err}`));
};

/**
 * Get data about current rates, put it in select element
 * @param {Array} ratesObj
 */
const createSelectElement = ratesObj => {
  const select = document.createElement('select');
  select.classList.add('form-control');

  const option = document.createElement('option');
  for (let key in ratesObj) {
    const optionClone = option.cloneNode(true);
    optionClone.setAttribute('data-rate', ratesObj[key]);
    optionClone.value = key;
    optionClone.text = key;
    if (key === 'USD') optionClone.setAttribute('selected', 'selected');
    select.appendChild(optionClone);
  }

  const currencyCode = select.options[select.selectedIndex];
  dataStorage.previousRate = parseFloat(currencyCode.getAttribute('data-rate'));

  select.addEventListener('change', () => {
    const currencyCode = select.options[select.selectedIndex];
    changeCurrencyEvent(dataStorage.previousRate);
    dataStorage.previousRate = parseFloat(
      currencyCode.getAttribute('data-rate'),
    );
  });
  return select;
};

export default createSelectRateEl;
