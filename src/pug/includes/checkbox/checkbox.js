class Checkbox {
  constructor(checkbox) {
    this.LABEL_CHECKED_CLASS = 'checkbox__label--checked';
    this.LABEL_FOCUS_CLASS = 'checkbox__label--focus';
    this.HIDDEN_LIST_CLASS = 'checkbox__list--hidden';
    this.BUTTON_OPEN_CLASS = 'checkbox__title-button--open';
    this.checkbox = checkbox;
    this.list = checkbox.querySelector('.js-checkbox__list');
    this.button = checkbox.querySelector('.js-checkbox__title-button');
    this.inputs = checkbox.querySelectorAll('.js-checkbox__input');
    this.labels = checkbox.querySelectorAll('.js-checkbox__label');

    this.inputs.forEach((input, i) => {
      this.labelCheckedToggle(this.labels[i], input);
      input.addEventListener('click', this.inputClickHandler.bind(this, i));
      input.addEventListener('focus', this.inputFocusHandler.bind(this, i));
      input.addEventListener('blur', this.inputBlurHandler.bind(this, i));
    });

    if (this.button) {
      this.openList();
      this.button.addEventListener('click', this.buttonHandler.bind(this));
    }
  }

  inputClickHandler(i, evt) {
    this.labelCheckedToggle(this.labels[i], evt.target);
  }

  inputFocusHandler(i) {
    this.labels[i].classList.add(this.LABEL_FOCUS_CLASS);
  }

  inputBlurHandler(i) {
    this.labels[i].classList.remove(this.LABEL_FOCUS_CLASS);
  }

  labelCheckedToggle(label, input) {
    if (input.checked) {
      label.classList.add(this.LABEL_CHECKED_CLASS);
    } else {
      label.classList.remove(this.LABEL_CHECKED_CLASS);
    }
  }

  openList() {
    if (!this.list.classList.contains(this.HIDDEN_LIST_CLASS)) {
      this.button.classList.add(this.BUTTON_OPEN_CLASS);
    }
  }

  buttonHandler(evt) {
    evt.preventDefault();
    this.list.classList.toggle(this.HIDDEN_LIST_CLASS);
    this.button.classList.toggle(this.BUTTON_OPEN_CLASS);
  }
}

document.querySelectorAll('.js-checkbox').forEach((checkbox) => {
  new Checkbox(checkbox);
});
