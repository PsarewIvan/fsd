import 'air-datepicker';

(function() {
  const datepickers = document.querySelectorAll('.calendar');

  Array.prototype.forEach.call(datepickers, function(datepicker) {
    $(datepicker).datepicker();
  });
})();