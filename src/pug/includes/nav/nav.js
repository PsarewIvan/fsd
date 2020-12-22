(function() {
  const navigations = document.querySelectorAll('.nav');
  Array.prototype.forEach.call(navigations, nav => {
    if ( nav.querySelector('.nav__link--current') ) {
      const  navLink = nav.querySelector('.nav__link--current');
      navLink.removeAttribute('href');
    }
  })
})();
