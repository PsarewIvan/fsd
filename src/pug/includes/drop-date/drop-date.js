import 'air-datepicker';

(function () {
  $('.drop-date').each(function () {
    const dropDate = $(this);
    const titleFrom = dropDate.find('.drop-date__input-from');
    const titleTo = dropDate.find('.drop-date__input-to');
    const isMulti = titleFrom && titleTo;
    let inline = false;
    if (dropDate.find('.drop-date__input').hasClass('-inline-')) {
      inline = true;
    }

    dropDate.find('.js-drop-date').datepicker({
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
      dropDate.addClass('drop-date__single');
      dropDate.find('.js-drop-date').datepicker({
        classes: '-filter-',
      });
    }

    const datep = dropDate.find('.js-drop-date').data('datepicker');
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
      const wrap = $('.drop-date');
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
