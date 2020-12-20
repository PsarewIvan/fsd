import 'slick-carousel';

(function() {
  $(document).ready(function () {
    $('.img-slider').slick({
      dots: true,
      infinite: true,
      nextArrow: "<button type='button' class='slick-next' aria-label='Next'></button>",
      prevArrow: "<button type='button' class='slick-prev' aria-label='Previous'></button>",
    });
  });
})();
