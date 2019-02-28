import styles from './styleCreator';
import { clickInfoEvent, clickLinkEvent, clickHeaderEvent } from './events';

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
    if (elem.innerText !== 'Card Number') {
      elem.classList.add('sort-selected');
      elem.style.cssText = styles['sort-selected'];
    }
    tr.appendChild(elem);
    return header;
  });
  thead.appendChild(tr);

  thead.addEventListener('click', clickHeaderEvent);
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
    info.avatar = `<img src ='${userClone.avatarUrl}' width="100px"/>`;
  let companyUrl;
  if (userClone.companyUrl) companyUrl = userClone.companyUrl;
  else companyUrl = '#';

  info.company = `Company: <a href="${companyUrl}" target="_blank">${
    userClone.companyTitle
  }</a>`;
  info.industry = `Idustry: ${userClone.industry}`;

  for (let prop in info) {
    const p = document.createElement('p');
    p.innerHTML = info[prop];
    div.appendChild(p);
  }
  div.addEventListener('click', clickInfoEvent);
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
      td.textContent = currentOrder[prop];
    } else {
      td.textContent = currentOrder[prop];
    }

    tr.appendChild(td);
  }
  return tr;
};

export { createTableHead, createTableRow };
