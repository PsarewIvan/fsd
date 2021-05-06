class Toggle {
  constructor(root) {
    this.LABEL_CHECKED_CLASS = 'toggle__label--checked';
    this.LABEL_FOCUS_CLASS = 'toggle__label--focus';
    this.root = root;
    this.inputs = root.querySelectorAll('.js-toggle__input');
    this.labels = root.querySelectorAll('.js-toggle__label');
  }

  init() {
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

export default Toggle;
