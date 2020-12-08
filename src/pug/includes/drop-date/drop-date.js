(function() {
  const dropDates = document.querySelectorAll('.drop-date');

  Array.prototype.forEach.call(dropDates, function(dropDate) {
    const inputsAmount = dropDate.querySelectorAll('input');
    let isMultiple = inputsAmount.length <= 1 ? false : true;

    if (isMultiple) {
      dropDate.querySelector('.js-drop-date__calendar').classList.add("display-none");
    }


  });
})();
