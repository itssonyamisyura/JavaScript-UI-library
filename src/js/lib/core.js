// (() => {
//     const $ = function(selector) {
//         const elements = document.querySelectorAll(selector);
//         const obj = {};

//         obj.hide = () => {
//             elements.forEach(elem => {
//                 elem.style.display = 'none';
//             });
//             return obj;
//         };

//         obj.show = () => {
//             elements.forEach(elem => {
//                 elem.style.display = '';
//                 // браузер поставит по умолчания(block, flex)
//             });
//             return obj;
//         };

//         return obj;
//     };

//     window.$ = $;
// })();

// Быстрый доступ к элементам на странице - $
// Создаем замыкание при помощи анонимной самовызыв. функции - chaining
// получаем глобальную функцию, которую можем вызывать по одному символу

const $ = function(selector) {
    return new $.prototype.init(selector);
};

$.prototype.init = function(selector) {
    if (!selector) {
        return this; //{}
    }

    if (selector.tagName) {
        this[0] = selector;
        this.length = 1;
        return this;
    } //Is the selector actually a DOM element?

    Object.assign(this, document.querySelectorAll(selector)) // добавляет свойства в объект 
    this.length = document.querySelectorAll(selector).length;

    return this;
}; 

// второй прототип относится к объекту, который возвращает метод return this --> теперь на объекте const $ мы можем использовать любые методы, которые будут внутри прототипа функции $.prototype.init
$.prototype.init.prototype = $.prototype;

window.$ = $;

export default $;