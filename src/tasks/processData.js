import { convertDate, transformCardNumber } from './helper';
import dataStorage from './dataStorage';
/**
 * Take array of strings as parameter and return array of links
 * for fetch data
 * @param {Array} arr
 */
const makeUrlArr = arr => {
  if (arr.length) {
    const urls = arr.map(name => {
      if (typeof name === 'string')
        return `http://localhost:9000/api/${name}.json`;
    });
    return urls;
  }
  return [];
};

/**
 * Return user with a specific id from array of users
 * @param {Number} userId
 */
const findUser = (users, userId) => {
  const usersArr = users.slice(0);
  const currentUser = usersArr.find(user => user.id === userId);
  return currentUser;
};

/**
 * Return the company with a specific id from the companies array
 * @param {Number} companyId
 */
const findCompany = (companies, companyId) => {
  const companiesClone = companies.slice(0);
  const currentCompany = companiesClone.find(
    company => company.id === companyId,
  );
  return currentCompany;
};

/**
 * Gather all information about user and return the object with the info
 * @param {Object} user
 */
const appendUserInfo = (companies, user) => {
  const userClone = user;
  const companyId = userClone.company_id;
  const company = findCompany(companies, companyId);

  const info = {};
  if (userClone.birthday)
    info.birthday = convertDate(userClone.birthday).slice(0, 10);

  if (userClone.avatar) info.avatarUrl = `${userClone.avatar}`;
  if (company) {
    let companyUrl;
    if (company.url) companyUrl = company.url;
    else companyUrl = '#';
    info.companyUrl = `${companyUrl}`;
    info.companyTitle = company.title;
    info.industry = `${company.industry}/${company.sector}`;
  }
  return info;
};

/**
 * Return the object with setted field of user name
 * @param {Object} user
 */
const getUserInfo = user => {
  const currentUser = user;
  const userData = {};

  if (currentUser) {
    let userName = `${currentUser['first_name']} ${currentUser['last_name']}`;
    if (currentUser.gender === 'Male') userName = `Mr. ${userName}`;
    else userName = `Ms. ${userName}`;
    userData.userName = userName;
    userData.gender = currentUser.gender;
  }
  return userData;
};

/**
 * Get the all information about every order and return the array with
 * objects of full order information
 */
const processOrders = (orders, users, companies) => {
  const ordersCopy = orders.slice(0);
  const processedOrdersArr = [];
  ordersCopy.map(data => {
    const currentOrder = {};
    currentOrder.row_id = `order_${data.id}`;
    currentOrder['Transaction ID'] = data['transaction_id'];
    currentOrder['User Info'] = data['user_id'];
    currentOrder['Order Date'] = convertDate(data['created_at']);
    currentOrder['Order Amount'] = data['total'];
    currentOrder['Card Number'] = transformCardNumber(data['card_number']);
    currentOrder['Card Type'] = data['card_type'];
    currentOrder['Location'] = `${data['order_country']} (${data['order_ip']})`;

    const currentUser = findUser(users, currentOrder['User Info']);
    const user = getUserInfo(currentUser);
    currentOrder['User Info'] = user;
    currentOrder['User Info']['additionalInfo'] = appendUserInfo(
      companies,
      currentUser,
    );
    processedOrdersArr.push(currentOrder);
  });
  return processedOrdersArr;
};

const urls = makeUrlArr(['orders', 'companies', 'users']);
const data = Promise.all(
  urls.map(url =>
    fetch(url).then(resp => {
      if (resp.ok) return resp.json();
      throw new Error('Problem to fetch the data');
    }),
  ),
)
  .then(dataArr => {
    const orders = dataArr[0];
    const companies = dataArr[1];
    const users = dataArr[2];
    const ordersData = processOrders(orders, users, companies);
    dataStorage.ordersData = ordersData;
    return ordersData;
  })
  .catch(err => console.log(err));

export default data;
