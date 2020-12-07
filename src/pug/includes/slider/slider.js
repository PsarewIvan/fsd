import 'ion-rangeslider';


(function() {
  const sliders = document.querySelectorAll(".js-slider");

  Array.prototype.forEach.call(sliders, slider => {
    const fromToValue = slider.querySelector('.slider__data-from-to');

    function changeValue(data) {
      $(fromToValue).html(`${data.from_pretty}&#8381; - ${data.to_pretty}&#8381;`);
    }

    $(".js-range-slider").ionRangeSlider({
      onStart: function(data) {
        changeValue(data);
      },

      onChange: function(data) {
        changeValue(data);
      }
    });
  });
})()
