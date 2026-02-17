import $ from '../core';

$.prototype.animateOverTime = function(duration, callback, final) {
    let timeStart;

    function _animateOverTime(time) {
        if (!timeStart) {
            timeStart = time;
        }

        let timeElapsed = time - timeStart;
        let completion = Math.min(timeElapsed / duration, 1);

        callback(completion);

        if (timeElapsed < duration) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof final === 'function') {
                final();
            }
        }
    }

    return _animateOverTime;
};
// _animateOverTime - техническая функция

$.prototype.fadeIn = function(duration, display = 'block', final) {
    for (let i = 0; i < this.length; i++) {
        this[i].style.display = display;

        const _fadeIn = (completion) => {
            this[i].style.opacity = completion;
        };

        const ani = this.animateOverTime(duration, _fadeIn, final);
        requestAnimationFrame(ani);
    }
    return this;
};

$.prototype.fadeOut = function(duration, final) {
    for (let i = 0; i < this.length; i++) {
        

        const _fadeOut = (completion) => {
            this[i].style.opacity = 1 - completion; //more opacity
            if (completion === 1) { //100% opacity
                this[i].style.display = 'none';
            }
        };

        const ani = this.animateOverTime(duration, _fadeOut, final);
        requestAnimationFrame(ani);
    }
    return this;
};


$.prototype.fadeToggle = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') { // obj w/ styles
            this[i].style.display = display || 'block';

            const _fadeIn = (complection) => {
                this[i].style.opacity = complection;
            };
    
            const ani = this.animateOverTime(dur, _fadeIn, fin);
            requestAnimationFrame(ani);
        } else {
            const _fadeOut = (complection) => {
                this[i].style.opacity = 1 - complection;
                if (complection === 1) {
                    this[i].style.display = 'none';
                }
            };
    
            const ani = this.animateOverTime(dur, _fadeOut, fin);
            requestAnimationFrame(ani);
        }
    }

    return this;
};