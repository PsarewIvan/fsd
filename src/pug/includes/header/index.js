import Header from './Header';

document.querySelectorAll('.js-header__block').forEach((item, i) => {
  const header = new Header(item, i);
  header.init();
});
