(function() {
  const checkboxLists = document.querySelectorAll('.checkbox');

  Array.prototype.forEach.call(checkboxLists, function(checkbox) {
    const list = checkbox.querySelector('.checkbox__list');
    const button = checkbox.querySelector('.checkbox__title-button');

    if (button) {
      if (!list.classList.contains('display-none')) {
        button.classList.add('-open-');
      }

      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        list.classList.toggle('display-none');
        button.classList.toggle('-open-');
      })
    }
  })
})();