class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.button = dropdown.querySelector('.js-dropdown__drop-button');
    this.menu = dropdown.querySelector('.js-dropdown__menu');
    this.valueInputs = dropdown.querySelectorAll('.js-dropdown__input');
    this.totalValue = 0;
    this.clearButton = this.createButton(
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
    this.clearNoJSClass();
    this.activateButtonAttribute();
    this.addValueButtons();
    this.addControlButtons();
    this.openMenu();
    this.addListeners();
    this.activateValueButtons();
  }

  activateButtonAttribute() {
    this.button.setAttribute('tabindex', '0');
    this.button.setAttribute('aria-visible', 'true');
  }

  clearNoJSClass() {
    this.button.classList.remove('-no-js-');
    this.menu.classList.remove('-no-js-');
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
      controlWrapper.append(this.clearButton, this.applyButton);
      this.menu.append(controlWrapper);
    }
  }

  toggleCLearButton() {
    if (this.isInputsEmpty) {
      this.clearButton.classList.add('-disabled-');
    } else {
      this.clearButton.classList.remove('-disabled-');
    }
  }

  addListeners() {
    this.button.addEventListener('click', this.buttonListener.bind(this));
    this.overlay.addEventListener('click', this.buttonListener.bind(this));
    this.valueInputs.forEach((input) => {
      input.previousSibling.addEventListener(
        'click',
        this.downButtonListener.bind(input)
      );
      input.nextSibling.addEventListener(
        'click',
        this.upButtonListener.bind(input)
      );
      input.addEventListener('change', this.valueInputListener.bind(input));
      input.addEventListener('change', this.toggleCLearButton.bind(this));
    });
    this.applyButton.addEventListener('click', this.buttonListener.bind(this));
    this.clearButton.addEventListener(
      'click',
      this.clearButtonListener.bind(this)
    );
  }

  buttonListener(evt) {
    evt.preventDefault();
    this.toggleMenu();
    this.toggleOverlay();
  }

  downButtonListener() {
    const currentValue = Number(this.value);
    const min = this.min ? Number(this.min) : 0;
    if (currentValue - 1 >= min) {
      this.value = currentValue - 1;
    }
    this.dispatchEvent(new Event('change'));
    this.totalValue -= 1;
  }

  upButtonListener() {
    const currentValue = Number(this.value);
    const max = this.max ? Number(this.max) : Infinity;
    if (currentValue + 1 <= max) {
      this.value = currentValue + 1;
    }
    this.dispatchEvent(new Event('change'));
    this.totalValue += 1;
  }

  valueInputListener() {
    const max = this.max ? Number(this.max) : Infinity;
    const min = this.min ? Number(this.min) : 0;
    const isBigger = Number(this.value) >= max;
    const isLower = Number(this.value) <= min;
    if (isBigger) {
      this.nextSibling.disabled = true;
    } else {
      this.nextSibling.disabled = false;
    }
    if (isLower) {
      this.previousSibling.disabled = true;
    } else {
      this.previousSibling.disabled = false;
    }
  }

  clearButtonListener() {
    this.valueInputs.forEach((input) => {
      input.value = 0;
      input.dispatchEvent(new Event('change'));
    });
  }

  toggleMenu() {
    const dataOpen = this.menuStatus === 'true' ? 'false' : 'true';
    this.button.dataset.open = dataOpen;
    this.button.classList.toggle('-open-');
    this.menu.classList.toggle('-open-');
  }

  toggleOverlay() {
    if (this.menuStatus === 'true') {
      this.dropdown.append(this.overlay);
    } else {
      this.overlay.remove();
    }
  }

  openMenu() {
    if (this.menuStatus === 'true') {
      this.button.classList.toggle('-open-');
      this.menu.classList.toggle('-open-');
    }
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

  get menuStatus() {
    return this.button.dataset.open;
  }

  get isInputsEmpty() {
    let isEmpty = true;
    this.valueInputs.forEach((input) => {
      if (input.value !== '0') {
        isEmpty = false;
      }
    });
    return isEmpty;
  }
}

document.querySelectorAll('.js-dropdown').forEach((dropdown) => {
  new Dropdown(dropdown);
});
