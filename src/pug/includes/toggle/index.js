import Toggle from './Toggle';

document.querySelectorAll('.js-toggle').forEach((item) => {
  const toggle = new Toggle(item);
  toggle.init();
});
