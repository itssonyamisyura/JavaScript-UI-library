import $ from '../core';

$.prototype.carousel = function() {
    for(let i = 0; i < this.length; i++) {
        const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width;
        const slides = this[i].querySelectorAll('.carousel-item');
        const slidesField = this[i].querySelector('.carousel-slides');
        const dots = this[i].querySelectorAll('.carousel-indicators li');


        slidesField.style.width = 100 * slides.length + '%'; // ширина зависит от кол-ва слайдов(3 slides = width 300%)

        slides.forEach(slide => {
            slide.style.width = width;
        }); // устанавливаем ширину slides

        let offset = 0; // какой слайд активный и насколько смещать slidesField
        let slideIndex = 0;

        $(this[i].querySelector('[data-slide="next"]')).click((e) => {
            e.preventDefault();
            if (offset == (+width.replace(/\D/g, '') * (slides.length - 1))) {
                offset = 0; // дошли до конца = начальное положение(ширина слайда*кол-во слайдов)
            } else {
                offset += +width.replace(/\D/g, '');
                // если еще не дошли до конца к переменной offset добавляем ширину слайда
            }

            slidesField.style.transform = `translateX(-${offset}px)`; // при клике на next смещается влево


            if (slideIndex == slides.length - 1) {
                slideIndex = 0; // last slide
            } else {
                slideIndex++;
            }
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[slideIndex].classList.add('active');
        });

        $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
            e.preventDefault();
            if (offset == 0) {
                offset = +width.replace(/\D/g, '') * (slides.length - 1) // move slider to the end
            } else {
                offset -= +width.replace(/\D/g, '');
                // отнимаем ширину слайда
            }

            slidesField.style.transform = `translateX(-${offset}px)`; 

            if (slideIndex == 0) { //if 1st slide
                slideIndex = slides.length - 1; 
                //last slide
            } else {
                slideIndex--;
            }
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[slideIndex].classList.add('active');
        });

        const sliderId = this[i].getAttribute('id');
        $(`#${sliderId} .carousel-indicators li`).click((e) => {
            e.preventDefault();
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.replace(/\D/g, '') * slideTo;

            slidesField.style.transform = `translateX(-${offset}px)`; 
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[slideIndex].classList.add('active');
        });
    }
};

$('.carousel').carousel();





// instead this[i] we use $('.carousel')