import { createTableHead, fillTableBody, addSelectRate } from './TableElements';
import { inputChangeEvent } from './events/events';

/**
 * Create a table with all information about the order
 * @param {Array} tableHeaders
 */
const createTable = data => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered', 'table-hover');
  const tbody = document.createElement('tbody');

  const thead = createTableHead();
  tbody.appendChild(fillTableBody(data));

  const inputEl = thead.querySelector('#search');

  table.appendChild(thead);
  table.appendChild(tbody);

  addSelectRate(table);

  inputEl.addEventListener('input', inputChangeEvent);
  return table;
};

export default createTable;
