(function () {
  const dropdowns = document.querySelectorAll('.dropdown');

  function replaceTag(element, newTag) {
    let elementNew = document.createElement(newTag);
    elementNew.innerHTML = element.innerHTML;

    Array.prototype.forEach.call(element.attributes, attr => {
      elementNew.setAttribute(attr.name, attr.value);
    });

    element.parentNode.insertBefore(elementNew, element);
    element.parentNode.removeChild(element);
    return elementNew;
  }

  function createBtn(aria, content, data) {
    let btnElem = document.createElement('button');
    btnElem.classList.add(`dropdown__button`, `dropdown__button--${aria}`);
    btnElem.setAttribute('type', 'button');
    btnElem.setAttribute('aria-label', aria);
    btnElem.setAttribute('data-value', data);
    btnElem.innerHTML = content;
    return btnElem;
  }

  Array.prototype.forEach.call(dropdowns, dropdown => {
    replaceTag(dropdown.querySelector('.dropdown__drop-button'), 'button');
    let btn = dropdown.querySelector('.dropdown__drop-button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('open');
    btn.innerHTML = `${btn.innerHTML}
      <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true" focusable="false">
        <path d="M10.5938 0.578125L12 1.98438L6 7.98438L0 1.98438L1.40625 0.578125L6 5.17188L10.5938 0.578125Z" fill="#1F2041" fill-opacity="0.5">
      </svg>
    `;

    let dropdownMenu = dropdown.querySelector('.dropdown__menu');
    let dropdownInputs = dropdown.querySelectorAll('.dropdown__input');
    dropdownMenu.hidden = true;
    dropdownMenu.style.position = 'absolute';

    Array.prototype.forEach.call(dropdownInputs, dropdownInput => {
      dropdownInput.parentNode.insertBefore(createBtn('low', '-', 'down'), dropdownInput);
      dropdownInput.parentNode.insertBefore(createBtn('hight', '+', 'up'), dropdownInput.nextSibling);

      if (dropdownInput.value == 0) {
        dropdownInput.previousSibling.setAttribute('disabled', 'true');
      }
    });

    let dropdownCtrl = document.createElement('div');
    dropdownCtrl.classList.add('dropdown__controls');
    dropdownCtrl.innerHTML = `
      <button class="dropdown__button-ctrl dropdown__button-ctrl--clear" type="button" aria-label="Очистить количество гостей">Очистить</button>
      <button class="dropdown__button-ctrl dropdown__button-ctrl--apply" type="button" aria-label="Применить количество гостей">Применить</button>
    `;
    dropdownMenu.appendChild(dropdownCtrl);

    btn.onclick = () => {
      let expanded = btn.getAttribute('aria-expanded') === 'true' || false
      btn.setAttribute('aria-expanded', !expanded)
      btn.classList.toggle('open');
      dropdownMenu.hidden = expanded
    }

    let dropElements = dropdown.querySelectorAll('.dropdown__element');

    // Меняет статус кнопок регулировки количества гостей в зависимости
    // от атрибутов 'min' и 'max'
    function setButtonStatus(element) {
      if (element.value == element.getAttribute('min')) {
        element.previousSibling.setAttribute('disabled', 'true');
      } else element.previousSibling.removeAttribute('disabled');
      if (element.value == element.getAttribute('max')) {
        element.nextSibling.setAttribute('disabled', 'true');
      } else element.nextSibling.removeAttribute('disabled');
    }

    Array.prototype.forEach.call(dropElements, dropElement => {
      let inputElement = dropElement.querySelector('.dropdown__input');

      dropElement.addEventListener('click', (evt) => {
        let inputValue = Number(inputElement.value);

        if (evt.target.dataset.value === 'up') {
          inputElement.value = inputValue + 1;
        }
        if (evt.target.dataset.value === 'down') {
          inputElement.value = inputValue - 1;
        }
        setButtonStatus(inputElement);
      });

      inputElement.addEventListener('change', () => {
        setButtonStatus(inputElement);
      });
    });
  })
})()
