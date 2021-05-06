import Checkbox from './Checkbox';

document.querySelectorAll('.js-checkbox').forEach((item) => {
  const checkbox = new Checkbox(item);
  checkbox.init();
});
