class NavFooter {
  constructor(nav) {
    this.nav = nav;
    this.WINDOW_WIDTH_THIN = 870;
    this.isActive = false;
    this.menu = nav.querySelector('.js-nav-footer__nav');
    if (this.isWindowThin) {
      this.activateMenu();
    }
    this.windowListener();
  }

  buttonListener() {
    const button = this.nav.querySelector('.js-nav-footer__title');
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      button.blur();
      button.classList.toggle('-open-');
      this.menu.classList.toggle('-open-');
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

  activateMenu() {
    this.replaceTag();
    this.buttonListener();
    this.isActive = true;
  }

  deactivateMenu() {
    this.replaceTag();
    this.isActive = false;
  }

  replaceTag() {
    const pageElement = this.nav.querySelector('.js-nav-footer__title');
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
    button.classList.add('nav-footer__title', 'js-nav-footer__title');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', 'Открыть меню');
    return button;
  }

  createHeading() {
    const heading = document.createElement('h4');
    heading.classList.add('nav-footer__title', 'js-nav-footer__title');
    return heading;
  }

  get isWindowThin() {
    return document.documentElement.clientWidth <= this.WINDOW_WIDTH_THIN;
  }
}

document.querySelectorAll('.js-nav-footer').forEach((nav) => {
  new NavFooter(nav);
});
