(function () {
  const dropdown = document.querySelectorAll('.dropdown');

  Array.prototype.forEach.call(dropdown, heading => {
    let btn = heading.querySelector('.dropdown__drop-button');
    let target = heading.querySelector('.dropdown__menu');

    btn.onclick = () => {
      let expanded = btn.getAttribute('aria-expanded') === 'true' || false;

      btn.setAttribute('aria-expanded', !expanded);
      target.hidden = expanded;
    }
  })
})()