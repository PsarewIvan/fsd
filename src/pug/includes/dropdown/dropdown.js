(function () {

  // -- start -- Находим все выпадающие списки

  const dropdowns = document.querySelectorAll('.dropdown');

  // -- end --

  // -- start -- Функции для создания элементов

  function replaceTag(element, newTag) {
    const elementNew = document.createElement(newTag);
    elementNew.innerHTML = element.innerHTML;

    Array.prototype.forEach.call(element.attributes, attr => {
      elementNew.setAttribute(attr.name, attr.value);
    });

    element.parentNode.insertBefore(elementNew, element);
    element.parentNode.removeChild(element);
    return elementNew;
  }

  function createBtn(aria, content, data) {
    const btnElem = document.createElement('button');
    btnElem.classList.add(`dropdown__button`, `dropdown__button--${aria}`);
    btnElem.setAttribute('type', 'button');
    btnElem.setAttribute('aria-label', aria);
    btnElem.setAttribute('data-value', data);
    btnElem.innerHTML = content;
    return btnElem;
  }

  // -- end --

  // -- start -- Добавляем логику для каждого выпадающего меню

  dropdowns.forEach( (dropdown) => {

    // --start -- Функции

    // Скрытие/показ меню
    function toggleVisibilityDropMenu(menuBtn, dropMenu) {
      let expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
      menuBtn.setAttribute('aria-expanded', !expanded);
      menuBtn.classList.toggle('open');
      dropMenu.hidden = expanded;
    }

    // Создание оверлея (для закрытия меню при клике вне его)
    function createOverlay() {
      const overlay = document.createElement('div');
      overlay.classList.add('dropdown__overlay');
      return overlay;
    }

    // -- end --

    // -- start -- Замена верстки

    replaceTag(dropdown.querySelector('.dropdown__drop-button'), 'button');
    const btn = dropdown.querySelector('.dropdown__drop-button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('open');
    btn.innerHTML = `${btn.innerHTML}
      <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true" focusable="false">
        <path d="M10.5938 0.578125L12 1.98438L6 7.98438L0 1.98438L1.40625 0.578125L6 5.17188L10.5938 0.578125Z" fill="#1F2041" fill-opacity="0.5">
      </svg>
    `;

    const dropdownMenu = dropdown.querySelector('.dropdown__menu');
    const dropdownInputs = dropdown.querySelectorAll('.dropdown__input');
    dropdownMenu.hidden = true;
    dropdownMenu.style.position = 'absolute';

    dropdownInputs.forEach( (dropdownInput) => {
      dropdownInput.parentNode.insertBefore(createBtn('low', '-', 'down'), dropdownInput);
      dropdownInput.parentNode.insertBefore(createBtn('hight', '+', 'up'), dropdownInput.nextSibling);

      if (dropdownInput.value == 0) {
        dropdownInput.previousSibling.setAttribute('disabled', 'true');
      }
    });

    const dropdownCtrl = document.createElement('div');
    dropdownCtrl.classList.add('dropdown__controls');
    dropdownCtrl.innerHTML = `
      <button class="dropdown__button-ctrl dropdown__button-ctrl--clear" type="button" aria-label="Очистить количество гостей">Очистить</button>
      <button class="dropdown__button-ctrl dropdown__button-ctrl--apply" type="button" aria-label="Применить количество гостей">Применить</button>
    `;
    dropdownMenu.appendChild(dropdownCtrl);

    // -- end --

    // -- start -- Логика визуализации выпадающего меню

    if (btn.dataset.open === "true") {
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.toggle('open');
      dropdownMenu.hidden = false;
    } else {
      btn.addEventListener('click', function() {
        toggleVisibilityDropMenu(btn, dropdownMenu);
        const overlay = createOverlay();
        document.body.append(overlay);
        overlay.addEventListener('click', () => {
          toggleVisibilityDropMenu(btn, dropdownMenu);
          overlay.remove();
        });
      });

      dropdown.querySelector('.dropdown__button-ctrl--apply').addEventListener('click', function() {
        document.querySelector('.dropdown__overlay').remove();
        toggleVisibilityDropMenu(btn, dropdownMenu);
      });
    }


    // -- end --

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

    dropdown.querySelectorAll('.dropdown__element').
      forEach( (dropElement) => {
      const inputElement = dropElement.querySelector('.dropdown__input');

      dropElement.addEventListener('click', (evt) => {
        const inputValue = Number(inputElement.value);

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

    // Кнопка очистки
    const clearBtn = dropdown.querySelector('.dropdown__button-ctrl--clear');

    function resetValue() {
      dropdownInputs.forEach( (dropdownInput) => {
        dropdownInput.value = 0;
        dropdownInput.previousSibling.setAttribute('disabled', 'true');
        dropdownInput.nextSibling.removeAttribute('disabled');
      });
    }

    clearBtn.addEventListener('click', (evt) =>{
      evt.preventDefault();
      resetValue();
    });
  })

  //  -- end --
})()
