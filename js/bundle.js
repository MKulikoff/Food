/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    //Calculator 

    const caloriesTotal = document.querySelector('.calculating__result span')
    let sex, height, weight, age, ratio; 

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'; 
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio'); 
    } else {
        ratio = 1.375; 
        localStorage.setItem('ratio', 1.375);

    }

    function initDynamicInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector); 

        elements.forEach((elem) => {
            elem.classList.remove(activeClass); 
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {

                elem.classList.add(activeClass); 
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass); 
            }
        })
    }

    initDynamicInfo('#gender div', 'calculating__choose-item_active');
    initDynamicInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            caloriesTotal.textContent = 'N/A'
            return;
        }

        if (sex === 'female') {
            caloriesTotal.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            caloriesTotal.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal()

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio)
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex); 
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })
    
                e.target.classList.add(activeClass);
    
                calcTotal(); 
            })
        })
    }

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);
        
        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none'; 
            }
            
            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    console.log(height);
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal(); 
        })
    }

    getDynamicInfo('#age'); 
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator); 

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
 

function cards() {
    //Cards 

    class Card {
        constructor(src, alt, subtitle, description, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.rubPrice = 72;
            this.parent = document.querySelector(parent);
            this.changeToRub();
        }

        changeToRub() {
            this.price *= this.rubPrice;
        }

        createMenuItem() {
            const menuItem = document.createElement('div');

            if (this.classes.length === 0) {
                menuItem.classList.add('menu__item');
            } else {
                this.classes.forEach(element => {
                    menuItem.classList.add('element');
                });
            }

            menuItem.innerHTML = `
             <img src=${this.src} alt=${this.alt}>
             <h3 class="menu__item-subtitle">${this.subtitle}</h3>
             <div class="menu__item-descr">${this.description}</div>
             <div class="menu__item-divider"></div>
             <div class="menu__item-price">
                 <div class="menu__item-cost">Цена:</div>
                 <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
             </div>`;

            this.parent.append(menuItem);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu').then(data => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new Card(img, altimg, title, descr, price, '[data-menu]').createMenuItem();
        }); 
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards); 

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
 
 

function forms(formSelector, modalTimerId) {
    //Forms 

    const forms = document.querySelectorAll(formSelector);

    forms.forEach((item) => {
        sendData(item);
    });

    const msg = {
        loading: 'img/form/spinner.svg',
        success: 'Данные отправлены',
        fail: 'Произошла ошибка'
    };

    function sendData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.createElement('img');
            status.src = msg.loading;
            status.classList.add('spinner');
            form.insertAdjacentElement('afterend', status);

            const formData = new FormData(form);

            const obj = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', obj)
                .then(data => {
                    console.log(data);
                    loadingStatusModal(msg.success);
                    status.remove();
                }).catch(() => {
                    loadingStatusModal(msg.fail);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function loadingStatusModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const statusModal = document.createElement('div');
        statusModal.classList.add('modal__dialog');
        statusModal.innerHTML =
            `<div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${message}</div>
             </div>`;

        document.querySelector('.modal').append(statusModal);
        setTimeout(() => {
            statusModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms); 

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector); 
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector); 
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {
     //Modal 

     const openModalBtns = document.querySelectorAll(triggerSelector),
     modal = document.querySelector(modalSelector);


 openModalBtns.forEach(button => {
     button.addEventListener('click', () => openModal(modalSelector, modalTimerId));
 });

 modal.addEventListener('click', (e) => {
     if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
     }
 });

 document.addEventListener('keydown', (e) => {
     if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal(modalSelector);
     }
 });

 function showModalByScroll() {
     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
     }
 }

 window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal); 

 



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    //Slider 

    const sliderImg = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector(container),
        prevSlideBtn = document.querySelector(prevArrow),
        nextSlideBtn = document.querySelector(nextArrow),
        currentSlide = document.querySelector(currentCounter),
        totalSlide = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    const sliderLength = sliderImg.length;
    console.log(sliderLength); 
    let offset = 0;
    let index = 1;

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    const dots = [];

    for (let i = 0; i < sliderLength; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1)
        dot.classList.add('dot');
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
    }

    if (sliderLength > 10) {
        totalSlide.innerText = sliderLength;
        currentSlide.innerText = index;
    } else {
        totalSlide.innerText = `0${sliderLength}`;
        currentSlide.innerText = `0${index}`;
    }

    slidesField.style.width = 100 * sliderLength + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    sliderImg.forEach(slide => {
        slide.style.width = width;
    });

    function formatCounter(length) {
        if (length > 10) {
            totalSlide.innerText = length;
            currentSlide.innerText = index;
        } else {
            totalSlide.innerText = `0${length}`;
            currentSlide.innerText = `0${index}`;
        }
    }

    function setDotsOpacity() {
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        })
        dots[index - 1].style.opacity = 1;
    }

    function clearNumber(number) {
        return +number.replace(/\D/g, '');
    }

    nextSlideBtn.addEventListener('click', () => {
        if (offset == clearNumber(width) * (sliderLength - 1)) {
            offset = 0;
            index = 0;
            currentSlide.innerText = `0${index}`;
            slidesField.style.transform = `translate(-${offset}px)`;
        } else {
            offset += clearNumber(width);
            slidesField.style.transform = `translate(-${offset}px)`;
        }

        if (index == sliderLength) {
            index = 1;
        } else {
            index++;
        }

        formatCounter(sliderLength);

        setDotsOpacity();
    });

    prevSlideBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = clearNumber(width) * (sliderLength - 1);

            slidesField.style.transform = `translate(-${offset}px)`;

        } else {
            offset -= clearNumber(width);
            slidesField.style.transform = `translate(-${offset}px)`;
        }

        if (index == 1) {
            index = sliderLength;
        } else {
            index--;
        }

        formatCounter(sliderLength);

        setDotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            index = slideTo;

            setDotsOpacity();

            offset = clearNumber(width) * (index - 1);
            slidesField.style.transform = `translate(-${offset}px)`;
            formatCounter(sliderLength);

        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider); 

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabParentSelector, tabsSelector, tabContentSelector, activeClass) {

    const tabParent = document.querySelector(tabParentSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector);


    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, index) => {
                if (item == target) {
                    hideTabsContent();
                    showTabsContent(index);
                }
            });
        }
    });

    function showTabsContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    function hideTabsContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    hideTabsContent();
    showTabsContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs); 

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    //Timer 

    function getRemainingTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = (getRemainingTime(deadline));

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer); 

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not get ${url}, error code is ${res.status}`);
    }

    return await res.json();

};

 
 

/***/ })

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");








 

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 5000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        currentCounter: '#current', 
        totalCounter: '#total', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider_inner', 
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])('.timer', '2021-10-19');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__["default"])();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map