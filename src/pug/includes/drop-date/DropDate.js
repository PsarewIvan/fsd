import 'air-datepicker';

class DropDate {
  constructor(root) {
    this.INLINE_CLASS = 'drop-date--inline';
    this.SINGLE_CLASS = 'drop-date--single';
    this.TITLE_FROM_CLASS = '.js-drop-date__input-from';
    this.TITLE_TO_CLASS = '.js-drop-date__input-to';
    this.INPUT_CLASS = '.js-drop-date__input';
    this.$dropDate = $(root);
    this.$titleFrom = this.$dropDate.find(this.TITLE_FROM_CLASS);
    this.$titleTo = this.$dropDate.find(this.TITLE_TO_CLASS);
    this.isMulti = this.$titleFrom && this.$titleTo;
    this.isInline = this.$dropDate.hasClass(this.INLINE_CLASS);
  }

  init() {
    this.createDropDate();
    this.initDropDateParam();
    this.addModificator();
    this.createApplyButton();
    this.addedHandler();
  }

  createDropDate() {
    this.$dropDate.find(this.INPUT_CLASS).datepicker({
      minDate: new Date(),
      range: true,
      multipleDatesSeparator: ' - ',
      navTitles: { days: 'MM yyyy' },
      clearButton: true,
      inline: this.isInline,
      onSelect: (date) => {
        if (this.isMulti) {
          const dates = date.split(' - ');
          this.$titleFrom.val(dates[0]);
          this.$titleTo.val(dates[1]);
        }
      },
    });
  }

  initDropDateParam() {
    this.datep = this.$dropDate.find(this.INPUT_CLASS).data('datepicker');
    this.$datepElement = this.datep.$datepicker;
  }

  addModificator() {
    if (!this.$titleFrom.length && !this.$titleTo.length) {
      this.$dropDate.addClass(this.SINGLE_CLASS);
      this.$dropDate.find(this.INPUT_CLASS).datepicker({
        classes: '-filter-',
      });
    }
  }

  createApplyButton() {
    const $applyButton = $(
      `<span class='datepicker--button-apply'>Применить</span>`
    );

    $applyButton.click(() => {
      if (this.datep.selectedDates.length < 2) return;
      this.datep.hide();
    });
    this.$datepElement.find('.datepicker--buttons').append($applyButton);
  }

  addedHandler() {
    if (this.isMulti) {
      this.$titleTo.click(() => this.datep.show());
      this.$titleFrom.click(() => this.datep.show());
    }
  }
}

export default DropDate;
