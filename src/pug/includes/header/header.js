class HeaderNavigation {
  constructor(nav) {
    this.button = nav.querySelector('.js-header__menu-button');
    this.list = nav.querySelector('.js-header__nav');
    this.buttonListener();
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

document.querySelectorAll('.js-header__block').forEach((block) => {
  new HeaderNavigation(block);
});
