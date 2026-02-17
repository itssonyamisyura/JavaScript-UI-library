/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/lib/core.js"
/*!****************************!*\
  !*** ./src/js/lib/core.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

const $ = function (selector) {
  return new $.prototype.init(selector);
};
$.prototype.init = function (selector) {
  if (!selector) {
    return this; //{}
  }
  if (selector.tagName) {
    this[0] = selector;
    this.length = 1;
    return this;
  } //Is the selector actually a DOM element?

  Object.assign(this, document.querySelectorAll(selector)); // добавляет свойства в объект 
  this.length = document.querySelectorAll(selector).length;
  return this;
};

// второй прототип относится к объекту, который возвращает метод return this --> теперь на объекте const $ мы можем использовать любые методы, которые будут внутри прототипа функции $.prototype.init
$.prototype.init.prototype = $.prototype;
window.$ = $;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($);

/***/ },

/***/ "./src/js/lib/lib.js"
/*!***************************!*\
  !*** ./src/js/lib/lib.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/js/lib/core.js");
/* harmony import */ var _modules_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/display */ "./src/js/lib/modules/display.js");
/* harmony import */ var _modules_classes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/classes */ "./src/js/lib/modules/classes.js");
/* harmony import */ var _modules_handlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/handlers */ "./src/js/lib/modules/handlers.js");
/* harmony import */ var _modules_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/actions */ "./src/js/lib/modules/actions.js");
/* harmony import */ var _modules_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/effects */ "./src/js/lib/modules/effects.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_core__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ },

/***/ "./src/js/lib/modules/actions.js"
/*!***************************************!*\
  !*** ./src/js/lib/modules/actions.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/js/lib/core.js");

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.html = function (content) {
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

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.eq = function (i) {
  const swap = this[i];
  const objLength = Object.keys(this).length; // кол-во свойств внутри объекта

  for (let i = 0; i < objLength; i++) {
    delete this[i]; //now collection is empty
  }
  this[0] = swap;
  this.length = 1; //insert back only the selected element

  return this;
};
// Return only the element with index i from the current collection.

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.index = function () {
  const parent = this[0].parentNode;
  const childs = [...parent.children]; //parent.children = html collection --> [...parent.children] = now array has methods

  const findMyIndex = item => {
    return item == this[0]; //one we need
  };
  return childs.findIndex(findMyIndex); // returns number
};
// номер эл по порядку среди сверсников(имеющих одного родителя)

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.find = function (selector) {
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

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.closest = function (selector) {
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

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.siblings = function () {
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
      counter++;
    }
    numberOfItems += arr.length - 1;
    const objLength = Object.keys(this).length;
    for (; numberOfItems < objLength; numberOfItems++) {
      delete this[numberOfItems];
    }
    return this;
  }
};
// получает все соседние эл. не включая сам эл.

/***/ },

/***/ "./src/js/lib/modules/classes.js"
/*!***************************************!*\
  !*** ./src/js/lib/modules/classes.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/js/lib/core.js");

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.addClass = function (...classNames) {
  //rest operator
  for (let i = 0; i < this.length; i++) {
    this[i].classList.add(...classNames); //spread operator
  }
  return this;
};
_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.removeClass = function (...classNames) {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.remove(...classNames);
  }
  return this;
};
_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.toggleClass = function (classNames) {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.toggle(classNames);
  }
  return this;
};

/***/ },

/***/ "./src/js/lib/modules/display.js"
/*!***************************************!*\
  !*** ./src/js/lib/modules/display.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/js/lib/core.js");

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.show = function () {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }
    this[i].style.display = '';
  }
  return this;
};
_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.hide = function () {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }
    this[i].style.display = 'none';
  }
  return this;
};
_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.toggle = function () {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }
    if (this[i].style.display === 'none') {
      this[i].style.display = '';
    } else {
      this[i].style.display = 'none';
    }
  }
  return this;
};

/***/ },

/***/ "./src/js/lib/modules/effects.js"
/*!***************************************!*\
  !*** ./src/js/lib/modules/effects.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/js/lib/core.js");

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.animateOverTime = function (duration, callback, final) {
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

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.fadeIn = function (duration, display = 'block', final) {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = display;
    const _fadeIn = completion => {
      this[i].style.opacity = completion;
    };
    const ani = this.animateOverTime(duration, _fadeIn, final);
    requestAnimationFrame(ani);
  }
  return this;
};
_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.fadeOut = function (duration, final) {
  for (let i = 0; i < this.length; i++) {
    const _fadeOut = completion => {
      this[i].style.opacity = 1 - completion; //more opacity
      if (completion === 1) {
        //100% opacity
        this[i].style.display = 'none';
      }
    };
    const ani = this.animateOverTime(duration, _fadeOut, final);
    requestAnimationFrame(ani);
  }
  return this;
};

/***/ },

/***/ "./src/js/lib/modules/handlers.js"
/*!****************************************!*\
  !*** ./src/js/lib/modules/handlers.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/js/lib/core.js");

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.on = function (eventName, callback) {
  if (!eventName || !callback) {
    return this; // do nothing
  }
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener(eventName, callback);
  }
  return this;
};
_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.off = function (eventName, callback) {
  if (!eventName || !callback) {
    return this;
  }
  for (let i = 0; i < this.length; i++) {
    this[i].removeEventListener(eventName, callback);
  }
  return this;
};
_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.click = function (handler) {
  for (let i = 0; i < this.length; i++) {
    if (handler) {
      this[i].addEventListener('click', handler);
    } else {
      this[i].click(); //if no handler(click()) -> virtual click
    }
  }
  return this;
};

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/lib */ "./src/js/lib/lib.js");

(0,_lib_lib__WEBPACK_IMPORTED_MODULE_0__["default"])('button').on('click', function () {
  (0,_lib_lib__WEBPACK_IMPORTED_MODULE_0__["default"])('div').eq(2).toggleClass('active');
});
(0,_lib_lib__WEBPACK_IMPORTED_MODULE_0__["default"])('div').click(function () {
  console.log((0,_lib_lib__WEBPACK_IMPORTED_MODULE_0__["default"])(this).index());
});

// console.log($('div').eq(2).find('.some'));

// console.log($('.some').closest('.findme'));

// console.log($('button').html());

// console.log($('.findme').siblings());

(0,_lib_lib__WEBPACK_IMPORTED_MODULE_0__["default"])('.findme').fadeIn(1800);
})();

/******/ })()
;
//# sourceMappingURL=script.js.map