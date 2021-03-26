class HeaderNavigation {
  constructor(nav, index) {
    this.button = nav.querySelector('.js-header__menu-button');
    this.list = nav.querySelector('.js-header__nav');
    this.index = index;
    this.addAriaControls();
    this.buttonListener();
  }

  addAriaControls() {
    this.button.setAttribute('aria-controls', `menu-header-${this.index}`);
    this.list.setAttribute('id', `menu-header-${this.index}`);
  }

  buttonListener() {
    this.button.addEventListener('click', this.buttonHandler.bind(this));
  }

  buttonHandler() {
    const expanded = this.button.getAttribute('aria-expanded') === 'true';
    this.button.setAttribute('aria-expanded', !expanded);
    expanded
      ? this.button.setAttribute('aria-label', 'Открыть меню')
      : this.button.setAttribute('aria-label', 'Закрыть меню');
    this.button.classList.toggle('-open-');
    this.list.classList.toggle('-open-');
  }
}

document.querySelectorAll('.js-header__block').forEach((block, i) => {
  new HeaderNavigation(block, i);
});

if (window.location.pathname.slice(1, -5) === 'landing') {
  document.querySelector('.js-header__main-link').removeAttribute('href');
}
