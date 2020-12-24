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
      const buttons = nav.querySelectorAll('.nav__extend-button');

      function toggleMenu(button) {
        button.classList.toggle('-active-');
        button.nextElementSibling.classList.toggle('-open-');
      }

      function createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('nav__list-overlay');
        return overlay;
      }

      navLinks.forEach( (li) => {
        li.classList.add('-touch-');
        if ( li.querySelector('button') ) {
          li.querySelector('button').classList.add('-touch-');
        }
      });

      buttons.forEach( (button) => {
        button.addEventListener('click', function() {
          const overlay = createOverlay();
          toggleMenu(button);
          document.body.append(overlay);
          overlay.addEventListener('click', () => {
            toggleMenu(button);
            overlay.remove();
          });
        });
      });
    }
  })
})();
