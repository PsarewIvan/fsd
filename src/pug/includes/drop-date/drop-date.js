import 'air-datepicker';

(function() {
  const dropDates = document.querySelectorAll('.drop-date');

  Array.prototype.forEach.call(dropDates, function(dropDate) {
    const inputsAmount = dropDate.querySelectorAll('input');
    let isMultiple = inputsAmount.length <= 1 ? false : true;
  });
})();
