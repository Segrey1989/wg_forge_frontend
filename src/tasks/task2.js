import users from '../../data/users.json';

/**
 * Find the certain user in user arr and return <a> elem with user name
 * @param {Number} userId
 */
const getUserInfo = userId => {
  const usersArr = users.slice(0);

  const userEl = document.createElement('a');
  userEl.setAttribute('href', '#');

  const currentUser = usersArr.find(user => user.id === userId);
  if (currentUser) {
    let userName = `${currentUser['first_name']} ${currentUser['last_name']}`;
    if (currentUser.gender === 'Male') userName = `Mr. ${userName}`;
    else userName = `Ms. ${userName}`;
    userEl.innerText = userName;
  }
  return userEl;
};

export default getUserInfo;
