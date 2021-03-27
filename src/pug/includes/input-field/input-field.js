import IMask from 'imask';

(() => {
  const elements = document.querySelectorAll('.js-input-field__input--masked');
  elements.forEach((element) => {
    const maskOptions = {
      mask: Date,
    };
    const mask = IMask(element, maskOptions);
  });
})();
