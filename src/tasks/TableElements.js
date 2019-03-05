import styles from './styleCreator';
import {
  clickInfoEvent,
  clickLinkEvent,
  clickHeaderEvent,
} from './events/events';
import getStatisticData from './statistic';
import createSelectRateEl from './moneyRates';
import dataStorage from './dataStorage';
import { convertToMoney } from './helper';

const tableHeaders = [
  'Transaction ID',
  'User Info',
  'Order Date',
  'Order Amount',
  'Card Number',
  'Card Type',
  'Location',
];

const createHeadersRow = () => {
  const data = dataStorage.ordersData.slice();
  const headers = tableHeaders.slice();
  const tr = document.createElement('tr');
  const th = document.createElement('th');

  headers.map(header => {
    const elem = th.cloneNode(true);
    elem.classList.add('text-center');
    elem.innerHTML = header;
    if (elem.innerText !== 'Card Number') {
      elem.classList.add('sort-selected');
      elem.style.cssText = styles['sort-selected'];
    }
    tr.appendChild(elem);
    return header;
  });

  tr.addEventListener('click', clickHeaderEvent);
  return tr;
};
/**
 * Create thead with headers of columns
 * @param {*} headers
 */
const createTableHead = () => {
  const thead = document.createElement('thead');
  const searchRow = createSearchInput();
  const tr = createHeadersRow();
  thead.appendChild(searchRow);
  thead.appendChild(tr);
  return thead;
};

/**
 * Create a html element with info about user. By default is hidden
 * @param {Object} user
 */
const appendUserInfo = user => {
  const userClone = user;
  const div = document.createElement('div');
  div.classList.add('user-details');
  div.style.cssText = styles['user-details'];

  const info = {};
  info.birthday = 'Birthday: ';
  if (userClone.birthday) info.birthday += userClone.birthday;

  if (userClone.avatarUrl)
    info.avatar = `<img src ='${
      userClone.avatarUrl
    }' width="100px" class='img-circle'/>`;
  let companyUrl;
  if (userClone.companyUrl) companyUrl = userClone.companyUrl;
  else companyUrl = '';

  if (companyUrl) {
    info.company = `Company: <a href="${companyUrl}" target="_blank">${userClone.companyTitle ||
      'n/a'}</a>`;
  } else {
    info.company = `Company: ${userClone.companyTitle || 'n/a'}`;
  }

  info.industry = `Idustry: ${userClone.industry || 'n/a'}`;

  for (let prop in info) {
    const p = document.createElement('p');
    p.innerHTML = info[prop];
    div.appendChild(p);
  }
  document.addEventListener('click', clickInfoEvent);
  return div;
};

/**
 * Find the certain user in user arr and return <a> elem with user name
 * @param {String} userId
 */
const getUserInfo = user => {
  const userEl = document.createElement('a');
  userEl.setAttribute('href', '#');

  if (user) {
    userEl.innerText = user;
  }
  userEl.addEventListener('click', clickLinkEvent);
  return userEl;
};

/**
 * Create html element 'tr' where every 'td' contains info about order
 * @param {Array} data
 */
const createTableRow = data => {
  const currentOrder = data;
  const tr = document.createElement('tr');
  tr.id = currentOrder.row_id;

  for (let prop in currentOrder) {
    const td = document.createElement('td');
    if (prop === 'row_id') {
      continue;
    }
    if (prop === 'User Info') {
      const user = currentOrder[prop];
      const userName = getUserInfo(user['userName']);
      const additionalInfo = appendUserInfo(user['additionalInfo']);
      td.classList.add('user_data');
      td.appendChild(userName);
      td.appendChild(additionalInfo);
    } else if (prop === 'Order Date') {
      td.textContent = currentOrder[prop];
    } else if (prop === 'Card Number') {
      td.textContent = currentOrder[prop];
    } else if (prop === 'Order Amount') {
      td.textContent = convertToMoney(
        parseFloat(currentOrder[prop]),
        dataStorage.currentCurrensyCode,
      );
    } else {
      td.textContent = currentOrder[prop];
    }

    tr.appendChild(td);
  }
  return tr;
};

/**
 * Return html fragment with statistic data
 */
const createStatisticBlock = data => {
  const statistic = getStatisticData(data);
  const fragment = document.createDocumentFragment();

  for (let prop in statistic) {
    const tr = document.createElement('tr');
    tr.classList.add('statistic-row');
    const td1 = document.createElement('td');
    td1.innerText = prop;
    td1.setAttribute('colspan', 2);
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    td2.innerText = statistic[prop];
    td2.setAttribute('colspan', 5);
    tr.appendChild(td2);
    fragment.appendChild(tr);
  }

  return fragment;
};

/**
 * Create fragment which contains all info about orders.
 * @param {Array} data
 */
const fillTableBody = data => {
  const orders = data.slice();
  const tbodyFragment = document.createDocumentFragment();

  if (orders.length) {
    const ordersInRow = orders.map(order => createTableRow(order));
    ordersInRow.map(row => tbodyFragment.appendChild(row));
  } else {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.setAttribute('colspan', 7);
    td.innerText = 'Nothing found';
    tr.appendChild(td);
    tbodyFragment.appendChild(tr);
  }
  tbodyFragment.appendChild(createStatisticBlock(data));
  return tbodyFragment;
};

/**
 * Create tr element with input field
 */
const createSearchInput = () => {
  const tr = document.createElement('tr');
  const search = document.createElement('th');
  search.innerText = 'Search:';
  search.setAttribute('colspan', 1);
  search.classList.add('text-center', 'lead');
  tr.appendChild(search);

  const input = document.createElement('input');
  const searchInput = document.createElement('th');
  input.id = 'search';
  input.setAttribute('type', 'text');
  input.setAttribute('autofocus', 'autofocus');
  searchInput.appendChild(input);
  searchInput.setAttribute('colspan', 5);
  tr.appendChild(searchInput);
  return tr;
};

const addSelectRate = table => {
  const tr = table.querySelector('tr');
  const th = document.createElement('th');
  tr.appendChild(th);
  createSelectRateEl(th);
};

export {
  createTableHead,
  createTableRow,
  createStatisticBlock,
  fillTableBody,
  addSelectRate,
  createHeadersRow,
};
