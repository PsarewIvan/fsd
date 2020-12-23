(function() {
  const navigations = document.querySelectorAll('.nav');

    navigations.forEach( (nav) => {
    // Убирает атрибут href у текущей ссылки
    if ( nav.querySelector('.nav__link--current') ) {
      const  navLink = nav.querySelector('.nav__link--current');
      navLink.removeAttribute('href');
    }

    // Проверка на тач-устройства
    function isTouchEnabled() {
      return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
    }

    // Убирает появление меню при ховере на тач-усройствах
    if (isTouchEnabled()) {
      const navLinks = nav.querySelectorAll('.nav__li');
      navLinks.forEach( (li) => {
        li.classList.add('-touch-');
        if ( li.querySelector('button') ) {
          li.querySelector('button').classList.add('-touch-');
        }
      });

      const buttons = nav.querySelectorAll('.nav__extend-button');
      buttons.forEach( (button) => {
        button.addEventListener('click', function() {
          this.classList.toggle('-active-');
          this.nextElementSibling.classList.toggle('-open-');
        });
      });

      // document.addEventListener('click', (evt) => {
      //   console.log(evt.target.closest('.nav__list--extend-wrapper'))

      //   if ( !evt.target.closest('.nav__list--extend-wrapper') ) {
      //     evt.target.closest('.nav__list--extend-wrapper').classList.toggle('-open-');
      //     evt.target.closest('.nav__list--extend-wrapper').previousElementSibling.classList.toggle('-active-');
      //   }
      // })
    }
  })
})();
