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

  function createBtn(aria, content) {
    let btnElem = document.createElement('button');
    btnElem.classList.add('dropdown__button');
    btnElem.setAttribute('type', 'button');
    btnElem.setAttribute('aria-label', aria);
    btnElem.innerHTML = content;
    return btnElem;
  }

  Array.prototype.forEach.call(dropdowns, dropdown => {
    replaceTag(dropdown.querySelector('.dropdown__drop-button'), 'button');
    let btn = dropdown.querySelector('.dropdown__drop-button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `${btn.innerHTML}
      <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true" focusable="false">
        <path d="M10.5938 0.578125L12 1.98438L6 7.98438L0 1.98438L1.40625 0.578125L6 5.17188L10.5938 0.578125Z" fill="#1F2041" fill-opacity="0.5">
      </svg>
    `;

    let dropdownMenu = dropdown.querySelector('.dropdown__menu');
    let dropdownInputs = dropdown.querySelectorAll('.dropdown__input');
    dropdownMenu.hidden = true;

    Array.prototype.forEach.call(dropdownInputs, dropdownInput => {
      dropdownInput.parentNode.insertBefore(createBtn('low', '-'), dropdownInput);
      dropdownInput.parentNode.insertBefore(createBtn('hight', '+'), dropdownInput.nextSibling);
    });

    let dropdownCtrl = document.createElement('div');
    dropdownCtrl.classList.add('dropdown__controls');
    dropdownCtrl.innerHTML = `
      <button class="dropdown__button-ctrl dropdown__button-ctrl--clear", type="button" aria-label="Очистить количество гостей")>Очистить</button>
      <button class="dropdown__button-ctrl dropdown__button-ctrl--apply", type="button" aria-label="Применить количество гостей">Применить</button>
    `;
    dropdownMenu.appendChild(dropdownCtrl);

    btn.onclick = () => {
      let expanded = btn.getAttribute('aria-expanded') === 'true' || false
      btn.setAttribute('aria-expanded', !expanded)
      btn.classList.toggle('open');
      dropdownMenu.hidden = expanded
    }
  })
})()
