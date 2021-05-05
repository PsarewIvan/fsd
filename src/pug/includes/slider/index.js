import Slider from './Slider';

const sliders = document.querySelectorAll('.js-slider');
sliders.forEach((item) => {
  const slider = new Slider(item);
  slider.init();
});
