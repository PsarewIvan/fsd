import 'ion-rangeslider';

class Slider {
  constructor(root) {
    this.FROM_TO_CLASS = 'js-slider__data-from-to';
    this.SLIDER_CLASS = 'js-range-slider';
    this.slider = root.querySelector(`.${this.SLIDER_CLASS}`);
    this.fromToValue = root.querySelector(`.${this.FROM_TO_CLASS}`);
  }

  init() {
    $(this.slider).ionRangeSlider({
      onStart: (data) => {
        this.changeValue(data);
      },
      onChange: (data) => {
        this.changeValue(data);
      },
    });
  }

  changeValue(data) {
    $(this.fromToValue).html(
      `${data.from_pretty}&#8381; - ${data.to_pretty}&#8381;`
    );
  }
}

export default Slider;
