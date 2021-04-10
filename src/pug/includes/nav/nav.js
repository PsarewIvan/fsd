class Nav {
  constructor(list) {
    this.MIN_WINDOW_WIDTH = 980;
    this.LINK_OPEN_CLASS = 'nav__extend-link--open';
    this.LIST_OPEN_CLASS = 'nav__list--open';
    this.list = list;
    this.extendList = this.list.querySelector('.js-nav__list--extend-wrapper');
    this.extendLink = this.list.querySelector('.js-nav__extend-link');
    this.isActivate = false;
    if (this.isWindowThin) {
      this.activateMenu();
    }
    this.windowListener();
  }

  activateMenu() {
    this.linkListener();
    this.isActivate = true;
  }

  deactivateMenu() {
    this.extendLink.removeEventListener('click', this.linkHandler.bind(this));
    this.isActivate = false;
  }

  linkListener() {
    this.extendLink.addEventListener('click', this.linkHandler.bind(this));
  }

  linkHandler(evt) {
    evt.preventDefault();
    this.extendLink.classList.toggle(this.LINK_OPEN_CLASS);
    this.extendList.classList.toggle(this.LIST_OPEN_CLASS);
    this.extendLink.blur();
  }

  windowListener() {
    window.addEventListener('resize', () => {
      if (this.isWindowThin && !this.isActive) {
        this.activateMenu();
      }
      if (!this.isWindowThin && this.isActive) {
        this.deactivateMenu();
      }
    });
  }

  get isWindowThin() {
    return document.documentElement.clientWidth <= this.MIN_WINDOW_WIDTH;
  }
}

document.querySelectorAll('.js-nav__li').forEach((extendList) => {
  new Nav(extendList);
});
