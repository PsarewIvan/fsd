import DropDate from './DropDate';

$('.js-drop-date').each(function () {
  const dropDate = new DropDate(this);
  dropDate.init();
});
