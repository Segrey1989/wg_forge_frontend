import { createTableHead, createTableRow } from './TableElements';

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
  const orders = data.slice(0);
  const headers = tableHeaders.slice(0);
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const thead = createTableHead(headers);

  const ordersInRow = orders.map(order => createTableRow(order));
  ordersInRow.map(row => tbody.appendChild(row));

  table.appendChild(thead);
  table.appendChild(tbody);

  return table;
};

export default createTable;
