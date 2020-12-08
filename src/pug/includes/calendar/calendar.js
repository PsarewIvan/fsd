import 'air-datepicker';

(function() {
  const datepickers = document.querySelectorAll('.calendar');

  Array.prototype.forEach.call(datepickers, function(datepicker) {

    function addApplyButton() {
      datepicker.querySelector('.datepicker--buttons').appendChild(
        createElement(
        'span',
        ['datepicker--button', 'datepicker--button-apply'],
        [{ name: 'data-action', value: 'apply' }],
        'Применить'
      ));
    }

    function createElement(tag, classList, attributes, inner) {
      const element = document.createElement(tag);
      element.classList.add(...classList);
      attributes.forEach((attr) => {
        element.setAttribute(attr.name, attr.value);
      });
      element.innerHTML = inner;
      return element;
    }

    $(datepicker).datepicker({
      minDate: new Date(),
      range: 'true',
      navTitles: {days: 'MM yyyy'},
      inline: true,
      clearButton: true,
      onRenderCell: (data, cellType) => {
        return {
          html: `<span class="calendar__current-date">${data.getDate()}</span>`
        }
      }
    });

    addApplyButton();

  });
})();