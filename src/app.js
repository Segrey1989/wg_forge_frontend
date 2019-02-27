import createTable from './tasks/Table';
import data from './tasks/processData';

export default (function() {
  const app = document.getElementById('app');
  const table = createTable(data);
  app.appendChild(table);
})();
