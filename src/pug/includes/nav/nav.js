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
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  activateMenu() {
    this.linkListener();
    this.isActivate = true;
  }

  linkListener() {
    this.extendLink.addEventListener(
      'click',
      this.handleExtendLinkClick.bind(this)
    );
  }

  handleExtendLinkClick(evt) {
    evt.preventDefault();
    this.extendLink.classList.toggle(this.LINK_OPEN_CLASS);
    this.extendList.classList.toggle(this.LIST_OPEN_CLASS);
    this.extendLink.blur();
  }

  handleWindowResize() {
    if (this.isWindowThin && !this.isActive) {
      this.activateMenu();
    }
    if (!this.isWindowThin && this.isActive) {
      this.deactivateMenu();
    }
  }

  deactivateMenu() {
    this.extendLink.removeEventListener(
      'click',
      this.handleExtendLinkClick.bind(this)
    );
    this.isActivate = false;
  }

  get isWindowThin() {
    return document.documentElement.clientWidth <= this.MIN_WINDOW_WIDTH;
  }
}

document.querySelectorAll('.js-nav__li').forEach((extendList) => {
  new Nav(extendList);
});
