(function() {
  const dropDates = document.querySelectorAll('.drop-date');

  Array.prototype.forEach.call(dropDates, function(dropDate) {
    const inputs = dropDate.querySelectorAll('input');
    let isMultiple = inputs.length <= 1 ? false : true;

    function closeCalendar() {
      dropDate.querySelector('.js-drop-date__calendar').classList.add("display-none");
    }

    function showCalendar() {
      dropDate.querySelector('.js-drop-date__calendar').classList.remove("display-none");
    }

    function isCloseClick(evt) {
      const inputFrom = inputs[0];
      const inputTo = inputs[1];
      const isCell = evt.target.closest('.datepicker--cell');
      const isNav = evt.target.closest('.datepicker--nav-action');
      const isNavMonth = evt.target.closest('.datepicker--nav-title');
      const isCalendar = evt.target.closest('.datepicker');
      if (evt.target !== inputFrom && evt.target !== inputTo && !isCalendar && !isCell && !isNav && !isNavMonth) {
        return true;
      }
    }

    if (isMultiple) {
      closeCalendar();
      Array.prototype.forEach.call(inputs, function(input) {
        input.addEventListener('click', () => {
          showCalendar();

          document.addEventListener('click', (evt) => {
            if (isCloseClick(evt)) {
              evt.preventDefault();
              closeCalendar();
            }
          });
        });
      });
    }
  });
})();
