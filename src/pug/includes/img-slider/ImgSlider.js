import 'slick-carousel';

class ImgSlider {
  constructor() {
    this.SLIDER_CLASS = 'js-img-slider';
    this.$root = $(`.${this.SLIDER_CLASS}`);
  }

  init() {
    this.$root.slick({
      dots: true,
      infinite: true,
      nextArrow: `<button type='button' class='slick-next' aria-label='Next'></button>`,
      prevArrow: `<button type='button' class='slick-prev' aria-label='Previous'></button>`,
    });
  }
}

export default ImgSlider;
