import 'air-datepicker';

(function() {
  $(".drop-date").each(function () {

    const dropDate = $(this);
    const dateFrom = dropDate.find(".drop-date__input-from");
    const dateTo = dropDate.find (".drop-date__input-to");

    dropDate.find(".drop-date__datepicker-multi").datepicker({
      minDate: new Date(),
      range: 'true',
      multipleDatesSeparator: ' - ',
      navTitles: { days: 'MM yyyy' },
      clearButton: true,
      onSelect: (date) => {
        const dates = date.split(" - ");
        dateFrom.val(dates[0]);
        dateTo.val(dates[1]);
      }
    });

    const datep = dropDate.find(".drop-date__datepicker-multi").data("datepicker");
    const datepEl = datep.$datepicker;
    const applyButton = $(
      `<span class='datepicker--button-apply'>Применить</span>`
    );

    applyButton.click(() => {
      if (datep.selectedDates.length < 2) return;
      datep.hide();
    });

    datepEl.find(".datepicker--buttons").append(applyButton);
    dateTo.click(() => datep.show());
    dateFrom.click(() => datep.show());

    $(document).mouseup(function (e) {
      const dep = $(".datepickers-container");
      const wrap = $(".drop-date");
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
