/**
 * This event hide additional user information when the div with the info was clicked
 * @param {*} event
 */
const clickInfoEvent = event => {
  const { parentElement } = event.target;
  const classList = Array.from(parentElement.classList);
  if (classList.includes('user-details')) {
    parentElement.style.display = 'none';
  }
};

/**
 * Event which generated when the link in User Info column was clicked
 * @param {*} event
 */
const clickLinkEvent = event => {
  event.preventDefault();
  const nextDivElement = event.target.nextElementSibling;

  if (nextDivElement.style.display === 'none') {
    nextDivElement.style.display = 'block';
  } else {
    nextDivElement.style.display = 'none';
  }
};

export { clickInfoEvent, clickLinkEvent };
