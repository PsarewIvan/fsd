import 'air-datepicker';

(() => {
  $('.js-drop-date').each(function () {
    const INLINE_CLASS = 'drop-date--inline';
    const SINGLE_CLASS = 'drop-date__single';
    const TITLE_FROM_CLASS = '.js-drop-date__input-from';
    const TITLE_TO_CLASS = '.js-drop-date__input-to';
    const INPUT_CLASS = '.js-drop-date__input';
    const dropDate = $(this);
    const titleFrom = dropDate.find(TITLE_FROM_CLASS);
    const titleTo = dropDate.find(TITLE_TO_CLASS);
    const isMulti = titleFrom && titleTo;
    let inline = false;
    if (dropDate.hasClass(INLINE_CLASS)) {
      inline = true;
    }

    dropDate.find(INPUT_CLASS).datepicker({
      minDate: new Date(),
      range: true,
      multipleDatesSeparator: ' - ',
      navTitles: { days: 'MM yyyy' },
      clearButton: true,
      inline: inline,
      onSelect: (date) => {
        if (isMulti) {
          const dates = date.split(' - ');
          titleFrom.val(dates[0]);
          titleTo.val(dates[1]);
        }
      },
    });

    if (!titleFrom.length && !titleTo.length) {
      dropDate.addClass(SINGLE_CLASS);
      dropDate.find(INPUT_CLASS).datepicker({
        classes: '-filter-',
      });
    }

    const datep = dropDate.find(INPUT_CLASS).data('datepicker');
    const datepEl = datep.$datepicker;
    const applyButton = $(
      `<span class='datepicker--button-apply'>Применить</span>`
    );

    applyButton.click(() => {
      if (datep.selectedDates.length < 2) return;
      datep.hide();
    });

    datepEl.find('.datepicker--buttons').append(applyButton);
    if (isMulti) {
      titleTo.click(() => datep.show());
      titleFrom.click(() => datep.show());
    }

    $(document).mouseup(function (e) {
      const dep = $('.datepickers-container');
      const wrap = $('.js-drop-date');
      if (
        !dep.is(e.target) &&
        dep.has(e.target).length === 0 &&
        !wrap.is(e.target) &&
        wrap.has(e.target).length === 0
      ) {
        datep.hide();
      }
    });
  });
})();
