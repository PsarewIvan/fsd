import IMask from 'imask';

class InputField {
  constructor(root) {
    this.root = root;
    this.maskOptions = {
      mask: Date,
    };
  }

  init() {
    this.mask = IMask(this.root, this.maskOptions);
  }
}

export default InputField;
