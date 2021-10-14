
import tabs from './modules/tabs';
import modal from './modules/modal';
import calculator from './modules/calculator';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import cards from './modules/cards';
import {openModal} from './modules/modal'; 

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);
    tabs();
    calculator();
    modal('[data-modal]', '.modal', modalTimerId);
    forms();
    slider();
    timer();
    cards();
});

