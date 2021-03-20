class Nav {
  constructor(nav) {
    this.nav = nav;
    this.MIN_WINDOW_WIDTH = 980;
    this.navLists = this.nav.querySelectorAll('.js-nav__li');
    this.exLinks = this.nav.querySelectorAll('.js-nav__extend-link');
    this.clearCurrentLink();
    if (this.isTouchEnabled || !this.isWindowWide) {
      this.navLists.forEach((li) => {
        this.toggleClassMod(li);
      });
      this.exLinks.forEach((exLink) => {
        this.exLinkListener(exLink);
      });
    }
  }

  clearCurrentLink() {
    const navLink = this.nav.querySelector('.nav__link--current');
    navLink ? navLink.removeAttribute('href') : null;
  }

  exLinkListener(exLink) {
    exLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.toggleMenu(exLink);
      exLink.blur();
    });
  }

  toggleMenu(exLink) {
    exLink.classList.toggle('-active-');
    exLink.nextElementSibling.classList.toggle('-open-');
  }

  toggleClassMod(li) {
    li.classList.toggle('-touch-');
    const exLink = li.querySelector('.js-nav__extend-link');
    exLink ? exLink.classList.toggle('-touch-') : null;
  }

  get isTouchEnabled() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  get isWindowWide() {
    return document.documentElement.clientWidth > this.MIN_WINDOW_WIDTH;
  }
}

document.querySelectorAll('.js-nav').forEach((nav) => {
  new Nav(nav);
});
