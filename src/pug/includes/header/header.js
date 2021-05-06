class Header {
  constructor(nav, index) {
    this.LIST_OPEN_CLASS = 'header__nav--open';
    this.BUTTON_OPEN_CLASS = 'header__menu-button--open';
    this.MAIN_LINK_CLASS = 'js-header__main-link';
    this.LINK_PATHNAME = 'landing';
    this.button = nav.querySelector('.js-header__menu-button');
    this.list = nav.querySelector('.js-header__nav');
    this.index = index;
  }

  init() {
    this.addAriaControls();
    this.buttonListener();
    this.clearHrefOnMainLink();
  }

  addAriaControls() {
    this.button.setAttribute('aria-controls', `menu-header-${this.index}`);
    this.list.setAttribute('id', `menu-header-${this.index}`);
  }

  buttonListener() {
    this.button.addEventListener('click', this.handleButtonCLick.bind(this));
  }

  handleButtonCLick() {
    const expanded = this.button.getAttribute('aria-expanded') === 'true';
    this.button.setAttribute('aria-expanded', !expanded);
    expanded
      ? this.button.setAttribute('aria-label', 'Открыть меню')
      : this.button.setAttribute('aria-label', 'Закрыть меню');
    this.button.classList.toggle(this.BUTTON_OPEN_CLASS);
    this.list.classList.toggle(this.LIST_OPEN_CLASS);
  }

  clearHrefOnMainLink() {
    if (window.location.pathname.slice(1, -5) === this.LINK_PATHNAME) {
      document
        .querySelector(`.${this.MAIN_LINK_CLASS}`)
        .removeAttribute('href');
    }
  }
}

export default Header;
