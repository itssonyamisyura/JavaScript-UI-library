import $ from '../core';

$.prototype.accordion = function(headActive = 'accordion-head--active', contentActive = 'accordion-content--active', paddings = 40) {
    for (let i = 0; i < this.length; i++) {
        $(this[i]).click(() => {
            $(this[i]).toggleClass(headActive);
            $(this[i].nextElementSibling).toggleClass(contentActive);

            // click head -> toggle active class; same у сиблинга; 
            // if no active class -> закрываем и наоборот

            if (this[i].classList.contains(headActive)) {
                this[i].nextElementSibling.style.maxHeight = this[i].nextElementSibling.scrollHeight + paddings + "px";
            // if head has active class -> increase maxHeight of next elem(content) на ту высоту, что должна быть + paddings 
            } else {
                this[i].nextElementSibling.style.maxHeight = '0px';
            }
        });
    }
};

$('.accordion-head').accordion();