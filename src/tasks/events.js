import createTable from './Table';
import data from './processData';
import { sortAlpha, sortBySecondParam } from './helper';
import searchByInput from './search';
import { fillTableBody } from './TableElements';

/**
 * This event hide additional user information when the div with the info was clicked
 * @param {*} event
 */
const clickInfoEvent = event => {
  const { parentElement } = event.target;
  const classList = Array.from(parentElement.classList);
  if (classList.includes('user-details')) {
    parentElement.style.display = 'none';
  }
};

/**
 * Event which generated when the link in User Info column was clicked
 * @param {*} event
 */
const clickLinkEvent = event => {
  event.preventDefault();
  const nextDivElement = event.target.nextElementSibling;

  if (nextDivElement.style.display === 'none') {
    nextDivElement.style.display = 'block';
  } else {
    nextDivElement.style.display = 'none';
  }
};

/**
 * Sort table data in dependence of data type and criterion of sort
 * @param {Object} data
 * @param {String} sortParam
 */
const sortData = (data, sortParam) => {
  const dataCopy = data.slice(0);
  let sortedData;
  if (sortParam === 'Order Amount') {
    sortedData = dataCopy.sort((a, b) => {
      const val1 = parseInt(a[`${sortParam}`].slice(1));
      const val2 = parseInt(b[`${sortParam}`].slice(1));
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
  return sortedData;
};

/**
 * Event what happen when user click on table header. Data sort according
 * the criterion and table reload
 * @param {Event} event
 */
const clickHeaderEvent = event => {
  event.preventDefault();
  const app = document.getElementById('app');
  const eventTargetName = event.target.innerText;
  const sortedData = sortData(data, eventTargetName);

  if (eventTargetName !== 'Card Number') {
    const newTable = createTable(sortedData);
    const headerEls = newTable.querySelectorAll('th');
    const selectedEl = Array.from(headerEls).filter(
      elem => elem.innerText === eventTargetName,
    )[0];
    selectedEl.innerHTML = `<th>${eventTargetName} <span>&#8595;</span></th>`;
    selectedEl.classList.add('info');
    app.innerHTML = '';
    app.appendChild(newTable);
  }
};

/**
 * Change the tbody element, when user type anything in input#search field
 * @param {Event} event
 * @param {Array} data
 */
const inputChangeEvent = (event, data) => {
  const dataCopy = data.slice();
  const inputValue = event.target.value;
  const tbodyElement = document.querySelector('tbody');
  const filteredData = searchByInput(dataCopy, inputValue);
  const tbodyContent = fillTableBody(filteredData);

  tbodyElement.innerHTML = '';
  tbodyElement.appendChild(tbodyContent);
};

export { clickInfoEvent, clickLinkEvent, clickHeaderEvent, inputChangeEvent };
