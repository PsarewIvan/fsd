import Nav from './Nav';

document.querySelectorAll('.js-nav__li').forEach((item) => {
  const nav = new Nav(item);
  nav.init();
});
