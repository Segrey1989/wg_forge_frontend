import createTable from './tasks/task1';

const tableHeaders = [
  'Transaction ID',
  'User Info',
  'Order Date',
  'Order Amount',
  'Card Number',
  'Card Type',
  'Location',
];

export default (function() {
  const app = document.getElementById('app');
  const table = createTable(tableHeaders);
  app.appendChild(table);
})();
