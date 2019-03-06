import createTable from './tasks/Table';
import dataStorage from './tasks/dataStorage';
import data from './tasks/processData';

export default (function() {
  const app = document.getElementById('app');
  data
    .then(result => {
      const table = createTable(dataStorage.ordersData);
      app.appendChild(table);
    })
    .catch(err => console.log(err));
})();
