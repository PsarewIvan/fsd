import 'air-datepicker';

(function() {
  const datepickers = document.querySelectorAll('.calendar');

  Array.prototype.forEach.call(datepickers, function(datepicker) {
    function addApplyButton() {
      const element = createElement(
        'span',
        ['datepicker--button-apply', 'js-datepicker--button-apply'],
        [{name: 'data-action', value: 'apply'}, {name: 'data-disabled', value: 'true'}],
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
      const mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const yyyy = date.getFullYear();
      return `${dd}.${mm}.${yyyy}`;
    }

    function applyDates() {
      dpData.selectedDates.forEach((date, index) => {
        dateInputs[index].value = parseDate(date);
      });
    }

    function resetDates() {
      dateInputs.forEach(function(input, index) {
        input[index].value = '';
      })
    }

    function changeElementDataState(element, data, state) {
      element.setAttribute(`data-${data}`, state);
    }

    function resetDates() {
        Array.prototype.forEach.call(dateInputs, function(input) {
          input.value = '';
        })
    }

    $(datepicker).datepicker({
      minDate: new Date(),
      range: 'true',
      navTitles: {days: 'MM yyyy'},
      inline: true,
      clearButton: true,
      onRenderCell: (data, cellType) => {
        const thisDay = new Date();
        if (cellType == 'day' && data.getDate() == thisDay.getDate()) {
          return {
            html: `<span class="calendar__current-date">${data.getDate()}</span>`
          }
        }
      }
    });

    const dpData = $(datepicker).data('datepicker');

    addApplyButton();

    const applyButton = datepicker.querySelector('.js-datepicker--button-apply');
    const resetButton = datepicker.querySelector('span[data-action=clear]');
    const dropDate = datepicker.closest('.drop-date');
    const dateInputs = dropDate.querySelectorAll('.js-drop-date__input');

    applyButton.addEventListener('click', () => {
      applyDates();
      if (dpData.selectedDates.length === 2) {
        changeElementDataState(applyButton, 'disabled', 'false');
      }
      else {
        resetDates();
        applyDates();
        changeElementDataState(applyButton, 'disabled', 'true');
      }
    });
    resetButton.addEventListener('click', resetDates);
  });
})();
