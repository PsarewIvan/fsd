class NavFooter {
  constructor(nav) {
    this.WINDOW_WIDTH_THIN = 870;
    this.MENU_CLASS = 'nav-footer__nav';
    this.BUTTON_CLASS = 'nav-footer__title';
    this.BUTTON_OPEN_CLASS = 'nav-footer__title--open';
    this.MENU_OPEN_CLASS = 'nav-footer__nav--open';
    this.nav = nav;
    this.isActive = false;
    this.menu = nav.querySelector(`.js-${this.MENU_CLASS}`);
  }

  init() {
    if (this.isWindowThin) {
      this.activateMenu();
    }
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  activateMenu() {
    this.replaceTag();
    this.isActive = true;
    const button = this.nav.querySelector(`.js-${this.BUTTON_CLASS}`);
    button.addEventListener('click', this.handleButtonClick.bind(this, button));
  }

  handleButtonClick(button, evt) {
    evt.preventDefault();
    button.blur();
    button.classList.toggle(this.BUTTON_OPEN_CLASS);
    this.menu.classList.toggle(this.MENU_OPEN_CLASS);
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
    this.replaceTag();
    this.isActive = false;
  }

  replaceTag() {
    const pageElement = this.nav.querySelector(`.js-${this.BUTTON_CLASS}`);
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
    button.classList.add(this.BUTTON_CLASS, `js-${this.BUTTON_CLASS}`);
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', 'Открыть меню');
    return button;
  }

  createHeading() {
    const heading = document.createElement('h4');
    heading.classList.add(this.BUTTON_CLASS, `js-${this.BUTTON_CLASS}`);
    return heading;
  }

  get isWindowThin() {
    return document.documentElement.clientWidth <= this.WINDOW_WIDTH_THIN;
  }
}

export default NavFooter;
