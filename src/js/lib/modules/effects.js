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