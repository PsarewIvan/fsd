import 'air-datepicker';

(function() {
  const datepickers = document.querySelectorAll('.calendar');

  Array.prototype.forEach.call(datepickers, function(datepicker) {

    function addApplyButton() {
      const element = createElement(
        'span',
        ['datepicker--button-apply', 'js-datepicker--button-apply'],
        [{ name: 'data-action', value: 'apply' }],
        'Применить'
      );
      datepicker.querySelector('.datepicker--buttons').appendChild(element);
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

    function parseDate(date) {
      const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const mm = date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth();
      const yyyy = date.getFullYear();
      return `${dd}.${mm}.${yyyy}`;
    }

    function applyDates() {
      const dropDate = datepicker.closest('.drop-date');
      const dateInputs= dropDate.querySelectorAll('.js-drop-date__input');
      const sd = datepicker.selectedDates;
      dpData.selectedDates.forEach((date, index) => {
        dateInputs[index].value = parseDate(date);
      });
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

    const dpData = $(datepicker).data('datepicker');

    addApplyButton();
    datepicker.querySelector('.js-datepicker--button-apply')
      .addEventListener('click', applyDates);

  });
})();