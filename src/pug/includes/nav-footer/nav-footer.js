class NavFooter {
  constructor(nav) {
    this.WINDOW_WIDTH_THIN = 870;
    this.JS_MENU_CLASS = 'js-nav-footer__nav';
    this.JS_BUTTON_CLASS = 'js-nav-footer__title';
    this.BUTTON_CLASS = 'nav-footer__title';
    this.BUTTON_OPEN_CLASS = 'nav-footer__title--open';
    this.MENU_OPEN_CLASS = 'nav-footer__nav--open';
    this.nav = nav;
    this.isActive = false;
    this.menu = nav.querySelector(`.${this.JS_MENU_CLASS}`);
    if (this.isWindowThin) {
      this.activateMenu();
    }
    this.windowListener();
  }

  activateMenu() {
    this.replaceTag();
    this.buttonListener();
    this.isActive = true;
  }

  deactivateMenu() {
    this.replaceTag();
    this.isActive = false;
  }

  buttonListener() {
    const button = this.nav.querySelector(`.${this.JS_BUTTON_CLASS}`);
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      button.blur();
      button.classList.toggle(this.BUTTON_OPEN_CLASS);
      this.menu.classList.toggle(this.MENU_OPEN_CLASS);
    });
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

  replaceTag() {
    const pageElement = this.nav.querySelector(`.${this.JS_BUTTON_CLASS}`);
    let insertElement;
    if (!this.isActive) {
      insertElement = this.createButton();
    }
    if (this.isActive) {
      insertElement = this.createHeading();
    }
    insertElement.innerHTML = pageElement.innerHTML;
    pageElement.after(insertElement);
    pageElement.remove();
  }

  createButton() {
    const button = document.createElement('button');
    button.classList.add(this.BUTTON_CLASS, this.JS_BUTTON_CLASS);
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', 'Открыть меню');
    return button;
  }

  createHeading() {
    const heading = document.createElement('h4');
    heading.classList.add(this.BUTTON_CLASS, this.JS_BUTTON_CLASS);
    return heading;
  }

  get isWindowThin() {
    return document.documentElement.clientWidth <= this.WINDOW_WIDTH_THIN;
  }
}

document.querySelectorAll('.js-nav-footer').forEach((nav) => {
  new NavFooter(nav);
});
