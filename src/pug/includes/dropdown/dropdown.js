class Dropdown {
  constructor(dropdown) {
    this.DROP_BUTTON_CLASS = 'dropdown__drop-button';
    this.MENU_CLASS = 'dropdown__menu';
    this.CTRL_BUTTON_CLASS = 'dropdown__button-ctrl';
    this.dropdown = dropdown;
    this.button = dropdown.querySelector('.js-dropdown__drop-button');
    this.menu = dropdown.querySelector('.js-dropdown__menu');
    this.valueInputs = dropdown.querySelectorAll('.js-dropdown__input');
    this.declensions = this.getDeclensions();
    this.buttonClear = this.createButton(
      '',
      'Очистить',
      'button-ctrl',
      'clear'
    );
    this.applyButton = this.createButton(
      '',
      'Применить',
      'button-ctrl',
      'apply'
    );
    this.overlay = this.createOverlay();
    this.clearNoJSClasses();
    this.activateButtonAttribute();
    this.addValueButtons();
    this.addControlButtons();
    if (this.menuStatus === 'true') {
      this.toggleMenu();
    }
    this.addListeners();
    this.activateValueButtons();
  }

  activateButtonAttribute() {
    this.button.setAttribute('tabindex', '0');
    this.button.removeAttribute('aria-visible');
  }

  clearNoJSClasses() {
    this.button.classList.remove(`${this.DROP_BUTTON_CLASS}--no-js`);
    this.menu.classList.remove(`${this.MENU_CLASS}--no-js`);
  }

  addValueButtons() {
    this.valueInputs.forEach((input) => {
      const downButton = this.createButton('меньше', '-', 'button', 'down');
      const upButton = this.createButton('больше', '+', 'button', 'hight');
      input.before(downButton);
      input.after(upButton);
    });
  }

  addControlButtons() {
    if (this.button.dataset.button === 'true') {
      const controlWrapper = document.createElement('div');
      controlWrapper.classList.add('dropdown__controls');
      controlWrapper.append(this.buttonClear, this.applyButton);
      this.menu.append(controlWrapper);
    }
  }

  addListeners() {
    this.button.addEventListener('click', this.handleMenuClick.bind(this));
    this.overlay.addEventListener('click', this.handleMenuClick.bind(this));
    this.valueInputs.forEach((input) => {
      const lowButton = input.previousSibling;
      const hightButton = input.nextSibling;
      lowButton.addEventListener(
        'click',
        this.handleValueButtonClick.bind(input)
      );
      hightButton.addEventListener(
        'click',
        this.handleValueButtonClick.bind(input)
      );
      input.addEventListener(
        'change',
        this.handleInputChange.bind(this, input)
      );
    });
    this.applyButton.addEventListener('click', this.handleMenuClick.bind(this));
    this.buttonClear.addEventListener(
      'click',
      this.handleClearButtonClick.bind(this)
    );
  }

  handleMenuClick(evt) {
    evt.preventDefault();
    const dataOpen = this.menuStatus === 'true' ? 'false' : 'true';
    this.button.dataset.open = dataOpen;
    this.toggleMenu();
    this.toggleOverlay();
  }

  handleValueButtonClick(evt) {
    const currentValue = Number(this.value);
    const min = this.min ? Number(this.min) : 0;
    const max = this.max ? Number(this.max) : Infinity;
    let newValue;
    switch (evt.target) {
      case this.previousSibling:
        newValue = currentValue - 1;
        break;
      case this.nextSibling:
        newValue = currentValue + 1;
        break;
    }
    const isNewValueInRange = min <= newValue <= max;
    if (isNewValueInRange) {
      this.value = newValue;
    }
    this.dispatchEvent(new Event('change'));
  }

  handleInputChange(input) {
    this.buttonsDisabledSwitcher(input);
    this.toggleCLearButton();
    this.changeLabelText();
  }

  buttonsDisabledSwitcher(input) {
    const max = input.max ? Number(input.max) : Infinity;
    const min = input.min ? Number(input.min) : 0;
    const isBigger = Number(input.value) >= max;
    const isLower = Number(input.value) <= min;
    if (isBigger) {
      input.nextSibling.disabled = true;
    } else {
      input.nextSibling.disabled = false;
    }
    if (isLower) {
      input.previousSibling.disabled = true;
    } else {
      input.previousSibling.disabled = false;
    }
  }

  toggleCLearButton() {
    if (this.isInputsValueOnMin) {
      this.buttonClear.classList.add(`${this.CTRL_BUTTON_CLASS}--disabled`);
    } else {
      this.buttonClear.classList.remove(`${this.CTRL_BUTTON_CLASS}--disabled`);
    }
  }

  handleClearButtonClick() {
    this.valueInputs.forEach((input) => {
      input.value = input.min || '0';
      input.dispatchEvent(new Event('change'));
    });
  }

  changeLabelText() {
    let labelText = '';
    let sum = 0;
    this.valueInputs.forEach((input) => {
      sum += Number(input.value);
    });
    if (sum === 0) {
      labelText = this.button.dataset.defaultLabel;
    } else {
      labelText =
        this.commonInputsDeclension(sum) || this.multiInputsDeclension();
    }
    this.button.innerHTML = labelText;
  }

  commonInputsDeclension(sum) {
    if (this.declensions.length === 1) {
      return `${sum} ${this.getWordDeclension(sum, this.declensions[0])}`;
    }
  }

  multiInputsDeclension() {
    let labelText = '';
    if (this.declensions.length > 1) {
      let isFirstChange = true;
      this.valueInputs.forEach((input, i) => {
        if (!isFirstChange) {
          labelText += `, `;
        }
        isFirstChange = false;
        labelText += `${input.value} ${this.getWordDeclension(
          Number(input.value),
          this.declensions[i]
        )}`;
      });
    }
    return labelText;
  }

  getDeclensions() {
    const declensions = [];
    if (this.button.dataset.declension) {
      declensions.push(this.stringDecompose(this.button.dataset.declension));
    } else {
      this.valueInputs.forEach((input) => {
        declensions.push(this.stringDecompose(input.dataset.declension));
      });
    }
    return declensions;
  }

  stringDecompose(string) {
    return string.replace(/\s/g, '').split(',');
  }

  toggleOverlay() {
    if (this.menuStatus === 'true') {
      this.dropdown.append(this.overlay);
    } else {
      this.overlay.remove();
    }
  }

  toggleMenu() {
    this.button.classList.toggle(`${this.DROP_BUTTON_CLASS}--open`);
    this.menu.classList.toggle(`${this.MENU_CLASS}--open`);
  }

  activateValueButtons() {
    this.valueInputs.forEach((input) => {
      input.dispatchEvent(new Event('change'));
    });
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('dropdown__overlay');
    return overlay;
  }

  createButton(aria, content, classElement, classModificator) {
    const btnElem = document.createElement('button');
    btnElem.classList.add(
      `dropdown__${classElement}`,
      `dropdown__${classElement}--${classModificator}`
    );
    btnElem.setAttribute('type', 'button');
    btnElem.setAttribute('aria-label', aria);
    btnElem.innerHTML = content;
    return btnElem;
  }

  getWordDeclension(n, declensions) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) return declensions[2];
    if (n1 > 1 && n1 < 5) return declensions[1];
    if (n1 == 1) return declensions[0];
    return declensions[2];
  }

  get menuStatus() {
    return this.button.dataset.open;
  }

  get isInputsValueOnMin() {
    let isMin = true;
    this.valueInputs.forEach((input) => {
      if (input.value !== (input.min || '0')) {
        isMin = false;
      }
    });
    return isMin;
  }
}

document.querySelectorAll('.js-dropdown').forEach((dropdown) => {
  new Dropdown(dropdown);
});
