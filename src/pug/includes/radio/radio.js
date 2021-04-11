class Radio {
  constructor(radio) {
    this.LABEL_CHECKED_CLASS = 'radio__label--checked';
    this.LABEL_FOCUS_CLASS = 'radio__label--focus';
    this.radio = radio;
    this.inputs = radio.querySelectorAll('.js-radio__input');
    this.labels = radio.querySelectorAll('.js-radio__label');

    this.inputs.forEach((input, i) => {
      this.labelCheckedToggle(this.labels[i], input);
      input.addEventListener('focus', this.handleInputFocus.bind(this, i));
      input.addEventListener('blur', this.handleInputBlur.bind(this, i));
    });
  }

  handleInputFocus(i) {
    this.labels.forEach((label, index) => {
      if (i === index) {
        label.classList.add(this.LABEL_FOCUS_CLASS);
        label.classList.add(this.LABEL_CHECKED_CLASS);
      } else {
        label.classList.remove(this.LABEL_FOCUS_CLASS);
        label.classList.remove(this.LABEL_CHECKED_CLASS);
      }
    });
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

document.querySelectorAll('.js-radio').forEach((radio) => {
  new Radio(radio);
});
