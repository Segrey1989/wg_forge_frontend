import {
  sortData,
  changeOrderAmountCurrency,
  changeStatisticCurrency,
} from './event-helper';

import searchByInput from '../search';
import { fillTableBody, createHeadersRow } from '../TableElements';
import dataStorage from '../dataStorage';

/**
 * This event hide additional user information when the div with the info was clicked
 * @param {*} event
 */
const clickInfoEvent = event => {
  const { parentElement } = event.target;
  const els = Array.from(document.querySelectorAll('.user-details'));

  const children = Array.from(parentElement.children);
  const targ = children.filter(child => {
    const cl = Array.from(child.classList);
    return cl.includes('user-details');
  });

  if (!targ.length) els.map(el => (el.style.display = 'none'));
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
 * Event what happen when user click on table header. Data sort according
 * the criterion and table reload
 * @param {Event} event
 */
const clickHeaderEvent = event => {
  event.preventDefault();
  const eventTargetName = event.target.innerText
    .replace(/[^a-zA-Z ]/g, '')
    .trim();
  const sortedData = sortData(eventTargetName);
  const thead = document.querySelector('thead');
  const input = document.querySelector('input');
  input.value = '';

  if (eventTargetName !== 'Card Number') {
    let headerRow = createHeadersRow();
    let previousHeaderRow = document.querySelector('thead tr:last-child');
    const headerEls = headerRow.querySelectorAll('th');

    const selectedEl = Array.from(headerEls).filter(elem => {
      if (elem.innerText === eventTargetName) return elem;
    })[0];

    selectedEl.innerHTML = `<th>${eventTargetName} <span>&#8595;</span></th>`;
    selectedEl.classList.add('info');

    thead.removeChild(previousHeaderRow);
    thead.appendChild(headerRow);

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    tbody.appendChild(fillTableBody(sortedData));
  }
};

/**
 * Change the tbody element, when user type anything in input#search field
 * @param {Event} event
 * @param {Array} data
 */
const inputChangeEvent = event => {
  const dataCopy = dataStorage.ordersData;
  const inputValue = event.target.value;
  const tbodyElement = document.querySelector('tbody');
  const filteredData = searchByInput(dataCopy, inputValue);
  const tbodyContent = fillTableBody(filteredData);

  tbodyElement.innerHTML = '';
  tbodyElement.appendChild(tbodyContent);
};

const changeCurrencyEvent = (event, prev) => {
  const selectedEl = document.querySelector('select');
  var currencyCode = selectedEl.options[selectedEl.selectedIndex];
  dataStorage.currentCurrensyCode = currencyCode.value;
  const currentRate = parseFloat(currencyCode.getAttribute('data-rate'));
  const previousRate = prev;

  changeOrderAmountCurrency(previousRate, currentRate);
  changeStatisticCurrency(previousRate, currentRate);
};

export {
  clickInfoEvent,
  clickLinkEvent,
  clickHeaderEvent,
  inputChangeEvent,
  changeCurrencyEvent,
};
