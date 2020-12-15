(function() {
  const checkboxLists = document.querySelectorAll('.checkbox');

  Array.prototype.forEach.call(checkboxLists, function(checkbox) {
    const list = checkbox.querySelector('.checkbox__list');
    const button = checkbox.querySelector('.checkbox__title-button');

    if (button) {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        list.classList.toggle('display-none');
      })
    }
  })
})();