import 'ion-rangeslider';

(() => {
  const sliders = document.querySelectorAll('.js-slider');
  sliders.forEach((slider) => {
    const fromToValue = slider.querySelector('.js-slider__data-from-to');
    function changeValue(data) {
      $(fromToValue).html(
        `${data.from_pretty}&#8381; - ${data.to_pretty}&#8381;`
      );
    }

    $('.js-range-slider').ionRangeSlider({
      onStart: (data) => {
        changeValue(data);
      },
      onChange: (data) => {
        changeValue(data);
      },
    });
  });
})();
