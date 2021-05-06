import Radio from './Radio';

document.querySelectorAll('.js-radio').forEach((item) => {
  const radio = new Radio(item);
  radio.init();
});
