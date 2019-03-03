import { createTableHead, fillTableBody } from './TableElements';

import { inputChangeEvent } from './events';

const tableHeaders = [
  'Transaction ID',
  'User Info',
  'Order Date',
  'Order Amount',
  'Card Number',
  'Card Type',
  'Location',
];

/**
 * Create a table with all information about the order
 * @param {Array} tableHeaders
 */
const createTable = data => {
  const headers = tableHeaders.slice(0);
  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered', 'table-hover');
  const tbody = document.createElement('tbody');

  const thead = createTableHead(headers);
  tbody.appendChild(fillTableBody(data));

  const inputEl = thead.querySelector('#search');

  table.appendChild(thead);
  table.appendChild(tbody);

  inputEl.addEventListener('input', event => {
    inputChangeEvent(event, data);
  });

  return table;
};

export default createTable;
