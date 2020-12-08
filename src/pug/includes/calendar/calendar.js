import 'air-datepicker';

(function() {
  const datepickers = document.querySelectorAll('.calendar');

  Array.prototype.forEach.call(datepickers, function(datepicker) {

    function addApplyButton() {
      const butonsContainer = datepicker.querySelector('.datepicker--buttons');
      const applyButton = document.createElement('span');
      applyButton.innerHTML = 'Применить';
      applyButton.setAttribute('data-action', 'apply');
      applyButton.classList.add('datepicker--button', 'datepicker--button-apply');
      butonsContainer.appendChild(applyButton);

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