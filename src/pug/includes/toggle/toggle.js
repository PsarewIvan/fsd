class Toggle {
  constructor(toggle) {
    this.LABEL_CHECKED_CLASS = 'toggle__label--checked';
    this.LABEL_FOCUS_CLASS = 'toggle__label--focus';
    this.toggle = toggle;
    this.inputs = toggle.querySelectorAll('.js-toggle__input');
    this.labels = toggle.querySelectorAll('.js-toggle__label');

    this.inputs.forEach((input, i) => {
      this.labelCheckedToggle(this.labels[i], input);
      input.addEventListener('click', this.handleInputClick.bind(this, i));
      input.addEventListener('focus', this.handleInputFocus.bind(this, i));
      input.addEventListener('blur', this.handleInputBlur.bind(this, i));
    });
  }

  handleInputClick(i, evt) {
    this.labelCheckedToggle(this.labels[i], evt.target);
  }

  handleInputFocus(i) {
    this.labels[i].classList.add(this.LABEL_FOCUS_CLASS);
  }

  handleInputBlur(i) {
    this.labels[i].classList.remove(this.LABEL_FOCUS_CLASS);
  }

  labelCheckedToggle(label, input) {
    if (input.checked) {
      label.classList.add(this.LABEL_CHECKED_CLASS);
    } else {
      label.classList.remove(this.LABEL_CHECKED_CLASS);
    }
  }
}

document.querySelectorAll('.js-toggle').forEach((toggle) => {
  new Toggle(toggle);
});
