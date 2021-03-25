class Checkbox {
  constructor(checkbox) {
    this.checkbox = checkbox;
    this.list = checkbox.querySelector('.checkbox__list');
    this.button = checkbox.querySelector('.checkbox__title-button');

    if (this.button) {
      this.openList();
      this.button.addEventListener('click', this.buttonListener.bind(this));
    }
  }

  openList() {
    if (!this.list.classList.contains('display-none')) {
      this.button.classList.add('-open-');
    }
  }

  buttonListener(evt) {
    evt.preventDefault();
    this.list.classList.toggle('display-none');
    this.button.classList.toggle('-open-');
  }
}

document.querySelectorAll('.checkbox').forEach((checkbox) => {
  new Checkbox(checkbox);
});
