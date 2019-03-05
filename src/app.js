import createTable from './tasks/Table';
import dataStorage from './tasks/dataStorage';
import data from './tasks/processData';

// import { changeCurrencyEvent } from './tasks/events';

export default (function() {
  const app = document.getElementById('app');
  data
    .then(result => {
      // console.log(result.length);
      const table = createTable(dataStorage.ordersData);
      app.appendChild(table);
    })
    .catch(err => console.log(err));
})();
