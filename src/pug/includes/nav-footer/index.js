import NavFooter from './NavFooter';

document.querySelectorAll('.js-nav-footer').forEach((item) => {
  const nav = new NavFooter(item);
  nav.init();
});
