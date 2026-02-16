import $ from '../core';

$.prototype.html = function(content) {
    for (let i = 0; i < this.length; i++) {
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }

    return this;
};
// change/get HTML structure inside element


$.prototype.eq = function(i) {
    const swap = this[i];
    const objLength = Object.keys(this).length;// кол-во свойств внутри объекта

    for (let i = 0; i < objLength; i++) {
        delete this[i]; //now collection is empty
    }

    this[0] = swap;
    this.length = 1; //insert back only the selected element

    return this;
};
// Return only the element with index i from the current collection.


$.prototype.index = function() {
    const parent = this[0].parentNode;
    const childs = [...parent.children]; //parent.children = html collection --> [...parent.children] = now array has methods

    const findMyIndex = (item) => {
        return item == this[0]; //one we need
    }

    return childs.findIndex(findMyIndex); // returns number
};
// номер эл по порядку среди сверсников(имеющих одного родителя)



$.prototype.find = function (selector) {
    let items = [];
 
    for (let i = 0; i < this.length; i++) {
        let arr = this[i].querySelectorAll(selector);
        items.push(...arr);
        delete this[i];
    }
 
    Object.assign(this, items);
    this.length = items.length;
 
    return this;
};
// находим элементы среди уже выбранных