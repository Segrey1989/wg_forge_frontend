import { changeCurrencyEvent } from './events/events';

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
    });
};

const createSelectElement = ratesObj => {
  let previousValue;
  const select = document.createElement('select');
  const option = document.createElement('option');
  for (let key in ratesObj) {
    const optionClone = option.cloneNode(true);
    optionClone.setAttribute('data-rate', ratesObj[key]);
    optionClone.value = key;
    optionClone.text = key;
    if (key === 'USD') optionClone.setAttribute('selected', 'selected');
    select.appendChild(optionClone);
  }

  select.addEventListener('click', event => {
    const currencyCode = select.options[select.selectedIndex];
    previousValue = parseFloat(currencyCode.getAttribute('data-rate'));
  });

  select.addEventListener('change', () => {
    changeCurrencyEvent(event, previousValue);
  });
  return select;
};

export default createSelectRateEl;
