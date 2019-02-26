import orders from '../../data/orders.json';
import getUserInfo from './task2';

/**
 * Replace digits by *
 * @param {String} bank card number
 */
const transformCardNumber = card => {
  let number = card;
  const secretPart = number.slice(2, -4);
  const replacer = secretPart.replace(/[0-9]/g, '*');
  return number.replace(secretPart, replacer);
};

/**
 * Add 0 before time period if it less then 10
 * @param {Integer} time
 */
const addZero = time => {
  if (time < 10) return `0${time}`;
  return time;
};

/**
 * Convert timestamp to format dd/mm/yyyy, hh:mm:ss
 * @param {String} timestamp
 */
const converDate = timestamp => {
  const time = new Date(timestamp * 1000);

  const day = addZero(time.getDay() + 1);
  const month = addZero(time.getMonth() + 1);
  const year = time.getFullYear();
  const hours = addZero(time.getHours());
  const minutes = addZero(time.getMinutes());
  const seconds = addZero(time.getSeconds());

  const date = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  return date;
};

/**
 * Create thead with headers of columns
 * @param {*} headers
 */
const createTableHead = headers => {
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const th = document.createElement('th');

  headers.map(header => {
    const elem = th.cloneNode(true);
    elem.innerHTML = header;
    tr.appendChild(elem);
    return header;
  });
  thead.appendChild(tr);
  console.log(thead);
  return thead;
};

/**
 * Parse data of every order and create a tr element
 *  which contain td elements with data
 * @param {Object} data
 */
const createTableRow = data => {
  const tr = document.createElement('tr');
  tr.id = `order_${data.id}`;
  const currentOrder = {};
  currentOrder['Transaction ID'] = data['transaction_id'];
  currentOrder['User Info'] = data['user_id'];
  currentOrder['Order Date'] = data['created_at'];
  currentOrder['Order Amount'] = data['total'];
  currentOrder['Card Number'] = data['card_number'];
  currentOrder['Card Type'] = data['card_type'];
  currentOrder['Location'] = `${data['order_country']} (${data['order_ip']})`;

  for (let prop in currentOrder) {
    const td = document.createElement('td');
    if (prop === 'User Info') {
      const val = getUserInfo(currentOrder[prop]);
      td.classList.add('user_data');
      td.appendChild(val);
    } else if (prop === 'Order Date') {
      const val = converDate(currentOrder[prop]);
      td.textContent = val;
    } else if (prop === 'Card Number') {
      const val = transformCardNumber(currentOrder[prop]);
      td.textContent = val;
    } else if (prop === 'Order Amount') {
      const val = `$${currentOrder[prop]}`;
      td.textContent = val;
    } else {
      td.textContent = currentOrder[prop];
    }

    tr.appendChild(td);
  }
  return tr;
};

/**
 * Create an array of tr elements. Every val of array contain all information
 * about the order
 * @param {Array} dataArr
 */
const getOrdersData = dataArr => {
  const orders = dataArr.slice(0);
  const extractedDataArr = orders.map(order => {
    return createTableRow(order);
  });
  return extractedDataArr;
};

/**
 * Create a table with all information about the order
 * @param {Array} tableHeaders
 */
const createTable = tableHeaders => {
  const headers = tableHeaders.slice(0);
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const thead = createTableHead(headers);

  const ordersInRow = getOrdersData(orders);
  ordersInRow.map(row => tbody.appendChild(row));

  table.appendChild(thead);
  table.appendChild(tbody);

  return table;
};

export default createTable;
