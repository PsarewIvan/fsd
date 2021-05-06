import Dropdown from './Dropdown';

document.querySelectorAll('.js-dropdown').forEach((item) => {
  const dropdown = new Dropdown(item);
  dropdown.init();
});
