import InputField from './InputField';

const elements = document.querySelectorAll('.js-input-field__input--masked');
elements.forEach((element) => {
  const input = new InputField(element);
  input.init();
})
