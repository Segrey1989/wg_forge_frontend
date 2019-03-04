import createTable from './tasks/Table';
import data from './tasks/processData';

export default (function() {
  const app = document.getElementById('app');
  data
    .then(result => {
      const table = createTable(result);
      app.appendChild(table);
    })
    .catch(err => console.log(err));
})();
