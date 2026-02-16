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


$.prototype.closest = function (selector) {
    let counter = 0;

    for (let i = 0; i < this.length; i++) {
        const found = this[i].closest(selector);
        if (found) {          
            this[counter] = found;
            counter++;
        }
    }

    const objLength = Object.keys(this).length;
    for (; counter < objLength; counter++) {
        delete this[counter];
    }
    this.length = counter;

    return this;
};
// ближайший блок (closest)


$.prototype.siblings = function () {
    let numberOfItems = 0;
    let counter = 0;
 
    const copyObj = Object.assign({}, this);

    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].parentNode.children;  
   
 
    for (let j = 0; j < arr.length; j++) {
        if (copyObj[i] === arr[j]) {
            continue;
        }

        this[counter] = arr[j];
        counter++
    }

    numberOfItems += arr.length - 1;

    const objLength = Object.keys(this).length;
    for(; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
    }
};
// получает все соседние эл. не включая сам эл.
