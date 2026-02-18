import $ from '../core';

$.prototype.tab = function() {
    for (let i = 0; i < this.length; i++) {
        $(this[i]).on('click', () => {

            // 1) remove active from all tabs
            $(this[i])
                .closest('.tab')
                .find('.tab-item')
                .removeClass('tab-item--active');

            // 2) add active only to clicked tab
            $(this[i]).addClass('tab-item--active');

            // 3) switch content
            $(this[i])
                .closest('.tab')
                .find('.tab-content')
                .removeClass('tab-content--active')
                .eq($(this[i]).index())
                .addClass('tab-content--active');
        });
    }
};

$('[data-tabpanel] .tab-item').tab();

    // у соседних эл убираем active class -> ищем родителя, чтоб перейти в след div
    // узнать номер эл по порядку, на котором произошло событие(contnet#) 