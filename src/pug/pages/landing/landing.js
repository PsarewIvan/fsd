(function() {
  if (document.querySelector('.landing__block--search')) {
    const mainLink = document.querySelector('.header__main-link');
    const loginBtn = document.querySelector('.-login-button-');
    const regBtn = document.querySelector('.-reg-button-');
    const loginSection = document.querySelector('.landing__block--login');
    const regSection = document.querySelector('.landing__block--reg');
    const searchSection = document.querySelector('.landing__block--search');

    function toggleVisibility(elem) {
      elem.classList.toggle('display-none');
    }

    loginBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (loginSection.classList.contains('display-none')) {
        toggleVisibility(loginSection);
      }

      if (!searchSection.classList.contains('display-none')) {
        toggleVisibility(searchSection);
      }

      if (!regSection.classList.contains('display-none')) {
        toggleVisibility(regSection);
      }
    });

    regBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (regSection.classList.contains('display-none')) {
        toggleVisibility(regSection);
      }

      if (!searchSection.classList.contains('display-none')) {
        toggleVisibility(searchSection);
      }

      if (!loginSection.classList.contains('display-none')) {
        toggleVisibility(loginSection);
      }
    });

    mainLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (searchSection.classList.contains('display-none')) {
        toggleVisibility(searchSection);
      }

      if (!regSection.classList.contains('display-none')) {
        toggleVisibility(regSection);
      }

      if (!loginSection.classList.contains('display-none')) {
        toggleVisibility(loginSection);
      }
    });

    // Предзагрузка изображений

    const loginImgSrc = getComputedStyle(loginSection).backgroundImage.slice(5, -2);

    document.addEventListener('DOMContentLoaded', () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = "image";

      function preloadImages(...images) {
        images.forEach((image) => {
          link.href = image;
          console.log(link);
          document.getElementsByTagName('head')[0].appendChild(link);
        });
      };

      preloadImages(loginImgSrc);
    });
  }
})();
